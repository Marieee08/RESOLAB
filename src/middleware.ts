'use server'
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkRole } from 'utils/roles'
import { clerkClient } from '@clerk/nextjs/server'


// Route matchers
const isProtectedRoute = createRouteMatcher([
    '/services/user/schedule(.*)',
    '/dashboard(.*)'
]);

const isAdminRoute = createRouteMatcher([
    '/services/admin(.*)',
    '/dashboard/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
    if(isProtectedRoute(req)) {
      const { userId, sessionClaims } = auth();
      auth().protect();

    
    if (req.nextUrl.pathname === '/dashboard/user') {
        if (!checkRole('ADMIN')) {
            const url = new URL('/dashboard/admin', req.url);
            return NextResponse.redirect(url)
          }
    }

    if (req.nextUrl.pathname === '/dashboard/admin') {
        if (!checkRole('USER')) {
            const url = new URL('/dashboard/user', req.url);
            return NextResponse.redirect(url)
          }
    }
      
    if (isAdminRoute(req) && !checkRole('USER')) {
        const url = new URL('/', req.url)
        return NextResponse.redirect(url)
      }
    
    }
  
    { debug: true }
  });
  


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};