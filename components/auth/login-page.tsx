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
    wrap: "border-[#3b82f6]/50 bg-[#3b82f6]/15 shadow-[0_0_18px_rgba(59,130,246,0.25)]",
    icon: "text-[#60a5fa]",
  },
  zap: {
    wrap: "border-[#a855f7]/50 bg-[#a855f7]/15 shadow-[0_0_18px_rgba(168,85,247,0.25)]",
    icon: "text-[#c084fc]",
  },
  headphones: {
    wrap: "border-[#22d3ee]/50 bg-[#22d3ee]/15 shadow-[0_0_18px_rgba(34,211,238,0.22)]",
    icon: "text-[#67e8f9]",
  },
  lock: {
    wrap: "border-[#e879f9]/50 bg-[#e879f9]/15 shadow-[0_0_18px_rgba(232,121,249,0.22)]",
    icon: "text-[#f0abfc]",
  },
};

/** Official multicolor Google G */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
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
      <path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.1.73-.24.73-.53v-1.85c-3 .65-3.63-1.45-3.63-1.45-.49-1.25-1.2-1.58-1.2-1.58-.98-.67.07-.66.07-.66 1.09.08 1.66 1.12 1.66 1.12.96 1.65 2.52 1.17 3.13.9.1-.7.38-1.17.69-1.44-2.4-.27-4.92-1.2-4.92-5.34 0-1.18.42-2.14 1.11-2.9-.11-.27-.48-1.37.11-2.85 0 0 .91-.29 2.97 1.11a10.3 10.3 0 0 1 5.42 0c2.06-1.4 2.97-1.11 2.97-1.11.59 1.48.22 2.58.11 2.85.69.76 1.11 1.72 1.11 2.9 0 4.15-2.53 5.07-4.94 5.34.39.33.73.99.73 2v2.97c0 .29.18.63.74.52A11 11 0 0 0 12 1.27z" />
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

  const customBg =
    content.backgroundImage &&
    content.backgroundImage !== "/images/login-bg.jpg"
      ? content.backgroundImage
      : "";

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#0a1628] text-white">
      {/* CSS atmosphere only — no pasted mockup image */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(186,230,253,0.16),transparent_50%),radial-gradient(ellipse_at_85%_30%,rgba(96,165,250,0.28),transparent_45%),radial-gradient(ellipse_at_75%_75%,rgba(147,197,253,0.18),transparent_50%),radial-gradient(ellipse_at_40%_90%,rgba(224,242,254,0.1),transparent_45%)]" />
        <div className="absolute top-[-10%] right-[-5%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(125,211,252,0.22),transparent_68%)] blur-3xl" />
        <div className="absolute right-[5%] bottom-[-15%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.2),transparent_70%)] blur-3xl" />
        <div className="absolute top-[35%] left-[10%] h-[40%] w-[35%] rounded-full bg-[radial-gradient(ellipse,rgba(255,251,235,0.08),transparent_70%)] blur-3xl" />
        {/* Soft cream-blue glass panels in depth */}
        <div className="absolute top-[12%] right-[8%] hidden h-[62%] w-[38%] rounded-[40px] border border-sky-200/15 bg-[linear-gradient(145deg,rgba(224,242,254,0.12),rgba(186,230,253,0.05)_40%,rgba(255,255,255,0.03))] shadow-[0_0_80px_rgba(125,211,252,0.12)] backdrop-blur-sm lg:block" />
        <div className="absolute top-[22%] right-[18%] hidden h-[48%] w-[28%] rounded-[32px] border border-white/10 bg-sky-100/[0.04] backdrop-blur-md lg:block" />
        {customBg ? (
          <div className="absolute inset-y-[8%] right-0 hidden w-[48%] opacity-35 lg:block">
            <Image
              src={customBg}
              alt=""
              fill
              priority
              quality={80}
              sizes="48vw"
              className="object-cover object-center blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a1628]/40 to-[#0a1628]" />
          </div>
        ) : null}
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Logo
              src={
                content.logoPath || "/logo/hostingbeyond-logo-transparent.png"
              }
              className="w-[200px] max-w-[200px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:w-[230px] sm:max-w-[230px]"
            />
            {content.tagline ? (
              <p className="mt-1.5 hidden text-[10px] font-semibold tracking-[0.16em] text-white/55 uppercase sm:block">
                {content.tagline}
              </p>
            ) : null}
          </div>
          <CountryLanguageSelector variant="globe" />
        </header>

        <div className="mt-8 grid flex-1 items-center gap-10 pb-8 lg:mt-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,460px)] lg:gap-12 xl:gap-16">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/40 bg-[#12082a]/45 px-3.5 py-1.5 text-[11px] font-bold text-white/95 shadow-[0_0_24px_rgba(168,85,247,0.18)] backdrop-blur-xl">
              <Rocket className="size-3.5 text-[#c084fc]" aria-hidden />
              {content.badge}
            </span>

            <h1 className="font-heading mt-5 text-[clamp(2.05rem,4.2vw,3.25rem)] leading-[1.1] font-extrabold tracking-[-0.03em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              {content.headline}{" "}
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c026d3] bg-clip-text text-transparent">
                {content.headlineAccent}
              </span>
              .
            </h1>

            <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/70 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] sm:text-[16px]">
              {content.description}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3">
              {content.features.map((feature) => {
                const accent =
                  featureAccent[feature.icon] ?? featureAccent.shield;
                return (
                  <div key={feature.id} className="min-w-0">
                    <span
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-2xl border backdrop-blur-md",
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
                    <p className="mt-1 text-[11px] leading-snug text-white/55">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Glass login card */}
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(ellipse,rgba(186,230,253,0.35),transparent_65%)] blur-2xl"
            />
            <div className="hb-login-glass relative overflow-hidden rounded-[26px] p-[1.5px] shadow-[0_24px_80px_rgba(14,60,110,0.35),0_0_50px_rgba(125,211,252,0.2)]">
              <div className="rounded-[24.5px] border border-sky-100/25 bg-[linear-gradient(160deg,rgba(248,250,252,0.18),rgba(186,230,253,0.14)_45%,rgba(224,242,254,0.1))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl sm:p-8">
                <h2 className="text-[28px] font-extrabold tracking-tight text-white">
                  {content.cardTitle}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-sky-50/70">
                  {content.cardSubtitle}
                </p>

                {(content.google.visible || content.github.visible) && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {content.google.visible ? (
                      <a
                        href={content.google.href || "#"}
                        className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-sky-100/25 bg-white/[0.12] px-3 text-[12.5px] font-bold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/[0.18]"
                      >
                        <GoogleMark className="size-[18px] shrink-0" />
                        <span>{content.google.label}</span>
                      </a>
                    ) : null}
                    {content.github.visible ? (
                      <a
                        href={content.github.href || "#"}
                        className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-sky-100/25 bg-white/[0.12] px-3 text-[12.5px] font-bold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/[0.18]"
                      >
                        <GitHubMark className="size-[18px] shrink-0 text-white" />
                        <span>{content.github.label}</span>
                      </a>
                    ) : null}
                  </div>
                )}

                {(content.google.visible || content.github.visible) && (
                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-sky-100/20" />
                    <span className="text-[11px] font-bold tracking-[0.18em] text-sky-50/50 uppercase">
                      {content.dividerLabel}
                    </span>
                    <span className="h-px flex-1 bg-sky-100/20" />
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-[12px] font-semibold text-sky-50/80">
                      {content.emailLabel}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-sky-100/20 bg-[#0b1a2e]/35 px-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md focus-within:border-sky-300/50">
                      <Mail
                        className="size-4 shrink-0 text-sky-100/55"
                        aria-hidden
                      />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.emailPlaceholder}
                        className="min-w-0 flex-1 bg-transparent py-3.5 text-[14px] text-white outline-none placeholder:text-sky-100/35"
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="text-[12px] font-semibold text-sky-50/80">
                      {content.passwordLabel}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-sky-100/20 bg-[#0b1a2e]/35 px-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md focus-within:border-sky-300/50">
                      <Lock
                        className="size-4 shrink-0 text-sky-100/55"
                        aria-hidden
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={content.passwordPlaceholder}
                        className="min-w-0 flex-1 bg-transparent py-3.5 text-[14px] text-white outline-none placeholder:text-sky-100/35"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="shrink-0 text-sky-100/55 transition hover:text-white"
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
                    <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-medium text-sky-50/70">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="size-3.5 rounded border-sky-200/30 bg-[#0b1a2e]/50 text-[#38bdf8]"
                      />
                      {content.rememberLabel}
                    </label>
                    <Link
                      href={content.forgotHref || "#"}
                      className="text-[12px] font-semibold text-sky-300 transition hover:text-sky-200"
                    >
                      {content.forgotLabel}
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-[14px] font-bold text-white shadow-[0_12px_32px_rgba(56,189,248,0.35)] transition hover:brightness-110"
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

                <p className="mt-5 text-center text-[13px] text-sky-50/60">
                  {content.signupPrompt}{" "}
                  <Link
                    href={content.signupHref || "/get-started"}
                    className="font-semibold text-sky-300 transition hover:text-sky-200"
                  >
                    {content.signupLabel}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-auto pt-4 text-[11px] text-white/40">
          {content.copyright}
        </p>
      </div>
    </div>
  );
}
