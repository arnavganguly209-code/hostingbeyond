"use client";

import { type FormEvent, useState } from "react";
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
  const searchLabel = useCms
    ? (content?.searchButtonLabel ?? "Search Domain")
    : t.hero.search;
  const imageSrc = content?.backgroundImage || "/images/hero-speaker.png";

  const features =
    useCms && content?.trustItems?.length
      ? content.trustItems.slice(0, 3).map((item) => ({
          title: item.title,
          icon:
            item.icon === "lock"
              ? "performance"
              : item.icon === "support"
                ? "support"
                : "uptime",
        }))
      : [
          { title: "99.99% Uptime", icon: "uptime" as const },
          { title: "NVMe Performance", icon: "performance" as const },
          { title: "24/7 Expert Support", icon: "support" as const },
        ];

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = domain.trim().replace(/^\.+/, "");
    const query = raw ? (raw.includes(".") ? raw : `${raw}${tld}`) : "";
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[100px] sm:pt-[108px] lg:h-[min(100svh,920px)] lg:max-h-[920px] lg:min-h-0 lg:pt-[112px]">
      {/* Ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050816]" />
        <div className="absolute top-[-20%] left-[-10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(37_99_235_/_0.18),transparent_68%)] blur-3xl" />
        <div className="absolute top-[10%] right-[-5%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(124_58_237_/_0.16),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(37_99_235_/_0.1),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(96_165_250_/_0.35)_0.6px,transparent_0.7px)] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_58%)] [background-size:42px_42px] opacity-[0.16]" />
      </div>

      {/* Human visual — right side cinematic blend */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] sm:block lg:w-[55%]"
      >
        <div className="hb-hero-subject absolute inset-y-[2%] right-0 left-[2%]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            quality={92}
            sizes="(max-width: 1280px) 58vw, 820px"
            className="object-cover object-[62%_16%] brightness-[1.03] contrast-[1.04]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050816_0%,rgba(5,8,22,0.94)_10%,rgba(5,8,22,0.4)_26%,rgba(5,8,22,0.06)_40%,transparent_54%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050816_0%,transparent_12%,transparent_70%,rgba(5,8,22,0.8)_88%,#050816_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#050816] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050816] via-[#050816]/85 to-transparent" />
      </div>

      {/* Mobile soft image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] bottom-[38%] opacity-40 sm:hidden"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-[70%_15%] blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#050816]/40 to-[#050816]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center py-4 lg:py-2">
          <div className="w-full max-w-xl min-w-0 lg:max-w-[46%]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/35 bg-[rgba(37,99,235,0.1)] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[#93c5fd] uppercase backdrop-blur-md"
            >
              <Sparkles className="size-3.5 text-[#a78bfa]" aria-hidden />
              {eyebrow}
            </motion.div>

            <h1 className="font-heading text-[clamp(2.55rem,5.2vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-white">
              <motion.span
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 22, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.06,
                  duration: 0.55,
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
                    : { opacity: 0, y: 22, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.14,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  reduceMotion
                    ? "mt-1 block bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#7c3aed] bg-clip-text text-transparent"
                    : "hb-hero-gradient mt-1 block bg-clip-text text-transparent"
                }
              >
                {accent}
              </motion.span>
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-5 max-w-[34rem] text-[16px] leading-[1.55] font-medium text-[#aab4c8] sm:text-[18px] lg:text-[19px]"
            >
              {description}
            </motion.p>

            <motion.ul
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.45 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {features.map((item, index) => {
                const Icon =
                  featureIcons[item.icon as keyof typeof featureIcons] ?? Zap;
                return (
                  <li key={item.title} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span
                        aria-hidden
                        className="mr-1 hidden h-4 w-px bg-white/15 sm:block"
                      />
                    ) : null}
                    <span className="inline-flex size-7 items-center justify-center rounded-full border border-[#3b82f6]/30 bg-[#2563eb]/10 text-[#93c5fd]">
                      <Icon className="size-3.5" strokeWidth={2} />
                    </span>
                    <span className="text-[13px] font-semibold text-white/90 sm:text-[14px]">
                      {item.title}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.45 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <GlowButton
                href={routes.getStarted}
                size="lg"
                className="h-12 rounded-2xl px-6 text-[15px] font-bold shadow-[0_0_32px_rgb(37_99_235_/_0.35)] transition duration-200 hover:-translate-y-0.5"
              >
                GET STARTED
                <ArrowRight className="size-4" aria-hidden />
              </GlowButton>
              <Link
                href={routes.hosting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#7c3aed]/45 bg-transparent px-6 text-[15px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#7c3aed]/70 hover:bg-[#7c3aed]/10"
              >
                VIEW PLANS
                <ArrowRight className="size-4 opacity-80" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Domain search — premium bar in hero bottom */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto mb-5 w-full max-w-[1450px] sm:mb-6 lg:mb-7"
        >
          <div className="rounded-[24px] border border-[#3b82f6]/25 bg-[linear-gradient(165deg,rgba(10,14,28,0.88),rgba(5,8,20,0.94))] p-4 shadow-[0_20px_60px_rgb(0_0_0_/_0.45),0_0_40px_rgb(37_99_235_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Globe2 className="size-4 text-[#60a5fa]" aria-hidden />
                  <h2 className="text-[15px] font-extrabold tracking-[0.04em] text-white uppercase sm:text-[16px]">
                    Find Your Perfect Domain
                  </h2>
                </div>
                <p className="mt-1 text-[13px] text-[#aab4c8] sm:text-[14px]">
                  Search, register and launch your online identity in minutes.
                </p>
              </div>
              <Link
                href={routes.domains}
                className="hidden text-[13px] font-semibold text-[#60a5fa] transition-colors hover:text-[#93c5fd] sm:inline-flex sm:items-center sm:gap-1"
              >
                View all domains
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>

            <form
              onSubmit={onSearch}
              className="flex flex-col gap-3 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 focus-within:border-[#3b82f6]/50 focus-within:shadow-[0_0_0_3px_rgb(37_99_235_/_0.15)] sm:px-4">
                <Globe2
                  className="hidden size-5 shrink-0 text-white/35 sm:block"
                  aria-hidden
                />
                <label htmlFor="hero-domain-search" className="sr-only">
                  {searchPlaceholder}
                </label>
                <input
                  id="hero-domain-search"
                  type="text"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-white outline-none placeholder:text-white/35 sm:text-[16px]"
                />
                <div className="relative shrink-0">
                  <select
                    value={tld}
                    onChange={(event) =>
                      setTld(event.target.value as typeof tld)
                    }
                    className="h-10 appearance-none rounded-xl border border-white/12 bg-white/[0.04] py-2 pr-8 pl-3 text-[13px] font-bold text-white outline-none focus:border-[#3b82f6]/45"
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
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 text-[14px] font-bold tracking-wide text-white uppercase shadow-[0_0_28px_rgb(37_99_235_/_0.35)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:h-[52px] sm:px-7 sm:text-[15px]"
              >
                {searchLabel.includes("Search") ? "Search Domain" : searchLabel}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 sm:mt-5 sm:flex-wrap sm:overflow-visible">
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
                className="ml-auto hidden shrink-0 text-[12px] font-semibold text-[#60a5fa] sm:inline lg:hidden"
              >
                View all →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
