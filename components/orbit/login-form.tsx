"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { Fingerprint, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

type Mode = "login" | "enroll";

export function OrbitLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/orbit";

  const [mode, setMode] = useState<Mode>("login");
  const [needsEnrollment, setNeedsEnrollment] = useState(false);
  const [enrollmentSecret, setEnrollmentSecret] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/orbit/auth/login/options", {
          method: "POST",
        });
        if (res.status === 404) {
          setNeedsEnrollment(true);
          setMode("enroll");
        }
      } catch {
        /* ignore probe errors */
      }
    })();
  }, []);

  const headline = useMemo(() => {
    if (mode === "enroll") return "Enroll Super Admin Passkey";
    return "Continue with Passkey";
  }, [mode]);

  async function onLogin() {
    setStatus("loading");
    setMessage("");
    try {
      const optionsRes = await fetch("/api/orbit/auth/login/options", {
        method: "POST",
      });
      const optionsJson = await optionsRes.json();
      if (!optionsRes.ok) {
        if (optionsJson.needsEnrollment) {
          setNeedsEnrollment(true);
          setMode("enroll");
          setStatus("idle");
          setMessage("No passkey enrolled yet. Complete secure enrollment.");
          return;
        }
        throw new Error(optionsJson.error || "Login failed");
      }

      const assertion = await startAuthentication({
        optionsJSON: optionsJson.options,
      });

      const verifyRes = await fetch("/api/orbit/auth/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: assertion }),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyJson.error || "Auth failed");

      setStatus("success");
      setMessage("Authenticated. Opening Orbit…");
      router.replace(nextPath.startsWith("/orbit") ? nextPath : "/orbit");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Passkey authentication failed",
      );
    }
  }

  async function onEnroll() {
    setStatus("loading");
    setMessage("");
    try {
      const optionsRes = await fetch("/api/orbit/auth/register/options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentSecret }),
      });
      const optionsJson = await optionsRes.json();
      if (!optionsRes.ok) {
        throw new Error(optionsJson.error || "Enrollment denied");
      }

      const attestation = await startRegistration({
        optionsJSON: optionsJson.options,
      });

      const verifyRes = await fetch("/api/orbit/auth/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentSecret,
          response: attestation,
        }),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyJson.error || "Enrollment failed");
      }

      setEnrollmentSecret("");
      setStatus("success");
      setMessage("Passkey enrolled. Opening Orbit…");
      router.replace("/orbit");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Passkey enrollment failed",
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
          <Fingerprint className="size-6" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--hb-muted)] uppercase">
            Orbit
          </p>
          <h1 className="text-xl font-bold text-white">Super Admin</h1>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[var(--hb-muted)]">
        Secure access to HostingBeyond. Passkey authentication only — no
        passwords.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
        <ShieldCheck className="size-3.5" />
        WebAuthn protected
      </div>

      {mode === "enroll" ? (
        <div className="mt-6 space-y-3">
          <p className="text-xs text-[var(--hb-muted)]">
            First-time setup requires the server enrollment secret from your
            private <code className="text-white/80">.env</code> (never stored in
            the browser after this step).
          </p>
          <label className="block text-xs font-semibold tracking-wide text-white/70 uppercase">
            Enrollment secret
            <input
              type="password"
              autoComplete="off"
              value={enrollmentSecret}
              onChange={(event) => setEnrollmentSecret(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[var(--hb-blue)]/50"
              placeholder="Enter server enrollment secret"
            />
          </label>
          <p className="text-[11px] text-[var(--hb-muted)]">
            This is not your login password. After enrollment, only your device
            passkey can access Orbit.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        disabled={status === "loading"}
        onClick={() => void (mode === "enroll" ? onEnroll() : onLogin())}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] text-sm font-semibold text-white shadow-[0_0_28px_rgb(10_132_255_/_0.35)] transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Fingerprint className="size-4" />
        )}
        {headline}
      </button>

      {needsEnrollment && mode === "login" ? (
        <button
          type="button"
          className="mt-3 w-full text-center text-xs text-[var(--hb-muted)] underline-offset-2 hover:text-white hover:underline"
          onClick={() => setMode("enroll")}
        >
          First-time passkey enrollment
        </button>
      ) : null}

      {mode === "enroll" ? (
        <button
          type="button"
          className="mt-3 w-full text-center text-xs text-[var(--hb-muted)] underline-offset-2 hover:text-white hover:underline"
          onClick={() => setMode("login")}
        >
          Back to passkey login
        </button>
      ) : null}

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
