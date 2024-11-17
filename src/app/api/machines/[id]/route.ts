import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    console.log('Received data:', body); // Debug log

    // Ensure all required fields are present
    const { name, Image, Desc, Link } = body;
    
    if (!name || !Image || !Desc) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedMachine = await prisma.machine.update({
      where: { 
        id: params.id 
      },
      data: {
        Machine: name,
        Image: Image,
        Desc: Desc,
        Link: Link || null, // Make Link optional
      },
    });

    return NextResponse.json(updatedMachine, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } 
  catch (error) {
    console.error('Server error details:', error); // Debug log
    return NextResponse.json(
      { error: 'Failed to update machine', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

// DELETE: Delete a machine by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.machine.delete({ where: { id } });
    return NextResponse.json({ message: 'Machine deleted successfully' });
  } catch (error) {
    console.error('Error deleting machine:', error);
    return NextResponse.json({ error: 'Failed to delete machine' }, { status: 500 });
  }
}

// PATCH: Update machine availability
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    
    // Log the incoming request
    console.log('Received request:', { id: params.id, body });

    const updatedMachine = await prisma.machine.update({
      where: {
        id: params.id,
      },
      data: {
        isAvailable: body.isAvailable
      },
    });

    // Log the updated machine
    console.log('Updated machine:', updatedMachine);

    // Return with explicit status
    return new NextResponse(JSON.stringify(updatedMachine), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update machine' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}