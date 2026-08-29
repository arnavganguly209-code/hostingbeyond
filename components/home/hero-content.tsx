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
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.45 }}
        className="max-w-[14ch] text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.03em] text-white sm:max-w-none sm:text-[2.85rem] lg:text-[3.25rem] xl:text-[3.55rem]"
      >
        <span className="font-display font-normal tracking-[-0.02em]">
          {headline}
        </span>
        <br />
        <span className="mt-1 inline-block bg-gradient-to-r from-[#5BA8FF] via-[#7B8CFF] to-[#9B6CFF] bg-clip-text font-semibold tracking-[-0.025em] text-transparent">
          {accent}
        </span>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-5 max-w-[34rem] text-[15px] leading-[1.65] font-normal tracking-[-0.01em] text-[var(--hb-muted)] sm:text-[16px]"
      >
        {description}
      </motion.p>

      <motion.form
        onSubmit={onSearch}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-white/12 bg-[rgba(8,12,28,0.72)] p-1.5 shadow-[0_12px_36px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.06)] backdrop-blur-xl"
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
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm tracking-[-0.01em] text-white outline-none placeholder:text-white/40"
        />
        <Link
          href={routes.domains}
          className="hidden shrink-0 px-2 text-sm font-medium text-white/55 transition-colors duration-150 hover:text-white sm:inline"
        >
          {bulkLabel}
        </Link>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-5 text-sm font-semibold text-white transition duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)]"
        >
          <Search className="size-4" aria-hidden />
          {t.hero.search}
        </button>
      </motion.form>

      <motion.ul
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {trustItems.map((item) => {
          const Icon =
            trustIcons[item.icon as keyof typeof trustIcons] ?? ShieldCheck;
          return (
            <li key={item.title} className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-[#8ec5ff]">
                <Icon className="size-3.5" strokeWidth={1.9} />
              </span>
              <span>
                <span className="block text-[12px] font-semibold tracking-[-0.01em] text-white sm:text-[13px]">
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
