// app/api/auth/check-role/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ role: null });
  }

  try {
    const user = await prisma.accInfo.findUnique({
      where: { clerkId: userId },
      select: { Role: true }
    });

    return NextResponse.json({ role: user?.Role });
  } catch (error) {
    console.error('Error fetching role:', error);
    return NextResponse.json({ role: null });
  }
}