import { NextRequest, NextResponse } from "next/server";

import {
  destroyAdminSession,
  getSessionAdmin,
  logActivity,
  ORBIT_SESSION_COOKIE,
} from "@/lib/orbit/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ORBIT_SESSION_COOKIE)?.value;
  const admin = await getSessionAdmin(token);

  await destroyAdminSession(token);

  if (admin) {
    await logActivity({
      adminUserId: admin.id,
      action: "LOGOUT",
      resource: "session",
    });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ORBIT_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
