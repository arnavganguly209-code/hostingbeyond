"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Globe2, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { heroDomainTeasers, heroTldOptions } from "@/config/domain-teasers";
import { routes } from "@/config/routes";
import { useLocale } from "@/components/locale/locale-provider";
import { cn } from "@/lib/utils";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

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
  const line1 = isEn ? REF.line1 : (content?.headline ?? REF.line1);
  const line2 = isEn ? REF.line2 : "";
  const line3 = isEn ? REF.line3 : (content?.headlineAccent ?? REF.line3);
  const description = isEn
    ? REF.description
    : (content?.description ?? REF.description);
  const searchPlaceholder = isEn
    ? REF.searchPlaceholder
    : (content?.searchPlaceholder ?? REF.searchPlaceholder);

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
    <section className="relative z-10 flex min-h-0 flex-1 flex-col">
      {/* Copy + CTAs — always fully visible above domain search */}
      <div className="mx-auto flex min-h-0 w-full max-w-[1520px] flex-1 flex-col justify-center px-[3.5%] py-3 lg:py-4">
        <div className="relative z-10 max-w-[540px]">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/22 bg-[#07122a]/70 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:mb-4"
          >
            <Zap className="size-3.5 text-[#60a5fa]" aria-hidden />
            Powerful. Reliable. Secure.
          </motion.p>

          <h1 className="font-heading text-[clamp(2.35rem,4.6vw,4.15rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(7,18,42,0.85)]">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="block"
            >
              {line1}
            </motion.span>
            {line2 ? (
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="block"
              >
                {line2}
              </motion.span>
            ) : null}
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="block text-[#3b82f6]"
            >
              {line3}
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-4 max-w-[480px] text-[15px] leading-[1.55] font-medium text-white [text-shadow:0_1px_12px_rgba(7,18,42,0.8)] sm:text-[16px] lg:mt-5"
          >
            {description}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-5 flex flex-wrap items-center gap-3 lg:mt-6"
          >
            <Link
              href={routes.getStarted}
              className="inline-flex h-[48px] min-w-[150px] items-center justify-center gap-2 rounded-2xl bg-[#2f6bff] px-5 text-[14px] font-bold text-white shadow-[0_8px_28px_rgba(47,107,255,0.4)] transition hover:brightness-110 sm:h-[50px]"
            >
              Get Started
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={routes.hosting}
              className="inline-flex h-[48px] min-w-[150px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/[0.10] px-5 text-[14px] font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.16] sm:h-[50px]"
            >
              Explore Plans
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Domain search — below CTAs, never covers them */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="relative z-20 mx-auto w-full max-w-[1520px] shrink-0 px-[3.5%] pb-3 lg:pb-4"
      >
        <div className="rounded-[20px] border border-white/18 bg-[#0a1834]/55 px-4 py-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl sm:px-5 sm:py-4">
          <form
            onSubmit={onSearch}
            className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-white/16 bg-[#07122a]/55 px-3.5 focus-within:border-[#60a5fa]/55">
              <span className="inline-flex size-8 shrink-0 items-center justify-center text-[#93c5fd]">
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
                className="min-w-0 flex-1 bg-transparent py-[12px] text-[15px] text-white outline-none placeholder:text-white/40 sm:text-[16px]"
              />
              <div className="relative shrink-0">
                <select
                  value={tld}
                  onChange={(event) => setTld(event.target.value as typeof tld)}
                  className="h-[40px] appearance-none rounded-xl border border-white/16 bg-white/[0.08] py-2 pr-8 pl-3 text-[13px] font-bold text-white outline-none sm:h-[44px]"
                  aria-label="Domain extension"
                >
                  {heroTldOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#07122a]"
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
              className="inline-flex h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#2f6bff] px-6 text-[13px] font-bold tracking-wide text-white uppercase shadow-[0_8px_24px_rgba(47,107,255,0.35)] transition hover:brightness-110 sm:h-[50px] lg:w-[200px]"
            >
              Search Domain
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </form>

          <div className="mt-3 flex items-end gap-2 overflow-x-auto pb-0.5">
            {activeTeasers.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() => setTld(item.tld as typeof tld)}
                className={cn(
                  "inline-flex min-w-[100px] shrink-0 flex-col items-start rounded-[12px] border px-3.5 py-2 text-left backdrop-blur-xl transition",
                  tld === item.tld
                    ? "border-[#3b82f6]/50 bg-white/[0.14]"
                    : "border-white/16 bg-white/[0.08] hover:bg-white/[0.12]",
                )}
              >
                <span className="text-[14px] leading-none font-extrabold text-[#60a5fa]">
                  {item.tld}
                </span>
                <span className="mt-1.5 text-[12px] leading-none font-bold text-white">
                  {item.priceLabel}
                </span>
              </button>
            ))}
            <Link
              href={routes.domains}
              className="ml-auto shrink-0 self-center text-[13px] font-bold whitespace-nowrap text-[#93c5fd] transition hover:text-white"
            >
              View all domains →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
