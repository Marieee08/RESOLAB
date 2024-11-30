import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { type, data } = await request.json();

    // Find the user's account
    const userAccount = await prisma.accInfo.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!userAccount) {
      return NextResponse.json(
        { error: 'User account not found' },
        { status: 404 }
      );
    }

    // Handle Personal Information
    if (type === 'personal') {
      const updatedInfo = await prisma.clientInfo.upsert({
        where: {
          accInfoId: userAccount.id,
        },
        update: {
          ContactNum: data.ContactNum,
          Address: data.Address,
          City: data.City,
          Province: data.Province,
          Zipcode: data.Zipcode ? parseInt(data.Zipcode.toString()) : null,
        },
        create: {
          accInfoId: userAccount.id,
          ContactNum: data.ContactNum,
          Address: data.Address,
          City: data.City,
          Province: data.Province,
          Zipcode: data.Zipcode ? parseInt(data.Zipcode.toString()) : null,
        },
      });

      return NextResponse.json({
        success: true,
        data: updatedInfo,
        message: 'Personal information updated successfully'
      });
    }

    // If no valid type is provided
    return NextResponse.json(
      { error: 'Invalid update type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in update-info API:', error);
    return NextResponse.json(
      { error: 'Failed to update information' },
      { status: 500 }
    );
  }
}