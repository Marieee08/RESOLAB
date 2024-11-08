import { clerkMiddleware, createRouteMatcher, authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Route matchers
const isProtectedRoute = createRouteMatcher([
    '/services/user/schedule(.*)',
    '/dashboard(.*)'
]);

const isAdminRoute = createRouteMatcher([
    '/services/admin(.*)',
    '/dashboard/admin(.*)'
]);

export default clerkMiddleware((auth, req) => {
    if(isProtectedRoute(req)) {
      const { userId, sessionClaims } = auth();
      auth().protect();
      
  
      
      // Then check for admin routes
      if(isAdminRoute(req)) {
        // Assuming you store role in public metadata or claims
  
 
        }
      
    }
  
    { debug: true }
  });
  


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};