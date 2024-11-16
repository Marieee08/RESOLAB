import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedInfo = await prisma.clientInfo.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        ContactNum: data.ContactNum,
        Address: data.Address,
        City: data.City,
        Province: data.Province,
        Zipcode: data.Zipcode ? parseInt(data.Zipcode) : null,
      }
    });

    return NextResponse.json(updatedInfo);
  } catch (error) {
    console.error('Error updating client info:', error);
    return NextResponse.json(
      { error: "Error updating client information" }, 
      { status: 500 }
    );
  }
}