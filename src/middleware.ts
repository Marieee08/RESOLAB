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



export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};