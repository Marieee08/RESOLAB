import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default async function Page() {
  const { sessionClaims } = await auth()

  const firstName = sessionClaims?.fullName

  const primaryEmail = sessionClaims?.primaryEmail

  return NextResponse.json({ firstName, primaryEmail })
}