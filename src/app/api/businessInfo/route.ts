
// app/api/business-info/[userId]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const businessInfo = await prisma.businessInfo.findFirst({
      where: {
        accInfo: {
          clerkId: params.userId
        }
      }
    });
    
    return NextResponse.json(businessInfo);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching business info" }, { status: 500 });
  }
}