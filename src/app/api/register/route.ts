import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, name, contactNum } = await request.json();

  // Validate input
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const accInfo = await prisma.accInfo.create({
      data: {
        email,
        name,
        contactNum, // Updated field name
      },
    });

    return NextResponse.json(accInfo, { status: 201 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
