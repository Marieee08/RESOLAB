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
          clerkId: params.userId, // Ensure this matches the actual relationship field
        },
      },
      include: {
        accInfo: true, // Include the related account information
      },
    });

    return NextResponse.json(businessInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching business info" }, { status: 500 });
  }
}
