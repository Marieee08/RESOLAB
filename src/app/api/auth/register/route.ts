import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, contactNum } = await req.json();

    const newUser = await prisma.accInfo.create({
      data: {
        name,
        email,
        contactNum,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Registration Error:", error);
    return new NextResponse("Failed to register user", { status: 500 });
  }
}
