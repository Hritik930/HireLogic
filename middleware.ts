import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard", "/my-resume/:resumeId/edit"]);
const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? process.env.CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

const clerkHandler = clerkMiddleware(
  (auth, request) => {
    if (isProtectedRoute(request)) {
      auth().protect();
    }
  },
  {
    publishableKey,
    secretKey,
  }
);

export default function middleware(request: Request, event: Parameters<typeof clerkHandler>[1]) {
  if (!publishableKey || !secretKey) {
    return NextResponse.next();
  }

  return clerkHandler(request, event);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
