import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createAuthenticationOptions } from "@/lib/orbit/webauthn";

export const runtime = "nodejs";

export async function POST() {
  try {
    const count = await prisma.webAuthnCredential.count();
    if (count === 0) {
      return NextResponse.json(
        { error: "No passkey enrolled", needsEnrollment: true },
        { status: 404 },
      );
    }

    const options = await createAuthenticationOptions();
    return NextResponse.json({ options });
  } catch (error) {
    console.error("[orbit] login options", error);
    return NextResponse.json(
      { error: "Unable to start passkey login" },
      { status: 500 },
    );
  }
}
