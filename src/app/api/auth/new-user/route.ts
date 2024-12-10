// app/api/auth/new-user/route.ts
import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = auth();
  
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await currentUser();
  
  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  try {
    // Try to find existing user
    let dbUser = await prisma.accInfo.findUnique({ 
      where: { clerkId: user.id },
    });

    // If user doesn't exist, create them
    if (!dbUser) {
      dbUser = await prisma.accInfo.create({ 
        data: {
          clerkId: user.id,
          Name: `${user.firstName} ${user.lastName}`, 
          email: user.emailAddresses[0].emailAddress,
          // Role will default to "USER" as specified in your schema
        },
      });
    }

    // Redirect to dashboard after successful sync
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: '/user-dashboard',
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}