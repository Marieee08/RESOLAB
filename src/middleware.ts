import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'



const isProtectedRoute = createRouteMatcher([
  '/services/user/schedule(.*)','/dashboard(.*)'
])

const isAdminRoute = createRouteMatcher([
  '/services/admin(.*)', '/dashboard/admin(.*)'
])

export default clerkMiddleware((auth, req) => {
  if(isProtectedRoute(req)) {
    const { userId, sessionClaims } = auth();
    auth().protect();
    
    // Then check for admin routes
    if(isAdminRoute(req)) {
      // Assuming you store role in public metadata or claims
      const isAdmin = sessionClaims?.metadata?.role === 'admin';
      
      if (!isAdmin) {
        // Redirect non-admins to user dashboard
        return NextResponse.redirect(new URL('/dashboard/user', req.url));
      }
    }
    
    // For user routes, redirect admins to admin dashboard if they try to access user routes
    if (req.nextUrl.pathname.startsWith('/services/user') || req.nextUrl.pathname === '/dashboard/user') {
      const isAdmin = sessionClaims?.metadata?.role === 'admin';
      
      if (isAdmin) {
        return NextResponse.redirect(new URL('/dashboard/admin', req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}