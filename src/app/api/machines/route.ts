// app/api/machines/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Received machine POST request:', body);

    // Validate required fields with more robust checks
    if (!body.Machine || body.Machine.trim() === '') {
      return NextResponse.json(
        { error: 'Machine name is required and cannot be empty' }, 
        { status: 400 }
      );
    }

    if (!body.Desc || body.Desc.trim() === '') {
      return NextResponse.json(
        { error: 'Machine description is required and cannot be empty' }, 
        { status: 400 }
      );
    }

    const newMachine = await prisma.machine.create({
      data: {
        Machine: body.Machine.trim(),
        Image: body.Image || '',
        Desc: body.Desc.trim(),
        Link: body.Link ? body.Link.trim() : null,
        isAvailable: body.isAvailable ?? true,
        Costs: body.Costs !== undefined && body.Costs !== null 
          ? new Prisma.Decimal(body.Costs) 
          : null,
        Services: body.Services ? {
          create: body.Services
            .filter((service: any) => service.Service && service.Service.trim() !== '')
            .map((service: any) => ({
              Service: service.Service.trim()
            }))
        } : undefined
      }
    });

    console.log('Created machine:', newMachine);

    return NextResponse.json(newMachine, { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Machine Creation Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create machine',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeServices = searchParams.get('includeServices') === 'true';

  try {
    const machines = await prisma.machine.findMany({
      include: {
        Services: includeServices
      },
      orderBy: {
        createdAt: 'desc' // Add this if you have a createdAt field in your schema
      }
    });

    return NextResponse.json(machines, { status: 200 });
  } catch (error) {
    console.error('Machines Fetch Error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch machines', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const machineId = searchParams.get('machineId');

    if (!machineId) {
      return NextResponse.json(
        { error: 'Machine ID is required' }, 
        { status: 400 }
      );
    }

    // Use transaction to ensure atomic deletion
    const result = await prisma.$transaction(async (tx) => {
      // First delete associated services
      await tx.service.deleteMany({
        where: { machineId: machineId }
      });

      // Then delete the machine
      const deletedMachine = await tx.machine.delete({
        where: { id: machineId }
      });

      return deletedMachine;
    });

    console.log('Deleted machine and its services:', result);

    return NextResponse.json(result, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Machine and Services Deletion Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete machine and its services',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}