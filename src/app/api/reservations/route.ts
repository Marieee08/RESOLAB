import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    
      const data = await request.json();

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

    // Create the UtilReq entry first
    const utilReq = await prisma.utilReq.create({
      data: {
        ProductsManufactured: data.ProductsManufactured,
        BulkofCommodity: data.BulkofCommodity,
        RequestDate: new Date(),
        EndDate: data.endDate,
        accInfoId: userAccount.id, // Use the found accInfoId
        ProcessInfos: {
          create: {
            Facility: data.Facility,
            FacilityQty: data.FacilityQty,
            FacilityHrs: data.FacilityHrs,
            Equipment: data.Equipment,
            EquipmentQty: data.EquipmentQty,
            EquipmentHrs: data.EquipmentHrs,
            Tools: data.Tools,
            ToolsQty: data.ToolsQty,
            ToolsHrs: data.ToolsHrs,
          },
        },
        UtilTimes: {
          create: {
            StartTime: new Date(data.startTime),
            EndTime: new Date(data.endTime),
            DayNum: 1, // You may want to calculate this based on the dates
          },
        },
      },
      include: {
        ProcessInfos: true,
        UtilTimes: true,
      },
    });

    // If this is a new business, create/update the BusinessInfo
    if (data.CompanyName) {
      await prisma.businessInfo.upsert({
        where: {
          accInfoId: data.accInfoId,
        },
        update: {
          CompanyName: data.CompanyName,
          BusinessOwner: data.BusinessOwner,
          BusinessPermitNum: data.BusinessPermitNum,
          TINNum: data.TINNum,
          CompanyIDNum: data.CompanyIDNum,
          CompanyEmail: data.CompanyEmail,
          ContactPerson: data.ContactPerson,
          Designation: data.Designation,
          CompanyAddress: data.CompanyAddress,
          CompanyCity: data.CompanyCity,
          CompanyProvince: data.CompanyProvince,
          CompanyZipcode: data.CompanyZipcode,
          CompanyPhoneNum: data.CompanyPhoneNum,
          CompanyMobileNum: data.CompanyMobileNum,
          Manufactured: data.Manufactured,
          ProductionFrequency: data.ProductionFrequency,
          Bulk: data.Bulk,
        },
        create: {
          accInfoId: data.accInfoId,
          CompanyName: data.CompanyName,
          BusinessOwner: data.BusinessOwner,
          BusinessPermitNum: data.BusinessPermitNum,
          TINNum: data.TINNum,
          CompanyIDNum: data.CompanyIDNum,
          CompanyEmail: data.CompanyEmail,
          ContactPerson: data.ContactPerson,
          Designation: data.Designation,
          CompanyAddress: data.CompanyAddress,
          CompanyCity: data.CompanyCity,
          CompanyProvince: data.CompanyProvince,
          CompanyZipcode: data.CompanyZipcode,
          CompanyPhoneNum: data.CompanyPhoneNum,
          CompanyMobileNum: data.CompanyMobileNum,
          Manufactured: data.Manufactured,
          ProductionFrequency: data.ProductionFrequency,
          Bulk: data.Bulk,
        },
      });
    }

    return NextResponse.json(utilReq);
  } catch (error) {
    console.error('Reservation creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}