// pages/api/user/info.js
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { RequestLike } from "node_modules/@clerk/nextjs/dist/types/server/types";

export default async function handler(req: RequestLike, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; clientInfo?: { id: number; ContactNum: string; Address: string | null; City: string | null; Province: string | null; Zipcode: number | null; accInfoId: number; } | null; businessInfo?: { id: number; accInfoId: number; CompanyName: string | null; BusinessOwner: string | null; BusinessPermitNum: string | null; TINNum: string | null; CompanyIDNum: string | null; CompanyEmail: string | null; ContactPerson: string | null; Designation: string | null; CompanyAddress: string | null; CompanyCity: string | null; CompanyProvince: string | null; CompanyZipcode: number | null; CompanyPhoneNum: string | null; CompanyMobileNum: string | null; Manufactured: string | null; ProductionFrequency: string | null; Bulk: string | null; } | null; message?: string; }): any; new(): any; }; }; }) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const userInfo = await prisma.accInfo.findFirst({
        where: { clerkId: userId },
        include: {
          ClientInfo: true,
          BusinessInfo: true,
        },
      });

      if (!userInfo) {
        return res.status(404).json({ error: "User information not found" });
      }

      return res.status(200).json({
        clientInfo: userInfo.ClientInfo || null,
        businessInfo: userInfo.BusinessInfo || null,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { personalInfo, businessInfo, isBusinessView } = req.body;

      const userInfo = await prisma.accInfo.findFirst({
        where: { clerkId: userId },
      });

      if (!userInfo) {
        return res.status(404).json({ error: "User not found" });
      }

      if (isBusinessView) {
        await prisma.businessInfo.upsert({
          where: { accInfoId: userInfo.id },
          update: businessInfo,
          create: {
            ...businessInfo,
            accInfoId: userInfo.id,
          },
        });
      } else {
        await prisma.clientInfo.upsert({
          where: { accInfoId: userInfo.id },
          update: personalInfo,
          create: {
            ...personalInfo,
            accInfoId: userInfo.id,
          },
        });
      }

      return res.status(200).json({ message: "Information updated successfully" });
    } catch (error) {
      console.error('Error updating user info:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}