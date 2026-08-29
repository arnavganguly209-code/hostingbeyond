import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyEnrollmentSecret } from "@/lib/orbit/session";
import { createRegistrationOptions } from "@/lib/orbit/webauthn";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { enrollmentSecret?: string };
    const credentialCount = await prisma.webAuthnCredential.count();

    if (credentialCount === 0) {
      if (!verifyEnrollmentSecret(body.enrollmentSecret ?? "")) {
        return NextResponse.json(
          { error: "Invalid enrollment secret" },
          { status: 403 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Passkey already enrolled. Use Continue with Passkey." },
        { status: 409 },
      );
    }

    let admin = await prisma.adminUser.findFirst();
    if (!admin) {
      admin = await prisma.adminUser.create({
        data: { displayName: "Super Admin" },
      });
    }

    const options = await createRegistrationOptions(
      admin.id,
      admin.displayName,
    );

    return NextResponse.json({ options, mode: "enroll" });
  } catch (error) {
    console.error("[orbit] register options", error);
    return NextResponse.json(
      { error: "Unable to start passkey enrollment" },
      { status: 500 },
    );
  }
}
