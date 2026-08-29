/**
 * Commercial product offers — matches HostingBeyond products mockup.
 * Prices come from config/pricing.ts (never hardcode currency amounts here).
 */

import type { ProductPriceId } from "./pricing";
import { routes } from "./routes";

export type ProductAccent = "blue" | "purple" | "cyan";

export type ProductOffer = {
  id: "domain" | "email" | "hosting";
  priceId: ProductPriceId;
  title: string;
  subtitle?: string;
  badge: string;
  accent: ProductAccent;
  /** Legacy display fallback — prefer formatPrice(priceId) at render time */
  priceSuffixKey: "perYear" | "perMonth";
  highlightKey?: "domainHighlight" | "perMailbox" | "startingPlan";
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  searchEnabled?: boolean;
};

export const productOffers = [
  {
    id: "domain",
    priceId: "domain_yearly",
    title: "Domain Site",
    badge: "Best Value",
    accent: "blue",
    priceSuffixKey: "perYear",
    highlightKey: "domainHighlight",
    features: [
      "Free Domain Privacy Protection",
      "Free DNS Management",
      "24/7 Domain Support",
      "Easy Domain Management",
    ],
    ctaLabel: "Find Your Domain",
    ctaHref: routes.domains,
    searchEnabled: true,
  },
  {
    id: "email",
    priceId: "email_monthly",
    title: "Business Email",
    subtitle: "Professional Email for Your Business",
    badge: "Professional",
    accent: "purple",
    priceSuffixKey: "perMonth",
    highlightKey: "perMailbox",
    features: [
      "Custom Email Address",
      "Spam & Virus Protection",
      "99.99% Uptime Guarantee",
      "Webmail Access",
      "Mobile & Desktop Sync",
    ],
    ctaLabel: "Get Business Email",
    ctaHref: routes.businessEmail,
  },
  {
    id: "hosting",
    priceId: "hosting_monthly",
    title: "Web Hosting",
    subtitle: "Blazing-Fast Hosting Plans",
    badge: "Fast & Reliable",
    accent: "cyan",
    priceSuffixKey: "perMonth",
    highlightKey: "startingPlan",
    features: [
      "Ultra-Fast NVMe SSD",
      "99.99% Uptime Guarantee",
      "Free SSL Certificate",
      "Daily Backups",
      "24/7 Expert Support",
    ],
    ctaLabel: "View Hosting Plans",
    ctaHref: routes.hosting,
  },
] as const satisfies readonly ProductOffer[];

export const productsTrustItems = [
  {
    title: "Trusted by Thousands",
    subtitle: "Growing businesses choose HostingBeyond every day",
    icon: "shield",
  },
  {
    title: "99.99% Uptime",
    subtitle: "Reliable infrastructure with network guarantee",
    icon: "uptime",
  },
  {
    title: "Secure & Safe",
    subtitle: "Enterprise-grade protection for your data",
    icon: "lock",
  },
  {
    title: "24/7 Support",
    subtitle: "Expert help whenever you need it",
    icon: "support",
  },
  {
    title: "Built for Growth",
    subtitle: "Scale from startup to enterprise smoothly",
    icon: "rocket",
  },
] as const;

export function priceIdForProduct(id: string): ProductPriceId {
  if (id === "email") return "email_monthly";
  if (id === "hosting") return "hosting_monthly";
  return "domain_yearly";
}
