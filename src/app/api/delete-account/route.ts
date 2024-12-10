
import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Delete from your database
    await prisma.accInfo.delete({
      where: { clerkId: userId },
    });

    // Delete from Clerk
    try {
      await clerkClient.users.deleteUser(userId);
    } catch (clerkError) {
      console.error('Clerk deletion error:', clerkError);
      // Even if Clerk deletion fails, we don't need to throw
      // since the user will eventually be cleaned up by Clerk
    }

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Database deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}