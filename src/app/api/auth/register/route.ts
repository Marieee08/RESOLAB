import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs'; // Assuming bcryptjs for password encryption

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  // Check if user already exists
  const existingUser = await prisma.accInfo.findUnique({
    where: { Email: email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create user
  const newUser = await prisma.accInfo.create({
    data: {
      Name: name,
      Email: email,
      Profile: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User created successfully' });
}
