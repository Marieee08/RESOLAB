import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reservationId = parseInt(params.id);
    
    // Delete associated ProcessInfos and UtilTimes
    await prisma.processInfo.deleteMany({
      where: { utilReqId: reservationId }
    });
    
    await prisma.utilTime.deleteMany({
      where: { utilReqId: reservationId }
    });
    
    // Delete the reservation
    await prisma.utilReq.delete({
      where: { id: reservationId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete reservation:', error);
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}