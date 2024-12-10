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
    
    console.log('Received service creation request:', body);

    // Validate required fields
    if (!body.Service || !body.machineId) {
      return NextResponse.json(
        { error: 'Service name and machineId are required' }, 
        { status: 400 }
      );
    }

    // Create service
    const newService = await prisma.service.create({
      data: {
        Service: body.Service.trim(),
        machineId: body.machineId
      }
    });

    console.log('Created service:', newService);

    return NextResponse.json(newService, { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Service Creation Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create service',
        details: error instanceof Error ? {
          message: error.message,
          name: error.name
        } : 'Unknown error'
      }, 
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