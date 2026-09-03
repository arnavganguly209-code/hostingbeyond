"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Globe2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { heroDomainTeasers, heroTldOptions } from "@/config/domain-teasers";
import { routes } from "@/config/routes";
import { useLocale } from "@/components/locale/locale-provider";
import { GlowButton } from "@/components/shared/glow-button";
import { cn } from "@/lib/utils";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

/**
 * Exact first-viewport composition matching the HostingBeyond brand mockup.
 * Copy / layout intentionally mirrors the attached reference.
 */
const REF = {
  line1: "Built for Speed.",
  line2: "Secured for You.",
  line3: "Beyond Limits.",
  description:
    "Premium hosting infrastructure for ambitious ideas and growing businesses.",
  searchPlaceholder: "Find your perfect domain name",
};

export function HeroSection({ content }: { content?: CmsHeroContent }) {
  const reduceMotion = useReducedMotion();
  const { preferences } = useLocale();
  const [domain, setDomain] = useState("");
  const [tld, setTld] = useState<(typeof heroTldOptions)[number]>(".com");

  const isEn = preferences.language === "en";
  const imageSrc = content?.backgroundImage || "/images/hero-speaker.png";

  const line1 = isEn ? REF.line1 : (content?.headline ?? REF.line1);
  const line2 = isEn ? REF.line2 : "";
  const line3 = isEn ? REF.line3 : (content?.headlineAccent ?? REF.line3);
  const description = isEn
    ? REF.description
    : (content?.description ?? REF.description);
  const searchPlaceholder = isEn
    ? REF.searchPlaceholder
    : (content?.searchPlaceholder ?? REF.searchPlaceholder);

  // Use CMS domain pricing when available (EN only); fall back to config
  const activeTeasers =
    isEn && content?.domainPricing?.length
      ? content.domainPricing.filter((d) => d.visible !== false)
      : [...heroDomainTeasers];

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = domain.trim().replace(/^\.+/, "");
    const query = raw ? (raw.includes(".") ? raw : `${raw}${tld}`) : "";
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <section className="relative isolate flex min-h-0 flex-1 flex-col overflow-hidden bg-[#050816]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050816]" />
        <div className="absolute top-[-10%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(37_99_235_/_0.16),transparent_70%)] blur-3xl" />
        <div className="absolute top-[5%] right-[-5%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgb(124_58_237_/_0.14),transparent_72%)] blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgb(59_130_246_/_0.08),transparent_70%)] blur-3xl" />
      </div>

      {/* Hero body — fills remaining viewport above domain search */}
      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1520px] flex-1 grid-cols-1 items-center px-[3.5%] pt-5 pb-3 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-4 lg:pt-4 lg:pb-2 xl:pt-5">
        {/* LEFT copy */}
        <div className="relative z-20 max-w-[560px] min-w-0 py-2">
          <h1 className="font-heading text-[clamp(2.35rem,4.8vw,4.35rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {line1}
            </motion.span>
            {line2 ? (
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {line2}
              </motion.span>
            ) : null}
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "block bg-clip-text text-transparent",
                reduceMotion
                  ? "bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7]"
                  : "hb-hero-gradient",
              )}
            >
              {line3}
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35 }}
            className="mt-5 flex max-w-[480px] items-start gap-3 text-[15px] leading-[1.55] font-medium text-[#c5cddc] sm:text-[16px] lg:mt-6"
          >
            <span
              aria-hidden
              className="mt-2 h-[2px] w-8 shrink-0 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            />
            <span>{description}</span>
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
            className="mt-7 flex flex-wrap items-center gap-3.5 lg:mt-8"
          >
            <GlowButton
              href={routes.getStarted}
              size="lg"
              className="h-[50px] min-w-[168px] rounded-2xl px-6 text-[14px] font-bold shadow-[0_0_28px_rgb(37_99_235_/_0.35)] sm:h-[52px]"
            >
              GET STARTED
              <ArrowRight className="size-4" aria-hidden />
            </GlowButton>
            <Link
              href={routes.hosting}
              className="inline-flex h-[50px] min-w-[168px] items-center justify-center gap-2 rounded-2xl border border-[#7c3aed]/55 bg-transparent px-6 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#7c3aed]/10 sm:h-[52px]"
            >
              EXPLORE PLANS
              <ArrowRight className="size-4 text-[#a78bfa]" aria-hidden />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — large human visual (desktop) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative hidden h-full min-h-0 w-full lg:block"
        >
          <div
            aria-hidden
            className="absolute top-[8%] right-[4%] h-[75%] w-[75%] rounded-full bg-[radial-gradient(circle,rgb(37_99_235_/_0.22),transparent_68%)] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute right-[12%] bottom-[4%] h-[50%] w-[55%] rounded-full bg-[radial-gradient(circle,rgb(124_58_237_/_0.18),transparent_70%)] blur-3xl"
          />
          <div className="hb-hero-subject absolute inset-0 overflow-hidden">
            <Image
              src={imageSrc}
              alt="HostingBeyond speaker"
              fill
              priority
              quality={95}
              sizes="(max-width: 1536px) 55vw, 780px"
              className="object-contain object-[78%_20%] xl:object-cover xl:object-[72%_12%]"
            />
          </div>
        </motion.div>

        {/* Mobile image */}
        <div className="relative mx-auto mt-2 h-[220px] w-full max-w-[380px] sm:h-[260px] lg:hidden">
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
        </div>
      </div>

      {/* Domain search — locked to bottom of first viewport */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.4 }}
        className="relative z-20 mx-auto w-full max-w-[1520px] shrink-0 px-[3.5%] pb-4 lg:pb-5"
      >
        <div className="rounded-[20px] border border-[rgba(90,120,255,0.28)] bg-[rgba(8,12,26,0.88)] px-4 py-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgb(255_255_255_/_0.05)] backdrop-blur-xl sm:px-5 sm:py-4">
          <form
            onSubmit={onSearch}
            className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-white/12 bg-black/50 px-3.5 focus-within:border-[#3b82f6]/55 focus-within:shadow-[0_0_0_3px_rgb(37_99_235_/_0.14)] sm:px-4">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/25 text-[#60a5fa]">
                <Globe2 className="size-4" aria-hidden />
              </span>
              <label htmlFor="hero-domain-search" className="sr-only">
                {searchPlaceholder}
              </label>
              <input
                id="hero-domain-search"
                type="text"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent py-[13px] text-[15px] text-white outline-none placeholder:text-white/40 sm:py-[14px] sm:text-[16px]"
              />
              <div className="relative shrink-0">
                <select
                  value={tld}
                  onChange={(event) => setTld(event.target.value as typeof tld)}
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
              className="inline-flex h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 text-[13px] font-bold tracking-wide text-white uppercase shadow-[0_0_26px_rgb(37_99_235_/_0.32)] transition hover:-translate-y-0.5 hover:brightness-110 sm:h-[52px] lg:w-[200px]"
            >
              SEARCH DOMAIN
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </form>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-0.5">
            {activeTeasers.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() => setTld(item.tld as typeof tld)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-1.5 text-[12px] font-semibold transition",
                  tld === item.tld
                    ? "border-[#3b82f6]/45 bg-[#2563eb]/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white",
                )}
              >
                <span className="font-bold text-[#93c5fd]">{item.tld}</span>
                <span className="text-white/55">{item.priceLabel}</span>
              </button>
            ))}
            <Link
              href={routes.domains}
              className="ml-auto shrink-0 text-[12px] font-bold whitespace-nowrap text-[#60a5fa] transition hover:text-[#93c5fd] sm:text-[13px]"
            >
              View all domains →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
