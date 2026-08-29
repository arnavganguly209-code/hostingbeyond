import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireOrbitAdmin, unauthorizedJson } from "@/lib/orbit/api";

export const runtime = "nodejs";

export async function GET() {
  const admin = await requireOrbitAdmin();
  if (!admin) return unauthorizedJson();

  const [credentialCount, mediaCount, pageCount, recentActivity] =
    await Promise.all([
      prisma.webAuthnCredential.count(),
      prisma.mediaAsset.count().catch(() => 0),
      prisma.pageContent.count().catch(() => 0),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  return NextResponse.json({
    admin: { id: admin.id, displayName: admin.displayName },
    stats: {
      credentials: credentialCount,
      media: mediaCount,
      pages: pageCount || 1,
    },
    recentActivity,
  });
}
