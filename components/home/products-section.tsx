"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { Check, Globe2, Mail, Server } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { type ProductOffer, productOffers } from "@/config/products";
import { routes } from "@/config/routes";
import { useLocale } from "@/components/locale/locale-provider";
import { cn } from "@/lib/utils";
import type { CmsProductsContent } from "@/lib/orbit/defaults";
import { DomainVisual, EmailVisual, HostingVisual } from "./product-visuals";
import { ProductsTrustBar } from "./products-trust-bar";

const icons = {
  domain: Globe2,
  email: Mail,
  hosting: Server,
} as const;

const accent = {
  blue: {
    card: "border-[#0a84ff]/40 shadow-[0_0_0_1px_rgb(10_132_255_/_0.14),0_20px_50px_rgb(0_0_0_/_0.4)] hover:border-[#0a84ff]/70",
    iconWrap: "border-[#0a84ff]/45 bg-[#0a84ff]/12 text-[#7cc4ff]",
    badge: "border-[#0a84ff]/45 bg-[#0a84ff]/10 text-[#9ad0ff]",
    title: "text-white",
    price: "text-[#2f9bff]",
    chip: "border-[#0a84ff]/40 bg-[#071428] text-[#9ad0ff]",
    check: "text-[#2f9bff]",
    cta: "border-[#0a84ff]/55 text-[#7cc4ff] hover:bg-[#0a84ff]/10",
    search: "bg-[#0a84ff]",
  },
  purple: {
    card: "border-[#a855f7]/40 shadow-[0_0_0_1px_rgb(168_85_247_/_0.14),0_20px_50px_rgb(0_0_0_/_0.4)] hover:border-[#a855f7]/70",
    iconWrap: "border-[#a855f7]/45 bg-[#a855f7]/12 text-[#d8b4fe]",
    badge: "border-[#a855f7]/45 bg-[#a855f7]/10 text-[#d8b4fe]",
    title:
      "bg-gradient-to-r from-white to-[#c084fc] bg-clip-text text-transparent",
    price: "text-[#c084fc]",
    chip: "border-[#a855f7]/40 bg-[#140a22] text-[#d8b4fe]",
    check: "text-[#c084fc]",
    cta: "border-[#a855f7]/55 text-[#d8b4fe] hover:bg-[#a855f7]/10",
    search: "bg-[#a855f7]",
  },
  cyan: {
    card: "border-[#22d3ee]/35 shadow-[0_0_0_1px_rgb(34_211_238_/_0.12),0_20px_50px_rgb(0_0_0_/_0.4)] hover:border-[#22d3ee]/65",
    iconWrap: "border-[#22d3ee]/40 bg-[#22d3ee]/10 text-[#67e8f9]",
    badge: "border-[#22d3ee]/45 bg-[#22d3ee]/8 text-[#67e8f9]",
    title:
      "bg-gradient-to-r from-white to-[#22d3ee] bg-clip-text text-transparent",
    price: "text-[#22d3ee]",
    chip: "border-[#22d3ee]/40 bg-[#071820] text-[#67e8f9]",
    check: "text-[#22d3ee]",
    cta: "border-[#22d3ee]/50 text-[#67e8f9] hover:bg-[#22d3ee]/8",
    search: "bg-[#22d3ee] text-[#041018]",
  },
} as const;

type DisplayOffer = {
  id: "domain" | "email" | "hosting";
  priceId: ProductOffer["priceId"];
  title: string;
  subtitle?: string;
  badge: string;
  accent: ProductOffer["accent"];
  priceSuffixKey: ProductOffer["priceSuffixKey"];
  highlightKey?: ProductOffer["highlightKey"];
  highlight?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  searchEnabled?: boolean;
};

function ProductCard({
  offer,
  index,
  priceLabel,
  priceSuffix,
  highlight,
  searchPlaceholder,
  searchLabel,
}: {
  offer: DisplayOffer;
  index: number;
  priceLabel: string;
  priceSuffix: string;
  highlight?: string;
  searchPlaceholder: string;
  searchLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const [domain, setDomain] = useState("");
  const styles = accent[offer.accent];
  const Icon = icons[offer.id];

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = domain.trim();
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: 0.08 + index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-[linear-gradient(165deg,rgba(10,14,28,0.96),rgba(4,8,18,0.98))] p-5 backdrop-blur-xl transition-[box-shadow,border-color,transform] duration-200 sm:p-6",
        styles.card,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border",
              styles.iconWrap,
            )}
          >
            <Icon className="size-5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <h3
              className={cn(
                "text-[15px] font-extrabold tracking-[0.1em] uppercase",
                styles.title,
              )}
            >
              {offer.title}
            </h3>
            {offer.subtitle ? (
              <p className="mt-1 text-[11px] leading-snug text-[var(--hb-muted)]">
                {offer.subtitle}
              </p>
            ) : null}
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] uppercase",
            styles.badge,
          )}
        >
          {offer.badge}
        </span>
      </div>

      <div className="mt-5">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span
            className={cn(
              "text-[2.4rem] leading-none font-extrabold tracking-tight tabular-nums transition-opacity duration-150",
              styles.price,
            )}
          >
            {priceLabel}
          </span>
          <span className="text-sm font-semibold text-white/55">
            {priceSuffix}
          </span>
        </p>
        {highlight ? (
          <span
            className={cn(
              "mt-3 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide uppercase",
              styles.chip,
            )}
          >
            {highlight}
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-[1.05fr_0.95fr] sm:items-center">
        <ul className="space-y-2.5">
          {offer.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-current/30 bg-current/10",
                  styles.check,
                )}
              >
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              <span className="text-[12.5px] leading-snug font-medium text-white/88">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block">
          {offer.id === "domain" ? <DomainVisual /> : null}
          {offer.id === "email" ? <EmailVisual /> : null}
          {offer.id === "hosting" ? <HostingVisual /> : null}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {offer.searchEnabled ? (
          <>
            <Link
              href={offer.ctaHref}
              className={cn(
                "inline-flex h-11 w-full items-center justify-center rounded-2xl border text-sm font-semibold transition-all duration-200",
                styles.cta,
              )}
            >
              {offer.ctaLabel}
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
            <form
              onSubmit={onSearch}
              className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-black/45 p-1.5"
            >
              <label htmlFor={`product-domain-${offer.id}`} className="sr-only">
                {searchPlaceholder}
              </label>
              <input
                id={`product-domain-${offer.id}`}
                type="text"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                className={cn(
                  "inline-flex h-10 shrink-0 items-center rounded-xl px-4 text-sm font-bold text-white transition hover:brightness-110",
                  styles.search,
                )}
              >
                {searchLabel}
              </button>
            </form>
          </>
        ) : (
          <Link
            href={offer.ctaHref}
            className={cn(
              "inline-flex h-11 w-full items-center justify-center rounded-2xl border text-sm font-semibold transition-all duration-200",
              styles.cta,
            )}
          >
            {offer.ctaLabel}
            <span aria-hidden className="ml-1">
              →
            </span>
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export function ProductsSection({ content }: { content?: CmsProductsContent }) {
  const reduceMotion = useReducedMotion();
  const { t, formatPrice, preferences, isPending } = useLocale();
  const useCms = preferences.language === "en" && Boolean(content);

  const eyebrow = useCms
    ? (content?.eyebrow ?? t.products.eyebrow)
    : t.products.eyebrow;
  const title = useCms
    ? (content?.title ?? t.products.title)
    : t.products.title;
  const titleAccent = useCms
    ? (content?.titleAccent ?? t.products.titleAccent)
    : t.products.titleAccent;
  const description = useCms
    ? (content?.description ?? t.products.description)
    : t.products.description;

  const baseOffers: DisplayOffer[] = productOffers.map((offer) => {
    const cmsOffer = content?.offers?.find((item) => item.id === offer.id);
    const localizedTitle =
      offer.id === "domain"
        ? t.products.domainTitle
        : offer.id === "email"
          ? t.products.emailTitle
          : t.products.hostingTitle;
    const localizedSubtitle =
      offer.id === "email"
        ? t.products.emailSubtitle
        : offer.id === "hosting"
          ? t.products.hostingSubtitle
          : undefined;
    const baseSubtitle =
      "subtitle" in offer && typeof offer.subtitle === "string"
        ? offer.subtitle
        : undefined;
    const localizedBadge =
      offer.id === "domain"
        ? t.products.domainBadge
        : offer.id === "email"
          ? t.products.emailBadge
          : t.products.hostingBadge;
    const localizedCta =
      offer.id === "domain"
        ? t.products.domainCta
        : offer.id === "email"
          ? t.products.emailCta
          : t.products.hostingCta;
    const highlight =
      offer.highlightKey === "domainHighlight"
        ? t.products.domainHighlight
        : offer.highlightKey === "perMailbox"
          ? t.products.perMailbox
          : offer.highlightKey === "startingPlan"
            ? t.products.startingPlan
            : undefined;

    return {
      id: offer.id,
      priceId: offer.priceId,
      accent: offer.accent,
      priceSuffixKey: offer.priceSuffixKey,
      highlightKey: offer.highlightKey,
      ctaHref: offer.ctaHref,
      searchEnabled: "searchEnabled" in offer ? offer.searchEnabled : false,
      title: useCms && cmsOffer?.title ? cmsOffer.title : localizedTitle,
      subtitle:
        useCms && cmsOffer?.subtitle
          ? cmsOffer.subtitle
          : (localizedSubtitle ?? baseSubtitle),
      badge: useCms && cmsOffer?.badge ? cmsOffer.badge : localizedBadge,
      ctaLabel: useCms && cmsOffer?.ctaLabel ? cmsOffer.ctaLabel : localizedCta,
      features:
        useCms && cmsOffer?.features?.length
          ? cmsOffer.features
          : offer.id === "domain"
            ? t.products.domainFeatures
            : offer.id === "email"
              ? t.products.emailFeatures
              : t.products.hostingFeatures,
      highlight: useCms && cmsOffer?.highlight ? cmsOffer.highlight : highlight,
    };
  });

  const trustItems = content?.trustItems;

  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-[var(--hb-bg)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-64 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgb(10_132_255_/_0.1),transparent_70%)] blur-2xl" />
        <div className="absolute top-[30%] left-[-8%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.08),transparent_70%)] blur-3xl" />
        <div className="absolute top-[35%] right-[-6%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgb(168_85_247_/_0.08),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase backdrop-blur-md"
          >
            {eyebrow}
          </motion.div>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.45 }}
            className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] text-white sm:text-[2.55rem] lg:text-[3rem]"
          >
            <span className="font-display font-normal">{title}</span>
            <br />
            <span className="bg-gradient-to-r from-[#22d3ee] via-[#5b8cff] to-[#a855f7] bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-[#aab2c5] sm:text-[15px]"
          >
            {description}
          </motion.p>
        </div>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-5 transition-opacity duration-150 lg:grid-cols-3 lg:gap-6",
            isPending && "opacity-70",
          )}
        >
          {baseOffers.map((offer, index) => (
            <ProductCard
              key={offer.id}
              offer={offer}
              index={index}
              priceLabel={formatPrice(offer.priceId)}
              priceSuffix={
                offer.priceSuffixKey === "perYear"
                  ? t.products.perYear
                  : t.products.perMonth
              }
              highlight={offer.highlight}
              searchPlaceholder={t.products.domainSearchPlaceholder}
              searchLabel={t.hero.search}
            />
          ))}
        </div>

        <ProductsTrustBar items={trustItems} />
      </div>
    </section>
  );
}
