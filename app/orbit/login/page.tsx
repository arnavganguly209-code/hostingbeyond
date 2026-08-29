import { redirect } from "next/navigation";

export const metadata = {
  title: "Orbit | HostingBeyond",
  robots: { index: false, follow: false },
};

/** Legacy path — Orbit login lives at /orbit only. */
export default function OrbitLoginRedirectPage() {
  redirect("/orbit");
}
