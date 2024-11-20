// app/api/machines/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log('Received PUT request body:', body); // Detailed logging

    // Validate basic required fields
    if (!body.Machine || !body.Image || !body.Desc) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Update machine
    const updatedMachine = await prisma.machine.update({
      where: { id: params.id },
      data: {
        Machine: body.Machine,
        Image: body.Image,
        Desc: body.Desc,
        Link: body.Link || null,
        isAvailable: body.isAvailable ?? true
      }
    });

    console.log('Updated machine:', updatedMachine); // Logging the result

    return NextResponse.json(updatedMachine, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Machine Update Error:', error);
    
    // More detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to update machine',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

// PATCH: Update machine availability
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updatedMachine = await prisma.machine.update({
      where: { id: params.id },
      data: { isAvailable: body.isAvailable }
    });

    return NextResponse.json(updatedMachine);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Failed to update machine' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletedMachine = await prisma.machine.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(deletedMachine, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Server error details:', error);
    return NextResponse.json(
      { error: 'Failed to delete machine', details: error instanceof Error ? error.message : 'Unknown error' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
