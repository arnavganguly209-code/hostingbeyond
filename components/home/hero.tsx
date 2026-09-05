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

  const glassBg =
    !content?.backgroundImage ||
    content.backgroundImage.includes("hero-speaker-scene") ||
    content.backgroundImage.includes("hero-atmosphere")
      ? "/images/hero-glass-bg.jpg"
      : content.backgroundImage;

  const speakerSrc =
    !content?.speakerImage ||
    content.speakerImage.includes("hero-speaker-clear") ||
    content.speakerImage.includes("hero-speaker-cutout") ||
    content.speakerImage.includes("hero-speaker-scene")
      ? "/images/hero-speaker-half.png"
      : content.speakerImage;

  const glassLeft = (content?.glassPanelLeft || "Ideas\nHost\nGrow\nBeyond")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const glassRight =
    content?.glassPanelRight || "Global Infrastructure for a Brighter Tomorrow";

  const teasers = useMemo(() => {
    const fromCms = (content?.domainPricing ?? []).filter(
      (item) => item.visible !== false && item.tld.trim(),
    );
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
      <div className="relative mx-auto grid w-full max-w-[1360px] flex-1 grid-cols-1 items-center gap-2 px-[3%] pt-1 pb-0 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end lg:gap-0">
        {/* Left copy */}
        <div className="relative z-30 max-w-[520px] self-center lg:pb-10">
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
            className="font-heading mt-2 text-[clamp(2.1rem,4.3vw,3.55rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-slate-950"
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
            className="mt-3 max-w-[430px] text-[15px] leading-relaxed text-slate-600 sm:text-[15.5px]"
          >
            {description}
          </motion.p>

          <motion.form
            onSubmit={onSearch}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 flex w-full max-w-[500px] items-center gap-1.5 rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_14px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl"
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
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-4 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)] transition hover:brightness-105 sm:px-5"
            >
              {searchButtonLabel}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </motion.form>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-3 flex max-w-[500px] flex-nowrap items-center gap-2 overflow-x-auto"
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

        {/* Right: designed glass bg + clear half-body speaker */}
        <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[440px] lg:mx-0 lg:h-[min(52vh,520px)] lg:max-w-none xl:h-[min(56vh,560px)]">
          {/* Soft glass / datacenter atmosphere (no rectangular plate) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[4%_0_8%_8%] overflow-hidden rounded-[40px]"
          >
            <Image
              src={glassBg}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="hb-hero-atmosphere scale-[1.04] object-cover object-[60%_40%] opacity-90"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_40%,rgba(255,255,255,0.2),transparent_55%),linear-gradient(90deg,rgba(244,247,252,0.75)_0%,rgba(244,247,252,0.15)_22%,transparent_40%),linear-gradient(180deg,transparent_55%,rgba(255,255,255,0.55)_82%,#fff_100%)]" />
          </div>

          {/* Editable frosted glass overlays */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[12%] left-[10%] z-[5] hidden h-[58%] w-[24%] -rotate-[2deg] flex-col items-center justify-center rounded-[20px] border border-white/75 bg-white/30 px-2 shadow-[0_20px_50px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md lg:flex"
          >
            <div className="flex flex-col items-center gap-1 text-center text-[11px] font-bold tracking-[0.16em] text-slate-600 uppercase">
              {glassLeft.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className={cn(
                    index === glassLeft.length - 1 &&
                      "text-[12px] text-[#2563eb]",
                  )}
                >
                  {line}
                </span>
              ))}
              <span className="mt-1.5 h-0.5 w-8 rounded-full bg-[#3b82f6]" />
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute top-[16%] right-[4%] z-[5] hidden h-[52%] w-[27%] rotate-[1.8deg] rounded-[20px] border border-white/65 bg-white/22 shadow-[0_18px_44px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md lg:block"
          >
            <p className="absolute inset-x-3 top-[28%] text-center text-[10.5px] leading-relaxed font-semibold text-slate-600">
              {glassRight}
            </p>
          </div>

          {/* Soft light behind speaker */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[12%] left-[20%] z-[8] h-[62%] w-[58%] rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.7),rgba(186,230,253,0.28)_50%,transparent_72%)] blur-xl"
          />

          {/* Clear half-body speaker — full figure, no crop/zoom */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.06,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hb-hero-speaker absolute inset-x-[4%] top-[2%] bottom-0 z-10"
          >
            <Image
              src={speakerSrc}
              alt="HostingBeyond speaker"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-contain object-bottom"
            />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[14%] bg-gradient-to-r from-[#f4f7fc] via-[#f4f7fc]/6 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%] bg-gradient-to-b from-transparent via-white/55 to-white"
          />
        </div>
      </div>

      {/* Partner strip under domain area */}
      <div className="relative z-30 mt-auto shrink-0">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-9 h-10 w-full text-white sm:-top-11 sm:h-12"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,56 L0,24 C280,6 520,0 720,8 C960,16 1200,32 1440,20 L1440,56 Z"
          />
        </svg>
        <div className="relative bg-white px-[3.5%] pt-3 pb-4 sm:pt-4 sm:pb-5">
          <PartnerLogoStrip partners={content?.technologyPartners} />
        </div>
      </div>
    </section>
  );
}
