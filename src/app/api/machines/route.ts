// app/api/machines/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';  // Add this import

export async function POST(request: NextRequest) {
  try {
    // Log the entire incoming request
    const contentType = request.headers.get('content-type')
    console.log('Content-Type:', contentType)

    // Parse the request body
    const body = await request.json();
    
    console.log('Received POST request body:', JSON.stringify(body, null, 2)); 

    // Extremely detailed validation
    if (!body) {
      console.error('No body received');
      return NextResponse.json(
        { error: 'No request body' }, 
        { status: 400 }
      );
    }

    // Validate each field explicitly
    if (!body.Machine) {
      console.error('Missing Machine name');
      return NextResponse.json(
        { error: 'Machine name is required' }, 
        { status: 400 }
      );
    }
    if (!body.Image) {
      console.error('Missing Image');
      return NextResponse.json(
        { error: 'Image is required' }, 
        { status: 400 }
      );
    }
    if (!body.Desc) {
      console.error('Missing Description');
      return NextResponse.json(
        { error: 'Description is required' }, 
        { status: 400 }
      );
    }

    // Create machine
    const newMachine = await prisma.machine.create({
      data: {
        Machine: body.Machine,
        Image: body.Image,
        Desc: body.Desc,
        Link: body.Link || null,
        isAvailable: body.isAvailable ?? true,
        Costs: body.Costs ? new Prisma.Decimal(body.Costs) : null // Convert to Decimal
      }
    });

    console.log('Created machine:', JSON.stringify(newMachine, null, 2)); 

    return NextResponse.json(newMachine, { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Log the full error details
    console.error('FULL Machine Creation Error:', error);
    
    // If it's a Prisma error, log additional details
    if (error instanceof Error) {
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }

    // More detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to create machine',
        details: error instanceof Error ? {
          message: error.message,
          name: error.name
        } : 'Unknown error'
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
        // Only include services if the parameter is set
        Services: includeServices ? true : false
      }
    });

    return NextResponse.json(machines, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to fetch machines', details: error.message }, 
      { status: 500 }
    );
  }
}