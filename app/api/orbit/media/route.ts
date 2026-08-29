import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireOrbitAdmin, unauthorizedJson } from "@/lib/orbit/api";
import { logActivity } from "@/lib/orbit/session";

export const runtime = "nodejs";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_BYTES = 8 * 1024 * 1024;

export async function GET(request: NextRequest) {
  const admin = await requireOrbitAdmin();
  if (!admin) return unauthorizedJson();

  const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const filtered = q
    ? assets.filter(
        (asset) =>
          asset.originalName.toLowerCase().includes(q) ||
          asset.alt.toLowerCase().includes(q),
      )
    : assets;

  return NextResponse.json({ assets: filtered });
}

export async function POST(request: NextRequest) {
  const admin = await requireOrbitAdmin();
  if (!admin) return unauthorizedJson();

  const form = await request.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 8MB)" },
      { status: 400 },
    );
  }

  const ext = path.extname(file.name).toLowerCase() || ".bin";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(
    ext,
  )
    ? ext
    : ".png";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);
  const url = `/uploads/${filename}`;

  try {
    const asset = await prisma.mediaAsset.create({
      data: {
        filename,
        originalName: file.name.slice(0, 180),
        mimeType: file.type,
        size: file.size,
        alt: alt.slice(0, 200),
        url,
      },
    });

    await logActivity({
      adminUserId: admin.id,
      action: "MEDIA_UPLOAD",
      resource: asset.id,
      details: asset.originalName,
    });

    return NextResponse.json({ asset });
  } catch {
    return NextResponse.json({
      asset: {
        id: filename,
        url,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        alt,
      },
    });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await requireOrbitAdmin();
  if (!admin) return unauthorizedJson();

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.mediaAsset.delete({ where: { id } });
  await logActivity({
    adminUserId: admin.id,
    action: "MEDIA_DELETE",
    resource: id,
    details: asset.originalName,
  });

  return NextResponse.json({ ok: true });
}
