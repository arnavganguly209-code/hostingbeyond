"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function OrbitLoginForm() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/orbit/auth/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error || "Access denied");
      }
      setStatus("success");
      setMessage("Authenticated. Opening Orbit…");
      setAccessKey("");
      router.replace("/orbit");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to open Orbit",
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-[28px] border border-[var(--hb-border-blue)] bg-[rgba(8,12,28,0.82)] p-7 shadow-[0_30px_80px_rgb(0_0_0_/_0.45),0_0_40px_rgb(10_132_255_/_0.15)] backdrop-blur-2xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-[var(--hb-blue)]/40 bg-[var(--hb-blue)]/15 text-[var(--hb-blue)] shadow-[0_0_24px_rgb(10_132_255_/_0.35)]">
          <KeyRound className="size-6" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--hb-muted)] uppercase">
            Orbit
          </p>
          <h1 className="text-xl font-bold text-white">Super Admin</h1>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[var(--hb-muted)]">
        Enter your Orbit access key to open the HostingBeyond dashboard. The key
        is verified against the server environment — it is never stored in the
        browser after login.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
        <ShieldCheck className="size-3.5" />
        Server-side access key
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <label className="block text-xs font-semibold tracking-wide text-white/70 uppercase">
          Access key
          <input
            type="password"
            name="orbit-access-key"
            autoComplete="current-password"
            value={accessKey}
            onChange={(event) => setAccessKey(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[var(--hb-blue)]/50"
            placeholder="Enter Orbit access key"
            required
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading" || !accessKey.trim()}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] text-sm font-semibold text-white shadow-[0_0_28px_rgb(10_132_255_/_0.35)] transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <KeyRound className="size-4" />
          )}
          Open Orbit Dashboard
        </button>
      </form>

      {message ? (
        <p
          className={`mt-4 text-center text-sm ${
            status === "error"
              ? "text-red-300"
              : status === "success"
                ? "text-emerald-300"
                : "text-[var(--hb-muted)]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </motion.div>
  );
}
