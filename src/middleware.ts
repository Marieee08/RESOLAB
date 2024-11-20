import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  // This runs after Clerk's default middleware
  afterAuth(auth, req) {
    // Redirect unsigned users accessing protected routes
    if (!auth.userId && req.nextUrl.pathname.startsWith('/services/user/schedule')) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Protect admin routes (role-based access control)
    const role = auth.sessionClaims?.metadata?.role as string;
    if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
      const notAuthorizedUrl = new URL('/not-authorized', req.url);
      return NextResponse.redirect(notAuthorizedUrl);
    }

    // Allow the request to continue
    return NextResponse.next();
  },

  publicRoutes: ['/', '/sign-in', '/sign-up', '/contact'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
