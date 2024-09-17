// app/api/register/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and Password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password, // Remember to hash the password in production
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
