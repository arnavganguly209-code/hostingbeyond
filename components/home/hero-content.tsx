"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { Headphones, Lock, Search, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { routes } from "@/config/routes";
import { useLocale } from "@/components/locale/locale-provider";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

const trustIcons = {
  shield: ShieldCheck,
  lock: Lock,
  support: Headphones,
} as const;

export function HeroContent({ content }: { content?: CmsHeroContent }) {
  const reduceMotion = useReducedMotion();
  const { t, preferences } = useLocale();
  const [domain, setDomain] = useState("");

  const useCmsCopy = preferences.language === "en" && Boolean(content);
  const eyebrow = useCmsCopy ? (content?.eyebrow ?? "") : "";
  const headline = useCmsCopy
    ? (content?.headline ?? t.hero.headline)
    : t.hero.headline;
  const accent = useCmsCopy
    ? (content?.headlineAccent ?? t.hero.headlineAccent)
    : t.hero.headlineAccent;
  const description = useCmsCopy
    ? (content?.description ?? t.hero.description)
    : t.hero.description;
  const placeholder = useCmsCopy
    ? (content?.searchPlaceholder ?? t.hero.searchPlaceholder)
    : t.hero.searchPlaceholder;
  const bulkLabel = useCmsCopy
    ? (content?.bulkSearchLabel ?? t.hero.bulkSearch)
    : t.hero.bulkSearch;
  const searchLabel = useCmsCopy
    ? (content?.searchButtonLabel ?? t.hero.search)
    : t.hero.search;

  const trustItems =
    useCmsCopy && content?.trustItems
      ? content.trustItems
      : [
          {
            title: t.hero.trustUptime,
            subtitle: t.hero.trustUptimeSub,
            icon: "shield",
          },
          {
            title: t.hero.trustSecure,
            subtitle: t.hero.trustSecureSub,
            icon: "lock",
          },
          {
            title: t.hero.trustSupport,
            subtitle: t.hero.trustSupportSub,
            icon: "support",
          },
        ];

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = domain.trim();
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <div className="relative z-20 w-full">
      {eyebrow ? (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2 text-[11px] font-bold tracking-[0.22em] text-white/55 uppercase sm:mb-3"
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(1.85rem,4.2vw+0.6rem,3.55rem)] leading-[1.08] tracking-[-0.04em] text-white"
      >
        <span className="font-heading block font-extrabold whitespace-nowrap text-white drop-shadow-[0_2px_24px_rgb(0_0_0_/_0.35)]">
          {headline}
        </span>
        <span
          className={
            reduceMotion
              ? "font-heading mt-0.5 block bg-gradient-to-r from-[#5BA8FF] via-[#8B7CFF] to-[#B06CFF] bg-clip-text font-extrabold whitespace-nowrap text-transparent"
              : "hb-hero-gradient font-heading mt-0.5 block bg-clip-text font-extrabold whitespace-nowrap text-transparent"
          }
        >
          {accent}
        </span>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
        className="mt-3 max-w-[34rem] text-[14px] leading-[1.55] font-medium tracking-[-0.01em] text-[#b7bfcf] sm:mt-4 sm:text-[15px] lg:text-[16px]"
      >
        {description}
      </motion.p>

      <motion.form
        onSubmit={onSearch}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.45 }}
        className="mt-5 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-white/12 bg-[rgba(8,12,28,0.78)] p-1.5 shadow-[0_12px_36px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.06)] backdrop-blur-xl sm:mt-6"
      >
        <label htmlFor="domain-search" className="sr-only">
          {placeholder}
        </label>
        <input
          id="domain-search"
          type="text"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm tracking-[-0.01em] text-white outline-none placeholder:text-white/40 sm:py-3"
        />
        <Link
          href={routes.domains}
          className="hidden shrink-0 px-2 text-sm font-medium text-white/55 transition-colors duration-150 hover:text-white sm:inline"
        >
          {bulkLabel}
        </Link>
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-4 text-sm font-bold text-white transition duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)] sm:h-11 sm:px-5"
        >
          <Search className="size-4" aria-hidden />
          {searchLabel}
        </button>
      </motion.form>

      <motion.ul
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.45 }}
        className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4"
      >
        {trustItems.map((item) => {
          const Icon =
            trustIcons[item.icon as keyof typeof trustIcons] ?? ShieldCheck;
          return (
            <li key={item.title} className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-[#8ec5ff] sm:size-8">
                <Icon className="size-3.5" strokeWidth={1.9} />
              </span>
              <span>
                <span className="block text-[12px] font-bold tracking-[-0.01em] text-white sm:text-[13px]">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-white/50">
                  {item.subtitle}
                </span>
              </span>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
