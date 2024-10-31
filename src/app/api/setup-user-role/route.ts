import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from '../../../lib/prisma';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();
        
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Create record in your database
        await prisma.accInfo.create({
            data: {
                clerkId: user.id,
                Name: `${user.firstName} ${user.lastName}`,
                Role: "USER",
            }
        });

        // Set Clerk metadata
        await clerkClient.users.updateUser(user.id, {
            publicMetadata: { role: 'user' }
        });

        return NextResponse.redirect(new URL('/dashboard/user', process.env.NEXT_PUBLIC_URL!));
    } catch (error) {
        console.error('Error setting up user:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}