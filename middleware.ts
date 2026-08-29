import { NextRequest, NextResponse } from "next/server";

import { ORBIT_SESSION_COOKIE, verifyOrbitJwt } from "@/lib/orbit/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isOrbitPage = pathname.startsWith("/orbit");
  const isOrbitApi = pathname.startsWith("/api/orbit");
  const isAuthApi = pathname.startsWith("/api/orbit/auth/");
  const isLoginPage = pathname.startsWith("/orbit/login");

  if (!isOrbitPage && !isOrbitApi) {
    return NextResponse.next();
  }

  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ORBIT_SESSION_COOKIE)?.value;
  const verified = await verifyOrbitJwt(token);

  if (!verified) {
    if (isOrbitApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/orbit/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orbit/:path*", "/api/orbit/:path*"],
};
