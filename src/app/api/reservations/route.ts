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

   // Create the UtilReq entry
   const utilReq = await prisma.utilReq.create({
     data: {
       ProductsManufactured: data.ProductsManufactured,
       BulkofCommodity: data.BulkofCommodity,
       RequestDate: new Date(),
       EndDate: new Date(data.days[data.days.length - 1].date), // Use last selected date
       accInfoId: userAccount.id,
       
       // Create ProcessInfo
       ProcessInfos: {
         create: {
           Equipment: data.Equipment,
           Tools: data.Tools,
           ToolsQty: data.ToolsQty,
         },
       },

       // Create UtilTime entries for each day
       UtilTimes: {
         create: data.days.map((day: { date: Date; startTime: string | null; endTime: string | null; }, index: number) => ({
           DayNum: index + 1,
           StartTime: combineDateAndTime(day.date, day.startTime),
           EndTime: combineDateAndTime(day.date, day.endTime),
         })),
       },
     },
     include: {
       ProcessInfos: true,
       UtilTimes: true,
     },
   });

   // Handle BusinessInfo creation/update
   if (data.CompanyName) {
     await prisma.businessInfo.upsert({
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
         CompanyZipcode: data.CompanyZipcode,
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

// Helper function to combine date and time
function combineDateAndTime(date: Date, time: string | null): Date {
 if (!time) return new Date(date);
 
 const [timeStr, period] = time.split(' ');
 const [hours, minutes] = timeStr.split(':');
 const newDate = new Date(date);
 
 let hour = parseInt(hours);
 if (period === 'PM' && hour !== 12) hour += 12;
 if (period === 'AM' && hour === 12) hour = 0;
 
 newDate.setHours(hour, parseInt(minutes));
 return newDate;
}