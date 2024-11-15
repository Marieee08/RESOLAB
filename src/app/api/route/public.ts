import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const { role, userId } = await request.json()
  
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
    },
  })
  
  return NextResponse.json({ success: true })
}