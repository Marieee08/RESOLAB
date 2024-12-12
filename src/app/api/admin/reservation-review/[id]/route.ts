// app/api/admin/reservation-details/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reservationId = parseInt(params.id);

    const reservation = await prisma.utilReq.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        accInfo: {
          include: {
            ClientInfo: true,
            BusinessInfo: true,
          }
        },
        UserServices: true,
        UserTools: true,
        UtilTimes: true,
      },
    });

    if (!reservation) {
      return new NextResponse("Reservation not found", { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('[RESERVATION_DETAILS_GET]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}