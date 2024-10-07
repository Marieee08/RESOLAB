import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: { json: () => PromiseLike<{ email: any; password: any; }> | { email: any; password: any; }; }) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.accInfo.findUnique({ where: { Email: email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.Role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ 
      user: { id: user.id, name: user.Name, email: user.Email, role: user.Role } 
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}