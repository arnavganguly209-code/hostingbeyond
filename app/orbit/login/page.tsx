import { Suspense } from "react";

import { OrbitLoginForm } from "@/components/orbit/login-form";

export const metadata = {
  title: "Orbit Login | HostingBeyond",
  robots: { index: false, follow: false },
};

export default function OrbitLoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[var(--hb-bg)] px-4 py-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.2),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.18),transparent_70%)] blur-3xl" />
      </div>
      <Suspense
        fallback={
          <div className="text-sm text-[var(--hb-muted)]">Loading Orbit…</div>
        }
      >
        <OrbitLoginForm />
      </Suspense>
    </main>
  );
}
