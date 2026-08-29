import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireOrbitAdmin, unauthorizedJson } from "@/lib/orbit/api";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = await requireOrbitAdmin();
  if (!admin) return unauthorizedJson();

  const take = Math.min(
    Number(request.nextUrl.searchParams.get("take") ?? 50),
    100,
  );

  const logs = await prisma.activityLog.findMany({
    take,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ logs });
}
