import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const machineId = searchParams.get('machineId');

  try {
    const services = machineId 
      ? await prisma.service.findMany({
          where: { machineId }
        })
      : await prisma.service.findMany();

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to fetch services', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { Service, machineId } = body;

    // Validation
    if (!Service || Service.trim() === '') {
      return NextResponse.json(
        { error: 'Service name is required' }, 
        { status: 400 }
      );
    }

    // Optional machine existence check
    if (machineId) {
      const machine = await prisma.machine.findUnique({
        where: { id: machineId }
      });

      if (!machine) {
        return NextResponse.json(
          { error: 'Machine not found' }, 
          { status: 404 }
        );
      }
    }

    const newService = await prisma.service.create({
      data: {
        Service: Service.trim(),
        machineId: machineId || undefined
      }
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to create service', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const machineId = searchParams.get('machineId');

  if (!machineId) {
    return NextResponse.json(
      { error: 'Machine ID is required' }, 
      { status: 400 }
    );
  }

  try {
    const deleteResult = await prisma.service.deleteMany({
      where: { machineId }
    });

    return NextResponse.json(
      { 
        message: 'Services deleted successfully', 
        count: deleteResult.count 
      }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to delete services', details: error.message }, 
      { status: 500 }
    );
  }
}