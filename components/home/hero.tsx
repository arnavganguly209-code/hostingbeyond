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
  const speakerImage =
    content?.speakerImage?.includes("hero-speaker-clear") ||
    !content?.speakerImage
      ? "/images/hero-speaker-cutout.png"
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
    if (fromCms.length) return fromCms;
    return [
      { tld: ".com", priceLabel: "$7.99/yr", visible: true },
      { tld: ".net", priceLabel: "$6.99/yr", visible: true },
      { tld: ".org", priceLabel: "$5.99/yr", visible: true },
      { tld: ".co", priceLabel: "$4.99/yr", visible: true },
      { tld: ".dev", priceLabel: "$3.99/yr", visible: true },
    ];
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
      <div className="relative mx-auto grid w-full max-w-[1360px] flex-1 grid-cols-1 items-center gap-4 px-[3%] pt-2 pb-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end lg:gap-2 lg:pt-1">
        {/* Left copy */}
        <div className="relative z-30 max-w-[540px] self-center lg:pb-14">
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
            className="mt-6 flex w-full max-w-[520px] items-center gap-1.5 rounded-full border border-white/80 bg-white/85 p-1.5 shadow-[0_14px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl"
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
            className="mt-3.5 flex max-w-[520px] flex-wrap gap-2"
          >
            {teasers.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() =>
                  setTld(item.tld.startsWith(".") ? item.tld : `.${item.tld}`)
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/70 px-3 py-1.5 text-[12.5px] shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-md transition hover:border-sky-200 hover:bg-white",
                  (item.tld.startsWith(".") ? item.tld : `.${item.tld}`) ===
                    tld && "border-sky-300 bg-white",
                )}
              >
                <span className="font-bold text-[#2563eb]">
                  {item.tld.startsWith(".") ? item.tld : `.${item.tld}`}
                </span>
                <span className="font-medium text-slate-500">
                  {item.priceLabel}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Mobile / tablet speaker — compact, blended */}
        <div className="relative mx-auto mt-2 h-[340px] w-full max-w-[420px] sm:h-[400px] lg:hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(ellipse_at_50%_35%,rgba(147,197,253,0.42),transparent_68%)]"
          />
          <div className="hb-hero-speaker absolute inset-0 z-10">
            <Image
              src={speakerImage}
              alt="HostingBeyond speaker"
              fill
              priority
              unoptimized
              sizes="420px"
              className="object-contain object-bottom"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[30%] bg-gradient-to-b from-transparent to-white"
          />
        </div>

        {/* Right: designed glass scene (no black plate) + clear speaker */}
        <div className="relative mx-auto hidden min-h-[540px] w-full lg:block xl:min-h-[590px]">
          {/* Soft designed atmosphere — no rectangular photo plate */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute top-[4%] right-[0%] h-[78%] w-[92%] rounded-[42px] bg-[radial-gradient(ellipse_at_62%_36%,rgba(186,230,253,0.55),transparent_62%)] blur-2xl" />
            <div className="absolute top-[10%] right-[6%] h-[62%] w-[70%] rounded-[36px] bg-[radial-gradient(ellipse_at_70%_40%,rgba(196,181,253,0.28),transparent_60%)] blur-xl" />
            <div className="absolute top-[22%] right-[4%] h-[48%] w-[22%] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.18),transparent_70%)] blur-lg" />
            {/* Soft green plant hints */}
            <div className="absolute top-[28%] right-[38%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.35),transparent_70%)] blur-md" />
            <div className="absolute top-[36%] left-[18%] h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(167,243,208,0.28),transparent_70%)] blur-md" />
            {/* Server rack LED columns */}
            <div className="absolute top-[14%] right-[5%] flex h-[60%] gap-2.5 opacity-55">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative w-[15px] overflow-hidden rounded-full bg-gradient-to-b from-sky-200/70 via-blue-500/40 to-indigo-400/20 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                  style={{ height: `${58 + i * 8}%`, marginTop: `${i * 5}%` }}
                >
                  <div className="absolute inset-x-1 top-[12%] bottom-[12%] space-y-1.5">
                    {Array.from({ length: 8 }).map((_, d) => (
                      <div
                        key={d}
                        className="h-1 rounded-full bg-sky-300/80"
                        style={{ opacity: 0.35 + (d % 3) * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glass panel — Ideas Host Grow Beyond */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[10%] left-[8%] z-[5] flex h-[62%] w-[25%] -rotate-[2.2deg] flex-col items-center justify-center rounded-[22px] border border-white/80 bg-gradient-to-b from-white/55 to-white/20 px-3 shadow-[0_24px_60px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[16px]"
          >
            <div className="flex flex-col items-center gap-1.5 text-center text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase">
              {glassLeft.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className={cn(
                    index === glassLeft.length - 1 &&
                      "text-[13px] tracking-[0.14em] text-[#2563eb]",
                  )}
                >
                  {line}
                </span>
              ))}
              <span className="mt-2 h-0.5 w-10 rounded-full bg-[#3b82f6]" />
            </div>
          </div>

          {/* Glass panel — Global Infrastructure */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[13%] right-[3%] z-[5] h-[56%] w-[28%] rotate-[2deg] rounded-[22px] border border-white/70 bg-gradient-to-b from-white/45 to-white/15 shadow-[0_20px_50px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[16px]"
          >
            <p className="absolute inset-x-4 top-[30%] text-center text-[11px] leading-relaxed font-semibold tracking-[0.03em] text-slate-600">
              {glassRight}
            </p>
          </div>

          {/* Soft light behind speaker — no dark halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[14%] left-[22%] z-[8] h-[60%] w-[54%] rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.75),rgba(186,230,253,0.35)_45%,transparent_72%)] blur-xl"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.06,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hb-hero-speaker absolute inset-x-[2%] top-[2%] bottom-[2%] z-10"
          >
            <Image
              src={speakerImage}
              alt="HostingBeyond speaker"
              fill
              priority
              unoptimized
              sizes="(max-width: 1280px) 52vw, 720px"
              className="origin-bottom object-contain object-bottom"
            />
          </motion.div>

          {/* Soft edge dissolves — no black frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[18%] bg-gradient-to-r from-[#f4f7fc] via-[#f4f7fc]/75 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[8%] bg-gradient-to-l from-[#f4f7fc]/80 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[30%] bg-gradient-to-b from-transparent via-white/70 to-white"
          />
        </div>
      </div>

      <div className="relative z-30 mt-auto shrink-0">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-11 h-12 w-full text-white sm:-top-12 sm:h-14"
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
