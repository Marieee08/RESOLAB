// app/api/machines/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    
    console.log('Received PUT request body:', JSON.stringify(body, null, 2));

    if (!body.Machine || !body.Image || !body.Desc) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Old image deletion logic remains the same...

    const updatedMachine = await prisma.machine.update({
      where: { id: params.id },
      data: {
        Machine: body.Machine,
        Image: body.Image,
        Desc: body.Desc,
        Link: body.Link || null,
        isAvailable: body.isAvailable ?? true,
        // Explicitly handle Costs, converting to Prisma.Decimal
        Costs: body.Costs !== undefined && body.Costs !== null 
          ? new Prisma.Decimal(body.Costs) 
          : null
      }
    });

    console.log('Updated machine:', JSON.stringify(updatedMachine, null, 2));

    return NextResponse.json(updatedMachine, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Machine Update Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update machine',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updatedMachine = await prisma.machine.update({
      where: { id: params.id },
      data: { isAvailable: body.isAvailable }
    });

    return NextResponse.json(updatedMachine);
  } catch (error) {
    const err = error as Error;
    console.error('Server error:', err.message);
    return NextResponse.json(
      { error: 'Failed to update machine' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const machine = await prisma.machine.findUnique({
      where: { id: params.id }
    });

    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    console.log('Machine Image Path:', machine.Image);
    console.log('Current Working Directory:', process.cwd());

    if (machine.Image) {
      try {
        const imagePath = machine.Image.startsWith('/') 
          ? machine.Image.slice(1)
          : machine.Image;
        
        const fullImagePath = path.join(process.cwd(), 'public', imagePath);

        console.log('Full Image Path:', fullImagePath);

        try {
          await fs.access(fullImagePath);
          await fs.unlink(fullImagePath);
          console.log(`Deleted image: ${fullImagePath}`);
        } catch (fileError) {
          const fsError = fileError as NodeJS.ErrnoException;
          console.warn('Could not delete image:', {
            path: fullImagePath,
            code: fsError.code,
            message: fsError.message
          });
        }
      } catch (pathError) {
        const error = pathError as Error;
        console.error('Error processing image path:', error.message);
      }
    }

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
    const err = error as Error;
    console.error('Server error details:', err.message);
    return NextResponse.json(
      { 
        error: 'Failed to delete machine', 
        details: err.message
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}