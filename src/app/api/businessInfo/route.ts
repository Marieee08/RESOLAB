import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      console.error("No userId provided");
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    console.log("Received userId:", userId);

    const businessInfo = await prisma.businessInfo.findFirst({
      where: {
        accInfo: {
          clerkId: userId,
        },
      },
    });

    console.log("Fetched Business Info:", businessInfo);

    return NextResponse.json(businessInfo);
  } catch (error) {
    console.error("Error fetching business info:", error);
    return NextResponse.json({ error: "Error fetching business info" }, { status: 500 });
  }
}



