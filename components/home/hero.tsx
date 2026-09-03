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
      <div className="mx-auto flex min-h-0 w-full max-w-[1520px] flex-1 flex-col justify-center px-[3.5%] pt-4 pb-3 lg:pt-6">
        <div className="max-w-[620px]">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.10] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white/90 uppercase backdrop-blur-xl"
          >
            <Zap className="size-3.5 text-[#60a5fa]" aria-hidden />
            Powerful. Reliable. Secure.
          </motion.p>

          <h1 className="font-heading text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="block"
            >
              {line1}
            </motion.span>
            {line2 ? (
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="block"
              >
                {line2}
              </motion.span>
            ) : null}
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="block bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent"
            >
              {line3}
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 max-w-[520px] text-[16px] leading-[1.55] font-medium text-white/78 sm:text-[17px]"
          >
            {description}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              href={routes.getStarted}
              className="inline-flex h-[50px] min-w-[158px] items-center justify-center gap-2 rounded-2xl bg-[#2f6bff] px-6 text-[14px] font-bold text-white shadow-[0_8px_28px_rgba(47,107,255,0.38)] transition hover:brightness-110"
            >
              Get Started
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={routes.hosting}
              className="inline-flex h-[50px] min-w-[158px] items-center justify-center gap-2 rounded-2xl border border-white/22 bg-white/[0.08] px-6 text-[14px] font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.14]"
            >
              Explore Plans
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="relative z-20 mx-auto w-full max-w-[1520px] shrink-0 px-[3.5%] pb-4 lg:pb-5"
      >
        <div className="rounded-[22px] border border-white/16 bg-white/[0.08] px-4 py-4 shadow-[0_16px_50px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl sm:px-5 sm:py-5">
          <form
            onSubmit={onSearch}
            className="flex flex-col gap-3 lg:flex-row lg:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-white/16 bg-[#0a1630]/45 px-3.5 focus-within:border-[#60a5fa]/55">
              <span className="inline-flex size-9 shrink-0 items-center justify-center text-[#93c5fd]">
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
                className="min-w-0 flex-1 bg-transparent py-[13px] text-[15px] text-white outline-none placeholder:text-white/40 sm:text-[16px]"
              />
              <div className="relative shrink-0">
                <select
                  value={tld}
                  onChange={(event) => setTld(event.target.value as typeof tld)}
                  className="h-[42px] appearance-none rounded-xl border border-white/16 bg-white/[0.08] py-2 pr-8 pl-3 text-[13px] font-bold text-white outline-none sm:h-[46px]"
                  aria-label="Domain extension"
                >
                  {heroTldOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#0a1630]"
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
              className="inline-flex h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#2f6bff] px-6 text-[13px] font-bold tracking-wide text-white uppercase shadow-[0_8px_24px_rgba(47,107,255,0.35)] transition hover:brightness-110 sm:h-[52px] lg:w-[210px]"
            >
              Search Domain
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </form>

          <div className="mt-3.5 flex items-center gap-2.5 overflow-x-auto pb-0.5">
            {activeTeasers.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() => setTld(item.tld as typeof tld)}
                className={cn(
                  "inline-flex min-w-[92px] shrink-0 flex-col items-start rounded-xl border px-3.5 py-2 text-left backdrop-blur-xl transition",
                  tld === item.tld
                    ? "border-white/28 bg-white/[0.14]"
                    : "border-white/14 bg-white/[0.07] hover:bg-white/[0.12]",
                )}
              >
                <span className="text-[13px] font-extrabold text-white">
                  {item.tld}
                </span>
                <span className="text-[11px] font-medium text-white/60">
                  {item.priceLabel}
                </span>
              </button>
            ))}
            <Link
              href={routes.domains}
              className="ml-auto shrink-0 text-[13px] font-bold whitespace-nowrap text-[#93c5fd] transition hover:text-white"
            >
              View all domains →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
