import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs'; // Assuming bcryptjs for password encryption
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Find user in database
  const user = await prisma.accInfo.findUnique({
    where: { Email: email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Compare password
  const isMatch = await compare(password, user.Profile);

  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Generate JWT
  const token = sign({ userId: user.id, role: user.Role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  // Return response
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, { httpOnly: true, path: '/' });
  
  return response;
}
