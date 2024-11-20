import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    console.log('Received data:', body);

    const { name, Image, Desc, Link, isAvailable } = body;
   
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
        Link: Link || null,
        isAvailable: isAvailable ?? true, // Include availability status
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
    console.error('Server error details:', error);
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
