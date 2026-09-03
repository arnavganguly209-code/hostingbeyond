"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Headphones,
  Lock,
  Mail,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";

import { CountryLanguageSelector } from "@/components/locale/country-language-selector";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import type { CmsLoginFeature, CmsLoginPage } from "@/lib/orbit/defaults";

function FeatureIcon({
  icon,
  className,
}: {
  icon: CmsLoginFeature["icon"];
  className?: string;
}) {
  if (icon === "zap") return <Zap className={className} aria-hidden />;
  if (icon === "headphones")
    return <Headphones className={className} aria-hidden />;
  if (icon === "lock") return <Lock className={className} aria-hidden />;
  return <Shield className={className} aria-hidden />;
}

const featureAccent: Record<
  CmsLoginFeature["icon"],
  { wrap: string; icon: string }
> = {
  shield: {
    wrap: "border-[#3b82f6]/40 bg-[#3b82f6]/12",
    icon: "text-[#60a5fa]",
  },
  zap: {
    wrap: "border-[#a855f7]/40 bg-[#a855f7]/12",
    icon: "text-[#c084fc]",
  },
  headphones: {
    wrap: "border-[#22d3ee]/40 bg-[#22d3ee]/12",
    icon: "text-[#67e8f9]",
  },
  lock: {
    wrap: "border-[#e879f9]/40 bg-[#e879f9]/12",
    icon: "text-[#f0abfc]",
  },
};

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3l-.9.7-2.5 1.9C4.8 19.7 8.1 22 12 22c2.7 0 5-.9 6.7-2.4l-3.1-2.4c-.9.6-2 1-3.6 1-2.8 0-5.1-1.9-5.9-4.4z"
      />
      <path
        fill="#4A90E2"
        d="M3.2 7.1C2.4 8.7 2 10.3 2 12s.4 3.3 1.2 4.9l3.4-2.6C6.2 13.4 6 12.7 6 12s.2-1.4.6-2.3L3.2 7.1z"
      />
      <path
        fill="#FBBC05"
        d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.1 14.7 2 12 2 8.1 2 4.8 4.3 3.2 7.1l3.4 2.6C7 7.9 9.2 6 12 6z"
      />
    </svg>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function LoginPageView({ content }: { content: CmsLoginPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("Login will connect to your account system soon.");
  }

  const hasBg = Boolean(content.backgroundImage);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#050814] text-white">
      {/* Ambient neon + optional datacenter photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050814]" />
        {hasBg ? (
          <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
            <Image
              src={content.backgroundImage}
              alt=""
              fill
              priority
              quality={85}
              sizes="58vw"
              className="object-cover object-[70%_center] opacity-55"
            />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(47,107,255,0.2),transparent_50%)]" />
            <div className="absolute top-[8%] right-[12%] h-[70%] w-[18%] rounded-full bg-[linear-gradient(180deg,transparent,rgba(236,72,153,0.35),transparent)] blur-2xl" />
            <div className="absolute top-[12%] right-[28%] h-[65%] w-[14%] rounded-full bg-[linear-gradient(180deg,transparent,rgba(59,130,246,0.4),transparent)] blur-2xl" />
            <div className="absolute top-[10%] right-[40%] h-[60%] w-[12%] rounded-full bg-[linear-gradient(180deg,transparent,rgba(168,85,247,0.3),transparent)] blur-2xl" />
          </div>
        )}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#050814] from-[42%] via-[#050814]/88 via-[58%] to-transparent lg:w-[70%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050814] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050814]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Logo
              src={content.logoPath || undefined}
              className="w-[180px] max-w-[180px] sm:w-[200px] sm:max-w-[200px]"
            />
            {content.tagline ? (
              <p className="mt-1 hidden text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase sm:block">
                {content.tagline}
              </p>
            ) : null}
          </div>
          <CountryLanguageSelector compact />
        </header>

        <div className="mt-8 grid flex-1 items-center gap-10 pb-8 lg:mt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,440px)] lg:gap-12 xl:gap-16">
          {/* Left marketing */}
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/35 bg-[#a855f7]/10 px-3.5 py-1.5 text-[11px] font-bold text-white/90 backdrop-blur-md">
              <Rocket className="size-3.5 text-[#c084fc]" aria-hidden />
              {content.badge}
            </span>

            <h1 className="font-heading mt-5 text-[clamp(2rem,4vw,3.15rem)] leading-[1.12] font-extrabold tracking-[-0.03em] text-white">
              {content.headline}{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#818cf8] to-[#a855f7] bg-clip-text text-transparent">
                {content.headlineAccent}
              </span>
              .
            </h1>

            <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/55 sm:text-[16px]">
              {content.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3">
              {content.features.map((feature) => {
                const accent =
                  featureAccent[feature.icon] ?? featureAccent.shield;
                return (
                  <div key={feature.id} className="min-w-0">
                    <span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-xl border",
                        accent.wrap,
                      )}
                    >
                      <FeatureIcon
                        icon={feature.icon}
                        className={cn("size-5", accent.icon)}
                      />
                    </span>
                    <h3 className="mt-3 text-[13px] font-extrabold tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-snug text-white/45">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right glass card */}
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:justify-self-end">
            <div
              className="relative overflow-hidden rounded-[24px] p-px shadow-[0_0_60px_rgba(99,102,241,0.22)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.85), rgba(168,85,247,0.75), rgba(59,130,246,0.45))",
              }}
            >
              <div className="rounded-[23px] border border-white/10 bg-[#0a1228]/72 p-6 backdrop-blur-2xl sm:p-7">
                <h2 className="text-[26px] font-extrabold tracking-tight text-white">
                  {content.cardTitle}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                  {content.cardSubtitle}
                </p>

                {(content.google.visible || content.github.visible) && (
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {content.google.visible ? (
                      <a
                        href={content.google.href || "#"}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.04] px-3 text-[12px] font-bold text-white transition hover:bg-white/[0.08]"
                      >
                        <GoogleMark className="size-4 shrink-0" />
                        <span className="truncate">{content.google.label}</span>
                      </a>
                    ) : null}
                    {content.github.visible ? (
                      <a
                        href={content.github.href || "#"}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.04] px-3 text-[12px] font-bold text-white transition hover:bg-white/[0.08]"
                      >
                        <GitHubMark className="size-4 shrink-0" />
                        <span className="truncate">{content.github.label}</span>
                      </a>
                    ) : null}
                  </div>
                )}

                {(content.google.visible || content.github.visible) && (
                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/12" />
                    <span className="text-[11px] font-bold tracking-[0.16em] text-white/40 uppercase">
                      {content.dividerLabel}
                    </span>
                    <span className="h-px flex-1 bg-white/12" />
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-[12px] font-semibold text-white/70">
                      {content.emailLabel}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-white/12 bg-black/30 px-3 focus-within:border-[#60a5fa]/50">
                      <Mail
                        className="size-4 shrink-0 text-white/40"
                        aria-hidden
                      />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.emailPlaceholder}
                        className="min-w-0 flex-1 bg-transparent py-3 text-[14px] text-white outline-none placeholder:text-white/35"
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="text-[12px] font-semibold text-white/70">
                      {content.passwordLabel}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-white/12 bg-black/30 px-3 focus-within:border-[#60a5fa]/50">
                      <Lock
                        className="size-4 shrink-0 text-white/40"
                        aria-hidden
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={content.passwordPlaceholder}
                        className="min-w-0 flex-1 bg-transparent py-3 text-[14px] text-white outline-none placeholder:text-white/35"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="shrink-0 text-white/40 transition hover:text-white/70"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </span>
                  </label>

                  <div className="flex items-center justify-between gap-3 pt-0.5">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-medium text-white/60">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="size-3.5 rounded border-white/20 bg-black/40 text-[#3b82f6]"
                      />
                      {content.rememberLabel}
                    </label>
                    <Link
                      href={content.forgotHref || "#"}
                      className="text-[12px] font-semibold text-[#60a5fa] transition hover:text-[#93c5fd]"
                    >
                      {content.forgotLabel}
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2f6bff] to-[#9333ea] text-[14px] font-bold text-white shadow-[0_10px_28px_rgba(99,102,241,0.35)] transition hover:brightness-110"
                  >
                    {content.loginCtaLabel}
                    <ArrowRight className="size-4" aria-hidden />
                  </button>

                  {message ? (
                    <p className="text-center text-[12px] text-amber-200/90">
                      {message}
                    </p>
                  ) : null}
                </form>

                <p className="mt-5 text-center text-[13px] text-white/50">
                  {content.signupPrompt}{" "}
                  <Link
                    href={content.signupHref || "/get-started"}
                    className="font-semibold text-[#60a5fa] transition hover:text-[#93c5fd]"
                  >
                    {content.signupLabel}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-auto pt-4 text-[11px] text-white/35">
          {content.copyright}
        </p>
      </div>
    </div>
  );
}
