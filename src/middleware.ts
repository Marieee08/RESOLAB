// middleware.ts
import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  // This runs after Clerk's default middleware
  afterAuth(auth, req) {
    // If user is not signed in and trying to access protected routes
    if (!auth.userId && req.nextUrl.pathname.startsWith('/services/user/schedule')) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Get the user's role from session claims
    const role = auth.sessionClaims?.metadata?.role as string;

    // Protect admin routes are not yet accomplished


    // Allow the request to continue
    return NextResponse.next();
  },

  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/contact'
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};