"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Navigation,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/orbit", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orbit/pages", label: "Pages", icon: FileText },
  { href: "/orbit/content", label: "Website Content", icon: Sparkles },
  { href: "/orbit/navigation", label: "Navigation", icon: Navigation },
  { href: "/orbit/media", label: "Media Library", icon: ImageIcon },
  { href: "/orbit/seo", label: "SEO", icon: Search },
  { href: "/orbit/forms", label: "Forms", icon: FileText },
  { href: "/orbit/activity", label: "Activity Log", icon: Activity },
  { href: "/orbit/settings", label: "Settings", icon: Settings },
] as const;

export function OrbitShell({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/orbit/auth/logout", { method: "POST" });
    router.replace("/orbit");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-[#050814] text-white">
      <div className="mx-auto flex min-h-dvh max-w-[1600px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#070b18]/95 p-4 backdrop-blur-xl transition-transform lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between px-2">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--hb-muted)] uppercase">
                HostingBeyond
              </p>
              <p className="text-lg font-bold">Orbit</p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2 lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {nav.map((item) => {
              const active =
                item.href === "/orbit"
                  ? pathname === "/orbit"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-[var(--hb-blue)]/15 text-white shadow-[0_0_20px_rgb(10_132_255_/_0.15)]"
                      : "text-[var(--hb-muted)] hover:bg-white/5 hover:text-white",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-[#050814]/85 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/10 p-2 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Menu className="size-4" />
              </button>
              <div>
                <p className="text-[11px] text-[var(--hb-muted)]">
                  Super Admin
                </p>
                <p className="text-sm font-semibold">{adminName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-300 sm:inline">
                Passkey session
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-[var(--hb-muted)] transition hover:bg-white/5 hover:text-white"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
