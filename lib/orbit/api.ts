import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSessionAdmin, ORBIT_SESSION_COOKIE } from "@/lib/orbit/session";

export async function requireOrbitAdmin() {
  const jar = await cookies();
  const token = jar.get(ORBIT_SESSION_COOKIE)?.value;
  const admin = await getSessionAdmin(token);
  if (!admin) return null;
  return admin;
}

export function unauthorizedJson(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenJson(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}
