// app/api/machines/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import based on your setup

export async function POST(request: Request) {
  try {
    const { name, image, description, videoUrl } = await request.json();

    const newMachine = await prisma.machine.create({
      data: {
        Machine: name,
        Image: image,
        Desc: description,
        Link: videoUrl,
      },
    });

    return NextResponse.json(newMachine, { status: 201 });
  } catch (error) {
    console.error('Error creating machine:', error);
    return NextResponse.json({ error: 'Failed to create machine' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const machines = await prisma.machine.findMany();  // Use your actual model name if it's different
    return NextResponse.json(machines);
  } catch (error) {
    console.error('Error fetching machines:', error);
    return NextResponse.error();
  }
}
