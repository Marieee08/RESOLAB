import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    
    console.log('Received PUT request body:', body);

    if (!body.Machine || !body.Image || !body.Desc) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    if (body.oldImagePath && body.oldImagePath !== body.Image) {
      try {
        const oldImagePath = body.oldImagePath.startsWith('/') 
          ? body.oldImagePath.slice(1)
          : body.oldImagePath;
        
        const fullOldImagePath = path.join(process.cwd(), 'public', oldImagePath);

        console.log('Attempting to delete old image:', fullOldImagePath);

        try {
          await fs.access(fullOldImagePath);
          await fs.unlink(fullOldImagePath);
          console.log(`Deleted old image: ${fullOldImagePath}`);
        } catch (fileError) {
          const fsError = fileError as NodeJS.ErrnoException;
          console.warn('Could not delete old image:', {
            path: fullOldImagePath,
            code: fsError.code,
            message: fsError.message
          });
        }
      } catch (pathError) {
        const error = pathError as Error;
        console.error('Error processing old image path:', error.message);
      }
    }

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

    console.log('Updated machine:', updatedMachine);

    return NextResponse.json(updatedMachine, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Machine Update Error:', err.message);
    
    return NextResponse.json(
      { 
        error: 'Failed to update machine',
        details: err.message
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