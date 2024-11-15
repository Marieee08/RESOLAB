// app/api/client-info/[userId]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const clientInfo = await prisma.clientInfo.findFirst({
      where: {
        accInfo: {
          clerkId: params.userId
        }
      }
    });
    
    return NextResponse.json(clientInfo);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching client info" }, { status: 500 });
  }
}