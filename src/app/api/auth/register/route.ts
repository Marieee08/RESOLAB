import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: { json: () => PromiseLike<{ name: any; email: any; password: any; }> | { name: any; email: any; password: any; }; }) {
  const { name, email, password } = await request.json();

  try {
    const existingUser = await prisma.accInfo.findUnique({ where: { Email: email } });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.accInfo.create({
      data: {
        Name: name,
        Email: email,
        Password: hashedPassword,
      },
    });

    return NextResponse.json({ user: { id: newUser.id, name: newUser.Name, email: newUser.Email, role: newUser.Role } });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}