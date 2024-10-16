import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return new NextResponse("Invalid ID parameter", { status: 400 });
    }

    const user = await prisma.accInfo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Search Error:", error);
    return new NextResponse("Failed to find user", { status: 500 });
  }
}
