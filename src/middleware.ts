import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;


  // Check for authentication token for all dashboard and services routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { role: string };

    // Redirect based on role for dashboard and services root paths
    if (pathname === '/dashboard' || pathname === '/services') {
      if (decoded.role === 'ADMIN') {
        return NextResponse.redirect(new URL(`${pathname}/admin`, request.url));
      } else {
        return NextResponse.redirect(new URL(`${pathname}/user`, request.url));
      }
    }

    // Check for admin routes
    if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/services/admin')) {
      if (decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL(pathname.replace('/admin', '/user'), request.url));
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