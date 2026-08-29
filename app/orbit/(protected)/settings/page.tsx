"use client";

import { useEffect, useState } from "react";

import type { CmsSiteSettings } from "@/lib/orbit/defaults";

export default function OrbitSettingsPage() {
  const [settings, setSettings] = useState<CmsSiteSettings | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/orbit/settings");
      const json = await res.json();
      if (res.ok) setSettings(json.settings);
    })();
  }, []);

  async function save() {
    if (!settings) return;
    const res = await fetch("/api/orbit/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    setStatus(res.ok ? "Settings saved" : "Save failed");
  }

  if (!settings)
    return <p className="text-sm text-[var(--hb-muted)]">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-[var(--hb-muted)]">
            Brand, contact, and CTA defaults.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void save()}
          className="rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-4 py-2 text-sm font-semibold"
        >
          Save
        </button>
      </div>
      {status ? <p className="text-sm text-emerald-300">{status}</p> : null}

      <div className="grid gap-4 rounded-2xl border border-white/10 p-5 md:grid-cols-2">
        {(
          [
            ["logoPath", "Logo path"],
            ["loginLabel", "Login label"],
            ["loginHref", "Login href"],
            ["getStartedLabel", "Get Started label"],
            ["getStartedHref", "Get Started href"],
            ["contactEmail", "Contact email"],
            ["contactPhone", "Contact phone"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-xs text-[var(--hb-muted)] uppercase">
            {label}
            <input
              value={String(settings[key] ?? "")}
              onChange={(e) =>
                setSettings({ ...settings, [key]: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white normal-case"
            />
          </label>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-100/90">
        Passkey credentials are managed via WebAuthn. Enrollment secret lives
        only in server <code>.env</code> as <code>ORBIT_ENROLLMENT_SECRET</code>{" "}
        and is never exposed to the client after enrollment.
      </div>
    </div>
  );
}
