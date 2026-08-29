"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, ImageIcon, Sparkles, Activity } from "lucide-react";

type DashboardData = {
  admin: { displayName: string };
  stats: { credentials: number; media: number; pages: number };
  recentActivity: Array<{
    id: string;
    action: string;
    resource: string | null;
    createdAt: string;
  }>;
};

export default function OrbitDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/orbit/me");
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to load dashboard");
        return;
      }
      setData(json);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--hb-muted)]">
          Overview of HostingBeyond content and Orbit session health.
        </p>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Website status",
            value: "Online",
            href: "https://beyond.theglobalorbit.com",
            external: true,
          },
          {
            label: "Pages",
            value: String(data?.stats.pages ?? "—"),
            href: "/orbit/pages",
          },
          {
            label: "Media assets",
            value: String(data?.stats.media ?? "—"),
            href: "/orbit/media",
          },
          {
            label: "Passkeys",
            value: String(data?.stats.credentials ?? "—"),
            href: "/orbit/settings",
          },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[var(--hb-blue)]/40 hover:bg-white/[0.05]"
          >
            <p className="text-xs tracking-wide text-[var(--hb-muted)] uppercase">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              {
                href: "/orbit/content",
                label: "Edit website content",
                icon: Sparkles,
              },
              {
                href: "/orbit/media",
                label: "Open media library",
                icon: ImageIcon,
              },
              { href: "/orbit/pages", label: "Manage pages", icon: FileText },
              {
                href: "/orbit/activity",
                label: "View activity",
                icon: Activity,
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-[var(--hb-muted)] transition hover:border-white/20 hover:text-white"
              >
                <action.icon className="size-4" />
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold">Recent activity</h2>
          <ul className="mt-4 space-y-3">
            {(data?.recentActivity ?? []).length === 0 ? (
              <li className="text-sm text-[var(--hb-muted)]">
                No activity yet.
              </li>
            ) : (
              data?.recentActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-white/90">{item.action}</span>
                  <span className="text-xs text-[var(--hb-muted)]">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
