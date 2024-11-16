import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request
) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');  // Extract userId from query params

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const businessInfo = await prisma.businessInfo.findFirst({
      where: {
        accInfo: {
          clerkId: userId
        }
      }
    });

    if (!businessInfo) {
      return NextResponse.json({ error: "No business info found" }, { status: 404 });
    }

    return NextResponse.json(businessInfo);
  } catch (error) {
    console.error('Error fetching business info:', error);
    return NextResponse.json({ error: "Error fetching business info" }, { status: 500 });
  }
}
