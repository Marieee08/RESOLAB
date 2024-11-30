// app/api/update-info/route.ts
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

    if (type === 'business') {
      // Handle BusinessInfo creation/update
      const updatedBusiness = await prisma.businessInfo.upsert({
        where: {
          accInfoId: userAccount.id,
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
          CompanyZipcode: data.CompanyZipcode ? parseInt(data.CompanyZipcode.toString()) : null,
          CompanyPhoneNum: data.CompanyPhoneNum,
          CompanyMobileNum: data.CompanyMobileNum,
          Manufactured: data.Manufactured,
          ProductionFrequency: data.ProductionFrequency,
          Bulk: data.Bulk,
        },
        create: {
          accInfoId: userAccount.id,
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
          CompanyZipcode: data.CompanyZipcode ? parseInt(data.CompanyZipcode.toString()) : null,
          CompanyPhoneNum: data.CompanyPhoneNum,
          CompanyMobileNum: data.CompanyMobileNum,
          Manufactured: data.Manufactured,
          ProductionFrequency: data.ProductionFrequency,
          Bulk: data.Bulk,
        },
      });

      return NextResponse.json({
        success: true,
        data: updatedBusiness,
        message: 'Business information updated successfully'
      });
    } else if (type === 'personal') {
      // Handle Personal Information creation/update
      const updatedClient = await prisma.clientInfo.upsert({
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
        data: updatedClient,
        message: 'Personal information updated successfully'
      });
    }

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