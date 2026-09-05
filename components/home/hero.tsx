"use client";

import { type FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { heroTldOptions } from "@/config/domain-teasers";
import { routes } from "@/config/routes";
import { PartnerLogoStrip } from "@/components/home/partner-logo-strip";
import { cn } from "@/lib/utils";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

const FALLBACK_TEASERS = [
  { tld: ".com", priceLabel: "$7.99/yr", visible: true },
  { tld: ".net", priceLabel: "$6.99/yr", visible: true },
  { tld: ".org", priceLabel: "$5.99/yr", visible: true },
  { tld: ".dev", priceLabel: "$3.99/yr", visible: true },
] as const;

export function HeroSection({ content }: { content?: CmsHeroContent }) {
  const reduceMotion = useReducedMotion();
  const [domain, setDomain] = useState("");

  const eyebrow = content?.eyebrow || "SIMPLE • SECURE • SCALABLE";
  const headline = content?.headline || "Host Your Ideas";
  const accent = (content?.headlineAccent || "Beyond Limits").replace(
    /\.$/,
    "",
  );
  const description =
    content?.description ||
    "Reliable hosting, powerful infrastructure and the freedom to build what's next.";
  const searchPlaceholder =
    content?.searchPlaceholder || "Find your perfect domain name...";
  const searchButtonLabel = content?.searchButtonLabel || "Search";

  const sceneImage =
    content?.backgroundImage?.includes("hero-atmosphere") ||
    content?.backgroundImage?.includes("hero-speaker-scene-v") ||
    !content?.backgroundImage
      ? "/images/hero-speaker-scene.png"
      : content.backgroundImage;

  const teasers = useMemo(() => {
    const fromCms = (content?.domainPricing ?? []).filter(
      (item) => item.visible !== false && item.tld.trim(),
    );
    // Keep a single premium row of 4 (match mockup)
    const preferred = [".com", ".net", ".org", ".dev"];
    if (fromCms.length) {
      const normalized = fromCms.map((item) => ({
        ...item,
        tld: item.tld.startsWith(".") ? item.tld : `.${item.tld}`,
      }));
      const picked = preferred
        .map((tld) => normalized.find((item) => item.tld === tld))
        .filter(Boolean) as typeof normalized;
      if (picked.length >= 4) return picked.slice(0, 4);
      return normalized.slice(0, 4);
    }
    return [...FALLBACK_TEASERS];
  }, [content?.domainPricing]);

  const tldChoices = useMemo(() => {
    const fromTeasers = teasers.map((item) =>
      item.tld.startsWith(".") ? item.tld : `.${item.tld}`,
    );
    const merged = [...fromTeasers];
    for (const option of heroTldOptions) {
      if (!merged.includes(option)) merged.push(option);
    }
    return merged;
  }, [teasers]);

  const [tld, setTld] = useState(tldChoices[0] || ".com");

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = domain.trim().replace(/^\.+/, "");
    const query = raw ? (raw.includes(".") ? raw : `${raw}${tld}`) : "";
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <section className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-[1360px] flex-1 grid-cols-1 items-center gap-3 px-[3%] pt-2 pb-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-1 lg:pt-1">
        {/* Left copy */}
        <div className="relative z-30 max-w-[520px] self-center lg:pb-12">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.22em] text-slate-500 uppercase sm:text-[12px]"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="font-heading mt-2.5 text-[clamp(2.15rem,4.4vw,3.65rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-slate-950"
          >
            <span className="block">{headline}</span>
            <span className="mt-0.5 block bg-gradient-to-r from-[#7c3aed] via-[#4f46e5] to-[#2563eb] bg-clip-text text-transparent">
              {accent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-3.5 max-w-[440px] text-[15px] leading-relaxed text-slate-600 sm:text-[16px]"
          >
            {description}
          </motion.p>

          <motion.form
            onSubmit={onSearch}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 flex w-full max-w-[500px] items-center gap-1.5 rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_14px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
              <Search
                className="size-[18px] shrink-0 text-slate-400"
                aria-hidden
              />
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400 sm:text-[15px]"
              />
            </div>
            <label className="relative shrink-0">
              <span className="sr-only">Domain extension</span>
              <select
                value={tld}
                onChange={(e) => setTld(e.target.value)}
                className="h-10 appearance-none rounded-full border border-slate-200/80 bg-slate-50/90 py-0 pr-8 pl-3 text-[13px] font-semibold text-slate-700 outline-none"
              >
                {tldChoices.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-4 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)] transition hover:brightness-105 sm:px-5 sm:text-[14px]"
            >
              {searchButtonLabel}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </motion.form>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-3.5 flex max-w-[500px] flex-nowrap items-center gap-2 overflow-x-auto pb-0.5"
          >
            {teasers.map((item) => {
              const value = item.tld.startsWith(".")
                ? item.tld
                : `.${item.tld}`;
              const active = value === tld;
              return (
                <button
                  key={item.tld}
                  type="button"
                  onClick={() => setTld(value)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition",
                    active
                      ? "border-sky-300 bg-sky-50"
                      : "border-slate-200/90 bg-white hover:border-sky-200",
                  )}
                >
                  <span className="font-extrabold text-[#2563eb]">{value}</span>
                  <span className="font-bold text-slate-600">
                    {item.priceLabel}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile speaker scene */}
        <div className="relative mx-auto mt-1 h-[360px] w-full max-w-[440px] sm:h-[420px] lg:hidden">
          <div className="hb-hero-scene absolute inset-0">
            <Image
              src={sceneImage}
              alt="HostingBeyond speaker"
              fill
              priority
              unoptimized
              sizes="440px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Desktop: mockup-matched speaker + glass scene */}
        <div className="relative mx-auto hidden min-h-[520px] w-full lg:block xl:min-h-[560px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.05,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hb-hero-scene absolute inset-0"
          >
            <Image
              src={sceneImage}
              alt="HostingBeyond speaker with glass infrastructure backdrop"
              fill
              priority
              unoptimized
              sizes="(max-width: 1280px) 52vw, 720px"
              className="object-contain object-[72%_bottom] xl:object-[70%_bottom]"
            />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[12%] bg-gradient-to-r from-[#f4f7fc] via-[#f4f7fc]/55 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[18%] bg-gradient-to-b from-transparent via-white/50 to-white"
          />
        </div>
      </div>

      {/* Partner / technology strip */}
      <div className="relative z-30 mt-auto shrink-0">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 h-11 w-full text-white sm:-top-12 sm:h-14"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,56 L0,24 C280,6 520,0 720,8 C960,16 1200,32 1440,20 L1440,56 Z"
          />
        </svg>
        <div className="relative border-t border-slate-100/80 bg-white px-[3.5%] pt-4 pb-5 sm:pt-5 sm:pb-6">
          <PartnerLogoStrip partners={content?.technologyPartners} />
        </div>
      </div>
    </section>
  );
}
