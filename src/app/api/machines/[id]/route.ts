// app/api/machines/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'


// PUT: Update a machine by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
 try {
   const { name, image, description, videoUrl } = await request.json();
   const { id } = params;


   // Update the machine with the provided ID
   const updatedMachine = await prisma.machine.update({
     where: { id },
     data: {
       Machine: name,
       Image: image,
       Desc: description,
       Link: videoUrl,
     },
   });


   return NextResponse.json(updatedMachine, { status: 200 });
 }
 catch (error) {
   console.error('Error updating machine:', error);
   return NextResponse.json({ error: 'Failed to update machine' }, { status: 500 });
 }
}


// Optionally, you could also implement DELETE if needed
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
 try {
   const { id } = params;


   // Delete the machine with the provided ID
   await prisma.machine.delete({
     where: { id },
   });
   return NextResponse.json({ message: 'Machine deleted successfully' }, { status: 200 });
 }
 catch (error) {
   console.error('Error deleting machine:', error);
   return NextResponse.json({ error: 'Failed to delete machine' }, { status: 500 });
 }
}
