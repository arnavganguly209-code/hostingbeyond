import { NextRequest, NextResponse } from "next/server";
import type { AuthenticationResponseJSON } from "@simplewebauthn/server";

import {
  createAdminSession,
  logActivity,
  ORBIT_SESSION_COOKIE,
  SESSION_TTL_MS,
} from "@/lib/orbit/session";
import { verifyAuthentication } from "@/lib/orbit/webauthn";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      response?: AuthenticationResponseJSON;
    };

    if (!body.response) {
      return NextResponse.json({ error: "Missing response" }, { status: 400 });
    }

    const result = await verifyAuthentication(body.response);
    if (!result.ok || !result.adminUser) {
      await logActivity({
        action: "LOGIN_FAILED",
        resource: "webauthn",
        details: "Passkey authentication failed",
      });
      return NextResponse.json(
        { error: "Passkey authentication failed" },
        { status: 401 },
      );
    }

    const session = await createAdminSession(result.adminUser.id, {
      userAgent: request.headers.get("user-agent"),
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        undefined,
    });

    await logActivity({
      adminUserId: result.adminUser.id,
      action: "LOGIN",
      resource: "session",
    });

    const response = NextResponse.json({
      ok: true,
      admin: {
        id: result.adminUser.id,
        displayName: result.adminUser.displayName,
      },
    });

    response.cookies.set(ORBIT_SESSION_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: session.expiresAt,
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    });

    return response;
  } catch (error) {
    console.error("[orbit] login verify", error);
    return NextResponse.json(
      { error: "Unable to complete passkey login" },
      { status: 500 },
    );
  }
}
