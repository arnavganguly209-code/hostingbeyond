"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { heroTldOptions } from "@/config/domain-teasers";
import { routes } from "@/config/routes";
import { PartnerLogoStrip } from "@/components/home/partner-logo-strip";
import { useLocale } from "@/components/locale/locale-provider";
import { cn } from "@/lib/utils";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

const REF = {
  eyebrow: "SIMPLE • SECURE • SCALABLE",
  headline: "Host Your Ideas",
  headlineAccent: "Beyond Limits",
  description:
    "Reliable hosting, powerful infrastructure and the freedom to build what's next.",
  searchPlaceholder: "Find your perfect domain name...",
  searchButtonLabel: "Search",
};

const DEFAULT_TEASERS = [
  { tld: ".com", priceLabel: "$9.99" },
  { tld: ".net", priceLabel: "$11.99" },
  { tld: ".org", priceLabel: "$9.99" },
  { tld: ".dev", priceLabel: "$14.99" },
] as const;

export function HeroSection({
  content,
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
  const accentRaw = isEn
    ? REF.headlineAccent
    : (content?.headlineAccent ?? REF.headlineAccent);
  const accent = /limits/i.test(accentRaw)
    ? accentRaw.replace(/\.$/, "")
    : `${accentRaw.replace(/\.$/, "")} Limits`;
  const description = isEn
    ? REF.description
    : (content?.description ?? REF.description);
  const searchPlaceholder = isEn
    ? REF.searchPlaceholder
    : (content?.searchPlaceholder ?? REF.searchPlaceholder);
  const searchButtonLabel = isEn
    ? REF.searchButtonLabel
    : (content?.searchButtonLabel ?? REF.searchButtonLabel);

  // Always match mockup pricing chips
  const activeTeasers = [...DEFAULT_TEASERS];

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
      <div className="relative mx-auto grid min-h-0 w-full max-w-[1320px] flex-1 grid-cols-1 items-center gap-2 px-[3.5%] pt-1 pb-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-2 xl:gap-4">
        {/* Left copy */}
        <div className="relative z-20 max-w-[540px] lg:self-center lg:pb-10">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase sm:text-[12px]"
          >
            {eyebrow || REF.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="font-heading mt-2.5 text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-slate-950"
          >
            <span className="block">{headline}</span>
            <span className="mt-0.5 block bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#2563eb] bg-clip-text text-transparent">
              {accent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-3 max-w-[440px] text-[14px] leading-relaxed font-medium text-slate-600 sm:text-[15px] lg:mt-3.5"
          >
            {description}
          </motion.p>

          <motion.form
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            onSubmit={onSearch}
            className="mt-5"
          >
            <div className="flex min-w-0 items-center gap-1.5 rounded-full border border-white/80 bg-white/95 p-1.5 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl focus-within:border-[#818cf8]/50 focus-within:ring-4 focus-within:ring-[#818cf8]/12">
              <span className="pl-2.5">
                <Search className="size-4 text-slate-400" aria-hidden />
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
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[13.5px] text-slate-900 outline-none placeholder:text-slate-400 sm:text-[14.5px]"
              />
              <div className="relative shrink-0">
                <select
                  value={tld}
                  onChange={(event) => setTld(event.target.value as typeof tld)}
                  className="h-[34px] appearance-none rounded-full border border-slate-200/80 bg-slate-50/90 py-1.5 pr-7 pl-2.5 text-[12px] font-bold text-slate-700 outline-none"
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
                className="inline-flex h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-4 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(99,102,241,0.38)] transition hover:brightness-110 sm:h-[42px] sm:px-5"
              >
                {searchButtonLabel}
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
            </div>
          </motion.form>

          {/* Domain price chips — mockup match */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-3.5 flex flex-wrap gap-2.5"
          >
            {activeTeasers.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() => setTld(item.tld as typeof tld)}
                className={cn(
                  "inline-flex items-baseline gap-1.5 rounded-2xl border bg-white/90 px-3.5 py-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)] backdrop-blur-md transition",
                  tld === item.tld
                    ? "border-[#818cf8]/60 ring-2 ring-[#818cf8]/15"
                    : "border-white hover:border-slate-200",
                )}
              >
                <span className="text-[13.5px] font-extrabold text-[#4f46e5]">
                  {item.tld}
                </span>
                <span className="text-[12.5px] font-semibold text-slate-500">
                  {item.priceLabel}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right: glass atmosphere + clear speaker + soft fade */}
        <div className="relative mx-auto hidden h-full min-h-[480px] w-full lg:block">
          {/* Soft blue bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[4%] right-[0%] h-[70%] w-[85%] rounded-[48px] bg-[radial-gradient(ellipse_at_55%_40%,rgba(147,197,253,0.42),transparent_68%)] blur-3xl"
          />

          {/* Glass / office atmosphere (faded, not stuck) */}
          <div className="hb-hero-glass-bg absolute inset-0 overflow-hidden">
            <Image
              src="/images/hero-glass-scene.png"
              alt=""
              fill
              priority
              quality={90}
              sizes="(max-width: 1280px) 52vw, 700px"
              className="scale-[1.08] object-cover object-[60%_40%] opacity-40 blur-[2px]"
            />
          </div>

          {/* Frosted glass panels */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[10%] left-[6%] h-[62%] w-[22%] -rotate-[4deg] rounded-[18px] border border-white/55 bg-white/25 shadow-[0_20px_50px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md"
          >
            <div className="flex h-full flex-col justify-center gap-1 px-3 py-6 text-center text-[11px] font-bold tracking-[0.14em] text-sky-700/80 uppercase">
              <span>Ideas</span>
              <span>Host</span>
              <span>Grow</span>
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent">
                Beyond
              </span>
              <span className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-sky-400/70" />
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-[14%] right-[4%] h-[58%] w-[24%] rotate-[3deg] rounded-[18px] border border-white/50 bg-white/20 shadow-[0_20px_50px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md"
          >
            <p className="absolute inset-x-3 top-[28%] text-center text-[10px] leading-snug font-semibold tracking-[0.06em] text-sky-800/70 uppercase">
              Global Infrastructure for a Brighter Tomorrow
            </p>
          </div>

          {/* Clear speaker — premium cutout with bottom dissolve */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hb-hero-speaker absolute inset-x-[4%] inset-y-[2%] z-10"
          >
            <Image
              src="/images/hero-speaker-clear.png"
              alt="HostingBeyond speaker Alex Carter"
              fill
              priority
              quality={98}
              sizes="(max-width: 1280px) 48vw, 640px"
              className="object-contain object-[50%_100%] drop-shadow-[0_24px_48px_rgba(15,23,42,0.14)]"
            />
          </motion.div>

          {/* Soft white ground fade into partner strip */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[28%] bg-gradient-to-b from-transparent via-white/70 to-white"
          />
        </div>
      </div>

      {/* Soft wave + partner logos */}
      <div className="relative z-10 mt-auto shrink-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-20 h-24 bg-gradient-to-b from-transparent via-white/85 to-white"
        />
        <div className="relative border-t border-slate-200/35 bg-white/80 px-[3.5%] pt-5 pb-5 backdrop-blur-xl sm:pt-6 sm:pb-6">
          <PartnerLogoStrip />
        </div>
      </div>
    </section>
  );
}
