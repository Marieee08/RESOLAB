import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const { status } = await req.json();

    // Validate input
    if (!['Approved', 'Rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be either Approved or Cancelled' },
        { status: 400 }
      );
    }

    // Update reservation status
    const updatedReservation = await prisma.utilReq.update({
      where: {
        id: id,
      },
      data: {
        Status: status,
        DateofProcessing: new Date(), // Record when the status was updated
      },
      include: {
        accInfo: {
          include: {
            ClientInfo: true,
            BusinessInfo: true,
          },
        },
        UserServices: true,
        UserTools: true,
        UtilTimes: true,
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return NextResponse.json(
      { error: 'Failed to update reservation status' },
      { status: 500 }
    );
  }
}