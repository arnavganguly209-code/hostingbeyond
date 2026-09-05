"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { heroTldOptions } from "@/config/domain-teasers";
import { routes } from "@/config/routes";
import { useLocale } from "@/components/locale/locale-provider";
import { cn } from "@/lib/utils";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

const REF = {
  eyebrow: "SIMPLE • SECURE • SCALABLE",
  headline: "Host Your Ideas",
  headlineAccent: "Beyond",
  headlineEnd: "Limits.",
  description:
    "Reliable hosting, powerful infrastructure and the freedom to build what's next.",
  searchPlaceholder: "Find your perfect domain name...",
  searchButtonLabel: "Search",
};

const PARTNERS = [
  "WordPress",
  "cPanel",
  "plesk",
  "intel",
  "AMD",
  "DELL",
  "NVMe Express",
] as const;

const DEFAULT_TEASERS = [
  { tld: ".com", priceLabel: "$9.99" },
  { tld: ".net", priceLabel: "$11.99" },
  { tld: ".org", priceLabel: "$9.99" },
  { tld: ".dev", priceLabel: "$14.99" },
] as const;

export function HeroSection({
  content,
  speakerSrc = "/images/hero-speaker-light.png",
}: {
  content?: CmsHeroContent;
  speakerSrc?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { preferences } = useLocale();
  const [domain, setDomain] = useState("");
  const [tld, setTld] = useState<(typeof heroTldOptions)[number]>(".com");

  const isEn = preferences.language === "en";
  const eyebrow = isEn ? REF.eyebrow : content?.eyebrow || REF.eyebrow;
  const headline = isEn ? REF.headline : (content?.headline ?? REF.headline);
  const accent = isEn
    ? REF.headlineAccent
    : (content?.headlineAccent ?? REF.headlineAccent);
  const description = isEn
    ? REF.description
    : (content?.description ?? REF.description);
  const searchPlaceholder = isEn
    ? REF.searchPlaceholder
    : (content?.searchPlaceholder ?? REF.searchPlaceholder);
  const searchButtonLabel = isEn
    ? REF.searchButtonLabel
    : (content?.searchButtonLabel ?? REF.searchButtonLabel);

  const activeTeasers = content?.domainPricing
    ?.filter((d) => d.visible !== false)
    .slice(0, 4) ?? [...DEFAULT_TEASERS];

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
      <div className="relative mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-cols-1 items-center gap-4 px-[4%] pt-2 pb-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:pt-1 lg:pb-0 xl:gap-8">
        {/* Left copy */}
        <div className="relative z-10 max-w-[560px] lg:pb-6">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase sm:text-[12px]"
          >
            {eyebrow || REF.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="font-heading mt-3 text-[clamp(2.15rem,4.4vw,3.65rem)] leading-[1.08] font-extrabold tracking-[-0.038em] text-slate-900"
          >
            {headline}{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#2563eb] bg-clip-text text-transparent">
              {accent}
            </span>{" "}
            {REF.headlineEnd}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-3 max-w-[460px] text-[14px] leading-relaxed font-medium text-slate-600 sm:text-[15.5px] lg:mt-4"
          >
            {description}
          </motion.p>

          <motion.form
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            onSubmit={onSearch}
            className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 shadow-[0_10px_36px_rgba(15,23,42,0.08)] focus-within:border-[#818cf8]/55 focus-within:ring-4 focus-within:ring-[#818cf8]/15">
              <Search className="size-4 shrink-0 text-slate-400" aria-hidden />
              <label htmlFor="hero-domain-search" className="sr-only">
                {searchPlaceholder}
              </label>
              <input
                id="hero-domain-search"
                type="text"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent py-[13px] text-[14px] text-slate-900 outline-none placeholder:text-slate-400 sm:text-[15px]"
              />
              <div className="relative shrink-0">
                <select
                  value={tld}
                  onChange={(event) => setTld(event.target.value as typeof tld)}
                  className="h-[34px] appearance-none rounded-full border border-slate-200 bg-slate-50 py-1.5 pr-7 pl-2.5 text-[12px] font-bold text-slate-700 outline-none"
                  aria-label="Domain extension"
                >
                  {heroTldOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
              </div>
              <button
                type="submit"
                className="ml-0.5 inline-flex h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-4 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(99,102,241,0.35)] transition hover:brightness-110 sm:h-[42px] sm:px-5"
              >
                {searchButtonLabel}
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-3.5 flex flex-wrap gap-2 sm:mt-4"
          >
            {activeTeasers.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() => setTld(item.tld as typeof tld)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl border bg-white px-3 py-2 text-left shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition",
                  tld === item.tld
                    ? "border-[#818cf8]/50 ring-2 ring-[#818cf8]/15"
                    : "border-slate-200/90 hover:border-slate-300",
                )}
              >
                <span className="text-[13px] font-extrabold text-slate-900">
                  {item.tld}
                </span>
                <span className="text-[12px] font-semibold text-slate-500">
                  {item.priceLabel.replace(/\/yr$/i, "")}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right speaker + glass panels */}
        <div className="relative mx-auto hidden h-full min-h-[380px] w-full max-w-[560px] lg:block xl:max-w-none">
          <div
            aria-hidden
            className="absolute top-[8%] right-[6%] h-[72%] w-[58%] rounded-[28px] border border-white/60 bg-white/35 shadow-[0_24px_60px_rgba(37,99,235,0.12)] backdrop-blur-xl"
          />
          <div
            aria-hidden
            className="absolute top-[18%] right-[2%] flex h-[58%] w-[34%] flex-col justify-between rounded-[24px] border border-white/50 bg-gradient-to-b from-white/55 to-sky-100/40 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-lg"
          >
            <p className="text-[11px] leading-snug font-bold tracking-[0.08em] text-slate-600 uppercase">
              Ideas
              <br />
              Host
              <br />
              Grow
              <br />
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent underline decoration-[#2563eb]/50 underline-offset-4">
                Beyond
              </span>
            </p>
            <p className="text-[10px] leading-snug font-semibold text-slate-500">
              Global Infrastructure for a Brighter Tomorrow
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hb-hero-light-speaker absolute inset-x-0 top-[2%] bottom-0"
          >
            <Image
              src={speakerSrc}
              alt="HostingBeyond speaker"
              fill
              priority
              quality={95}
              sizes="(max-width: 1280px) 48vw, 560px"
              className="object-contain object-bottom"
            />
          </motion.div>
        </div>
      </div>

      {/* Partner strip */}
      <div className="relative z-10 shrink-0 border-t border-slate-200/60 bg-white/50 px-[4%] py-3 backdrop-blur-md sm:py-3.5">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:justify-between sm:gap-x-4">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-[11px] font-extrabold tracking-[0.04em] text-slate-400 uppercase sm:text-[12px]"
            >
              {name === "NVMe Express" ? (
                <span className="normal-case">
                  NVMe <span className="font-semibold">Express</span>
                </span>
              ) : (
                name
              )}
            </span>
          ))}
        </div>
        <Link href={routes.domains} className="sr-only">
          View all domains
        </Link>
      </div>
    </section>
  );
}
