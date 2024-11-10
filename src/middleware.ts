// middleware.ts
import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";


// Route matchers
const isProtectedRoute = createRouteMatcher([
    '/services/user/schedule(.)',
]);


  export default clerkMiddleware(async (auth, req) => {

    if(isProtectedRoute(req)) {
      const { userId, sessionClaims } = auth();
      auth().protect();


    }

  }

);

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).)", "/", "/(api|trpc)(.)"],
  };