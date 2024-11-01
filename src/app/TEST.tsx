import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    const {stripeID, userID } = await request.body.json()

    const user = await clerkClient.users.getUser(userID)

   
    return NextResponse.json(user.publicMetadata)
}