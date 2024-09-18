import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const accInfo = await prisma.accInfo.findUnique({
      where: {
        id: Number(id), // Convert ID to number
      },
    });

    if (accInfo) {
      return NextResponse.json(accInfo, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
