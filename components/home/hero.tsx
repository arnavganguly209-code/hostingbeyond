"use client";

import { type FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Headphones,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { heroDomainTeasers, heroTldOptions } from "@/config/domain-teasers";
import { routes } from "@/config/routes";
import { useLocale } from "@/components/locale/locale-provider";
import { GlowButton } from "@/components/shared/glow-button";
import { cn } from "@/lib/utils";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

const featureIcons = {
  uptime: Zap,
  performance: Sparkles,
  support: Headphones,
} as const;

/** Split accent so only the BEYOND word gets the brand gradient. */
function AccentHeadline({
  text,
  reduceMotion,
}: {
  text: string;
  reduceMotion: boolean | null;
}) {
  const match = text.match(/^(.*?)(BEYOND\.?)(.*)$/i);
  const gradientClass = reduceMotion
    ? "bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#7c3aed] bg-clip-text text-transparent"
    : "hb-hero-gradient bg-clip-text text-transparent";

  if (!match) {
    return <span className={gradientClass}>{text}</span>;
  }

  return (
    <>
      {match[1] ? <span className="text-white">{match[1]}</span> : null}
      <span className={gradientClass}>{match[2]}</span>
      {match[3] ? <span className="text-white">{match[3]}</span> : null}
    </>
  );
}

export function HeroSection({ content }: { content?: CmsHeroContent }) {
  const reduceMotion = useReducedMotion();
  const { t, preferences } = useLocale();
  const [domain, setDomain] = useState("");
  const [tld, setTld] = useState<(typeof heroTldOptions)[number]>(".com");

  const useCms = preferences.language === "en" && Boolean(content);

  const eyebrow = useCms
    ? content?.eyebrow || "Next-Gen Hosting Infrastructure"
    : "Next-Gen Hosting Infrastructure";
  const headline = useCms
    ? (content?.headline ?? "HOST SMARTER.")
    : t.hero.headline;
  const accent = useCms
    ? (content?.headlineAccent ?? "GROW BEYOND.")
    : t.hero.headlineAccent;
  const description = useCms
    ? (content?.description ??
      "High-performance hosting, secure infrastructure and expert support — built for everything you want to grow online.")
    : t.hero.description;
  const searchPlaceholder = useCms
    ? (content?.searchPlaceholder ?? "Enter your domain name")
    : t.hero.searchPlaceholder;
  const imageSrc = content?.backgroundImage || "/images/hero-speaker.png";

  const features = useMemo(() => {
    if (useCms && content?.trustItems?.length) {
      return content.trustItems.slice(0, 3).map((item) => ({
        title: item.title,
        icon:
          item.icon === "lock"
            ? ("performance" as const)
            : item.icon === "support"
              ? ("support" as const)
              : ("uptime" as const),
      }));
    }
    return [
      { title: "99.99% Uptime", icon: "uptime" as const },
      { title: "NVMe Performance", icon: "performance" as const },
      { title: "24/7 Expert Support", icon: "support" as const },
    ];
  }, [content?.trustItems, useCms]);

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = domain.trim().replace(/^\.+/, "");
    const query = raw ? (raw.includes(".") ? raw : `${raw}${tld}`) : "";
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <section className="relative isolate overflow-x-hidden bg-[var(--hb-bg)]">
      {/* Ambient bg — never covers header (header is sticky above) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050816]" />
        <div className="absolute top-[8%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(37_99_235_/_0.14),transparent_70%)] blur-3xl" />
        <div className="absolute top-[5%] right-[-6%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgb(124_58_237_/_0.12),transparent_72%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        {/*
          Compact cinematic hero grid.
          Image is in document flow (not under header) so the head is never clipped.
        */}
        <div className="grid items-center gap-6 pt-8 pb-6 sm:pt-9 sm:pb-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:pt-10 lg:pb-8 xl:gap-10">
          {/* LEFT — copy */}
          <div className="relative z-20 max-w-[560px] min-w-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/35 bg-[rgba(37,99,235,0.1)] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#93c5fd] uppercase backdrop-blur-md"
            >
              <Sparkles className="size-3.5 text-[#a78bfa]" aria-hidden />
              {eyebrow}
            </motion.div>

            <h1 className="font-heading text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
              <motion.span
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 16, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.05,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {headline}
              </motion.span>
              <motion.span
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 16, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.12,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-1 block"
              >
                <AccentHeadline text={accent} reduceMotion={reduceMotion} />
              </motion.span>
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              className="mt-5 max-w-[560px] text-[17px] leading-[1.5] font-medium text-[#aab4c8] sm:text-[18px]"
            >
              {description}
            </motion.p>

            <motion.ul
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5"
            >
              {features.map((item, index) => {
                const Icon =
                  featureIcons[item.icon as keyof typeof featureIcons] ?? Zap;
                return (
                  <li key={item.title} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span
                        aria-hidden
                        className="mr-0.5 hidden h-3.5 w-px bg-white/15 sm:block"
                      />
                    ) : null}
                    <span className="inline-flex size-7 items-center justify-center rounded-full border border-[#3b82f6]/30 bg-[#2563eb]/10 text-[#93c5fd]">
                      <Icon className="size-3.5" strokeWidth={2} />
                    </span>
                    <span className="text-[13px] font-bold text-white/92 sm:text-[14px]">
                      {item.title}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <GlowButton
                href={routes.getStarted}
                size="lg"
                className="h-[52px] rounded-2xl px-6 text-[15px] font-bold shadow-[0_0_28px_rgb(37_99_235_/_0.32)] transition duration-200 hover:-translate-y-0.5"
              >
                GET STARTED
                <ArrowRight className="size-4" aria-hidden />
              </GlowButton>
              <Link
                href={routes.hosting}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] px-6 text-[15px] font-bold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-[#7c3aed]/55 hover:bg-[#7c3aed]/10"
              >
                VIEW PLANS
                <ArrowRight className="size-4 opacity-80" aria-hidden />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — human visual in flow (never under header) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.12,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 mx-auto hidden h-[min(480px,52svh)] w-full max-w-[640px] lg:mx-0 lg:block lg:h-[min(520px,56svh)] lg:max-w-none"
          >
            <div
              aria-hidden
              className="absolute top-[12%] right-[8%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgb(37_99_235_/_0.22),transparent_68%)] blur-3xl"
            />
            <div
              aria-hidden
              className="absolute right-[18%] bottom-[8%] h-[45%] w-[50%] rounded-full bg-[radial-gradient(circle,rgb(124_58_237_/_0.18),transparent_70%)] blur-3xl"
            />

            <div className="hb-hero-subject relative h-full w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt="HostingBeyond speaker"
                fill
                priority
                quality={95}
                sizes="(max-width: 1280px) 50vw, 680px"
                className="object-contain object-[center_top] sm:object-cover sm:object-[68%_8%]"
              />
            </div>
          </motion.div>

          {/* Mobile image — below copy, head safe */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="relative mx-auto h-[280px] w-full max-w-[420px] lg:hidden"
          >
            <div className="hb-hero-subject relative h-full w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt="HostingBeyond speaker"
                fill
                priority
                quality={90}
                sizes="90vw"
                className="object-cover object-[65%_10%]"
              />
            </div>
          </motion.div>
        </div>

        {/* Domain search — must stay in first viewport */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.45 }}
          className="relative z-20 mx-auto mb-6 w-[96%] max-w-[1450px] sm:mb-7 lg:mb-8"
        >
          <div className="rounded-[22px] border border-[rgba(90,110,255,0.22)] bg-[rgba(10,15,30,0.88)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35),inset_0_1px_0_rgb(255_255_255_/_0.06)] backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/20 text-[#60a5fa]">
                    <Globe2 className="size-4" aria-hidden />
                  </span>
                  <h2 className="text-[15px] font-extrabold tracking-[0.03em] text-white uppercase sm:text-[16px]">
                    Find Your Perfect Domain
                  </h2>
                </div>
                <p className="mt-1.5 pl-[46px] text-[13px] text-[#aab4c8] sm:text-[14px]">
                  Search, register and launch your online identity in minutes.
                </p>
              </div>
              <Link
                href={routes.domains}
                className="hidden shrink-0 items-center gap-1 text-[13px] font-bold text-[#60a5fa] transition-colors hover:text-[#93c5fd] lg:inline-flex"
              >
                View All Domains
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>

            <form
              onSubmit={onSearch}
              className="flex flex-col gap-3 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/12 bg-black/50 px-3 focus-within:border-[#3b82f6]/55 focus-within:shadow-[0_0_0_3px_rgb(37_99_235_/_0.14)] sm:px-4">
                <label htmlFor="hero-domain-search" className="sr-only">
                  {searchPlaceholder}
                </label>
                <input
                  id="hero-domain-search"
                  type="text"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-[15px] text-[15px] text-white outline-none placeholder:text-white/40 sm:text-[16px]"
                />
                <div className="relative shrink-0">
                  <select
                    value={tld}
                    onChange={(event) =>
                      setTld(event.target.value as typeof tld)
                    }
                    className="h-[42px] appearance-none rounded-xl border border-white/12 bg-white/[0.05] py-2 pr-8 pl-3 text-[13px] font-bold text-white outline-none focus:border-[#3b82f6]/45 sm:h-[46px]"
                    aria-label="Domain extension"
                  >
                    {heroTldOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-[#0a1020]"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-white/50"
                    aria-hidden
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-[54px] w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 text-[14px] font-bold tracking-wide text-white uppercase shadow-[0_0_28px_rgb(37_99_235_/_0.32)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:h-[56px] lg:w-[210px]"
              >
                Search Domain
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-0.5 sm:mt-4">
              {heroDomainTeasers.map((item) => (
                <button
                  key={item.tld}
                  type="button"
                  onClick={() => setTld(item.tld as typeof tld)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-semibold transition duration-150",
                    tld === item.tld
                      ? "border-[#3b82f6]/50 bg-[#2563eb]/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white",
                  )}
                >
                  <span className="font-bold text-[#93c5fd]">{item.tld}</span>
                  <span className="text-white/55">{item.priceLabel}</span>
                </button>
              ))}
              <Link
                href={routes.domains}
                className="ml-auto shrink-0 text-[12px] font-bold text-[#60a5fa] lg:hidden"
              >
                View All →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
