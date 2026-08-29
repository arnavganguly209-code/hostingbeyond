import { NextRequest, NextResponse } from "next/server";

import { ORBIT_SESSION_COOKIE, verifyOrbitJwt } from "@/lib/orbit/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isOrbitPage = pathname.startsWith("/orbit");
  const isOrbitApi = pathname.startsWith("/api/orbit");
  const isAuthApi = pathname.startsWith("/api/orbit/auth/");

  if (!isOrbitPage && !isOrbitApi) {
    return NextResponse.next();
  }

  // Legacy login URL → clean /orbit (no ?next=)
  if (pathname === "/orbit/login" || pathname.startsWith("/orbit/login/")) {
    return NextResponse.redirect(new URL("/orbit", request.url));
  }

  if (isAuthApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ORBIT_SESSION_COOKIE)?.value;
  const verified = await verifyOrbitJwt(token);

  // Unauthenticated: stay on /orbit for the gate. Other Orbit pages → /orbit.
  if (!verified) {
    if (isOrbitApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (pathname === "/orbit") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/orbit", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orbit/:path*", "/api/orbit/:path*"],
};
