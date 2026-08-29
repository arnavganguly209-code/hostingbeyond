import { NextRequest, NextResponse } from "next/server";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";

import { prisma } from "@/lib/prisma";
import {
  createAdminSession,
  logActivity,
  ORBIT_SESSION_COOKIE,
  SESSION_TTL_MS,
  verifyEnrollmentSecret,
} from "@/lib/orbit/session";
import { verifyRegistration } from "@/lib/orbit/webauthn";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      enrollmentSecret?: string;
      response?: RegistrationResponseJSON;
    };

    if (!body.response) {
      return NextResponse.json({ error: "Missing response" }, { status: 400 });
    }

    const credentialCount = await prisma.webAuthnCredential.count();
    if (credentialCount > 0) {
      return NextResponse.json(
        { error: "Passkey already enrolled" },
        { status: 409 },
      );
    }

    if (!verifyEnrollmentSecret(body.enrollmentSecret ?? "")) {
      return NextResponse.json(
        { error: "Invalid enrollment secret" },
        { status: 403 },
      );
    }

    let admin = await prisma.adminUser.findFirst();
    if (!admin) {
      admin = await prisma.adminUser.create({
        data: { displayName: "Super Admin" },
      });
    }

    const result = await verifyRegistration(admin.id, body.response);
    if (!result.ok) {
      return NextResponse.json(
        { error: "Passkey verification failed" },
        { status: 400 },
      );
    }

    const session = await createAdminSession(admin.id, {
      userAgent: request.headers.get("user-agent"),
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        undefined,
    });

    await logActivity({
      adminUserId: admin.id,
      action: "ENROLL",
      resource: "webauthn",
      details: "Super Admin passkey enrolled",
    });

    const response = NextResponse.json({ ok: true });
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
    console.error("[orbit] register verify", error);
    return NextResponse.json(
      { error: "Unable to complete passkey enrollment" },
      { status: 500 },
    );
  }
}
