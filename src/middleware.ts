import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Allow access to dashboard and services routes without authentication
  const publicPaths = ['/dashboard', '/services'];

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();  // Allow access without checking token
  }

  // If not accessing public paths, check for authentication token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { role: string };

    // Check for admin routes
    if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/services/admin')) {
      if (decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/user', request.url));
      }
    }

    // For user routes, both admin and user roles are allowed
    if (pathname.startsWith('/dashboard/user') || pathname.startsWith('/services/user')) {
      if (!['ADMIN', 'USER'].includes(decoded.role)) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/services/:path*'],
};
