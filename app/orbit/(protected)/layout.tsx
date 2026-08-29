import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { OrbitShell } from "@/components/orbit/shell";
import { getSessionAdmin, ORBIT_SESSION_COOKIE } from "@/lib/orbit/session";

export const metadata = {
  title: "Orbit | HostingBeyond",
  robots: { index: false, follow: false },
};

export default async function OrbitProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const admin = await getSessionAdmin(jar.get(ORBIT_SESSION_COOKIE)?.value);
  if (!admin) redirect("/orbit/login");

  return <OrbitShell adminName={admin.displayName}>{children}</OrbitShell>;
}
