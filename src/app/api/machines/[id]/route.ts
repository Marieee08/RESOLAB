// app/api/machines/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log('Received PUT request body:', body);

    // Validate basic required fields
    if (!body.Machine || !body.Image || !body.Desc) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // If a new image is uploaded, delete the old image
    if (body.oldImagePath && body.oldImagePath !== body.Image) {
      try {
        const oldImagePath = body.oldImagePath.startsWith('/') 
          ? body.oldImagePath.slice(1)  // Remove leading slash
          : body.oldImagePath;
        
        const fullOldImagePath = path.join(process.cwd(), 'public', oldImagePath);

        console.log('Attempting to delete old image:', fullOldImagePath);

        try {
          await fs.access(fullOldImagePath);
          await fs.unlink(fullOldImagePath);
          console.log(`Deleted old image: ${fullOldImagePath}`);
        } catch (fileError) {
          console.warn(`Could not delete old image: ${fullOldImagePath}`, fileError);
        }
      } catch (pathError) {
        console.error('Error processing old image path:', pathError);
      }
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

    console.log('Updated machine:', updatedMachine);

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
    // First, fetch the machine to get its image path
    const machine = await prisma.machine.findUnique({
      where: { id: params.id }
    });

    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Debug logging
    console.log('Machine Image Path:', machine.Image);
    console.log('Current Working Directory:', process.cwd());

    // If the machine has an image, attempt to delete the file
    if (machine.Image) {
      try {
        // Construct the full path to the image with more robust path handling
        const imagePath = machine.Image.startsWith('/') 
          ? machine.Image.slice(1)  // Remove leading slash
          : machine.Image;
        
        const fullImagePath = path.join(process.cwd(), 'public', imagePath);

        console.log('Full Image Path:', fullImagePath);

        // Check if file exists and delete it
        try {
          await fs.access(fullImagePath);
          await fs.unlink(fullImagePath);
          console.log(`Deleted image: ${fullImagePath}`);
        } catch (fileError) {
          console.warn(`Could not delete image: ${fullImagePath}`, fileError);
          
          // More detailed error logging
          if (fileError instanceof Error) {
            console.warn('Error details:', {
              code: fileError.code,
              message: fileError.message
            });
          }
        }
      } catch (pathError) {
        console.error('Error processing image path:', pathError);
      }
    }

    // Delete the machine from the database
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
      { 
        error: 'Failed to delete machine', 
        details: error instanceof Error ? error.message : 'Unknown error' 
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

