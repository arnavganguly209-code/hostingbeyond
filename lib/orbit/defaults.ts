import { mainNavigation } from "@/config/navigation";
import { productOffers } from "@/config/products";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

export type CmsSiteSettings = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  twitterHandle: string;
  logoPath: string;
  ogImagePath: string;
  loginLabel: string;
  getStartedLabel: string;
  getStartedHref: string;
  loginHref: string;
  contactEmail: string;
  contactPhone: string;
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
  };
};

export type CmsHeroContent = {
  visible: boolean;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  bulkSearchLabel: string;
  backgroundImage: string;
  trustItems: Array<{ title: string; subtitle: string; icon: string }>;
  stats: Array<{ value: string; label: string; icon: string }>;
};

export type CmsProductOffer = {
  id: string;
  visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  badge: string;
  accent: "blue" | "purple" | "cyan";
  /** Optional display override; empty = use localized pricing engine */
  priceOverride: string;
  priceSuffix: string;
  highlight: string;
  priceLabel: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  searchEnabled: boolean;
  searchPlaceholder: string;
  searchButtonLabel: string;
  iconUrl: string;
  illustrationUrl: string;
};

export type CmsProductsContent = {
  visible: boolean;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  offers: CmsProductOffer[];
};

export type CmsHomeSections = {
  hero: CmsHeroContent;
  products: CmsProductsContent;
  navigation: typeof mainNavigation;
};

export function defaultSiteSettings(): CmsSiteSettings {
  return {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: siteConfig.locale,
    twitterHandle: siteConfig.twitterHandle,
    logoPath: "/logo/hostingbeyond-logo-transparent.png",
    ogImagePath: "/images/hero-speaker.png",
    loginLabel: "Log In",
    getStartedLabel: "Get Started",
    getStartedHref: "/get-started",
    loginHref: "/login",
    contactEmail: "hello@hostingbeyond.com",
    contactPhone: "",
    social: {
      twitter: "https://twitter.com/hostingbeyond",
      linkedin: "",
      facebook: "",
    },
  };
}

function defaultOffers(): CmsProductOffer[] {
  return [
    {
      id: "domain",
      visible: true,
      order: 0,
      title: "Domain Site",
      subtitle: "",
      badge: "Best Value",
      accent: "blue",
      priceOverride: "",
      priceSuffix: "/ 1 Year",
      highlight: "+ Free 2 Business Mail 1 Year",
      priceLabel: "",
      features: [...productOffers[0].features],
      ctaLabel: "Find Your Domain",
      ctaHref: routes.domains,
      searchEnabled: true,
      searchPlaceholder: "Enter your domain name",
      searchButtonLabel: "Search",
      iconUrl: "",
      illustrationUrl: "",
    },
    {
      id: "email",
      visible: true,
      order: 1,
      title: "Business Email",
      subtitle: "Professional Email for Your Business",
      badge: "Professional",
      accent: "purple",
      priceOverride: "",
      priceSuffix: "/ Month",
      highlight: "",
      priceLabel: "Per Mailbox",
      features: [...productOffers[1].features],
      ctaLabel: "Get Business Email",
      ctaHref: routes.businessEmail,
      searchEnabled: false,
      searchPlaceholder: "",
      searchButtonLabel: "Search",
      iconUrl: "",
      illustrationUrl: "",
    },
    {
      id: "hosting",
      visible: true,
      order: 2,
      title: "Web Hosting",
      subtitle: "Blazing-Fast Hosting Plans",
      badge: "Fast & Reliable",
      accent: "cyan",
      priceOverride: "",
      priceSuffix: "/ Per Month",
      highlight: "",
      priceLabel: "Starting Plan",
      features: [...productOffers[2].features],
      ctaLabel: "View Hosting Plans",
      ctaHref: routes.hosting,
      searchEnabled: false,
      searchPlaceholder: "",
      searchButtonLabel: "Search",
      iconUrl: "",
      illustrationUrl: "",
    },
  ];
}

export function defaultHomeSections(): CmsHomeSections {
  return {
    hero: {
      visible: true,
      eyebrow: "",
      headline: "Built for Speed.",
      headlineAccent: "Beyond Limits.",
      description:
        "Premium hosting infrastructure for ambitious ideas and growing businesses.",
      searchPlaceholder: "Find your perfect domain name",
      searchButtonLabel: "SEARCH DOMAIN",
      bulkSearchLabel: "Bulk Search",
      backgroundImage: "/images/hero-speaker.png",
      trustItems: [
        {
          title: "99.99% Uptime",
          subtitle: "Network Guarantee",
          icon: "shield",
        },
        {
          title: "NVMe Performance",
          subtitle: "Ultra-fast storage",
          icon: "lock",
        },
        {
          title: "24/7 Expert Support",
          subtitle: "We're here for you",
          icon: "support",
        },
      ],
      stats: [
        {
          value: "2.7M+",
          label: "Domains Under Management",
          icon: "globe",
        },
        { value: "600+", label: "Domain Extensions", icon: "server" },
        { value: "24/7", label: "Expert Support Always Here", icon: "shield" },
        { value: "10,000+", label: "Businesses Trust Us", icon: "users" },
      ],
    },
    products: {
      visible: true,
      eyebrow: "Everything You Need",
      title: "Power Your Online Success",
      titleAccent: "Everything in One Place",
      description:
        "Get premium domains, professional email, and blazing-fast hosting at unbeatable prices.",
      offers: defaultOffers(),
    },
    navigation: mainNavigation.map((item) => ({
      ...item,
      children: item.children?.map((child) => ({ ...child })),
    })),
  };
}

/** Deep-merge stored CMS JSON onto defaults (backwards-compatible). */
export function mergeHomeSections(
  stored?: Partial<CmsHomeSections> | null,
): CmsHomeSections {
  const defaults = defaultHomeSections();
  if (!stored) return defaults;

  const storedOffers = Array.isArray(stored.products?.offers)
    ? stored.products!.offers
    : [];

  const offers = defaults.products.offers
    .map((fallback) => {
      const match =
        storedOffers.find((item) => item.id === fallback.id) ??
        storedOffers.find(
          (item) =>
            typeof item.title === "string" &&
            item.title.toLowerCase().includes(fallback.id),
        );
      if (!match) return fallback;
      return {
        ...fallback,
        ...match,
        features: Array.isArray(match.features)
          ? match.features.filter(Boolean)
          : fallback.features,
        visible: match.visible ?? true,
        order: typeof match.order === "number" ? match.order : fallback.order,
        accent: match.accent ?? fallback.accent,
        priceOverride:
          typeof match.priceOverride === "string"
            ? match.priceOverride
            : typeof (match as { price?: string }).price === "string" &&
                (match as { price?: string }).price !==
                  "Managed in pricing config"
              ? ((match as { price?: string }).price ?? "")
              : fallback.priceOverride,
      } satisfies CmsProductOffer;
    })
    .sort((a, b) => a.order - b.order);

  // Preserve any extra custom cards from CMS
  for (const extra of storedOffers) {
    if (!offers.some((o) => o.id === extra.id)) {
      offers.push({
        ...defaults.products.offers[0],
        ...extra,
        id: extra.id || `offer-${offers.length}`,
        features: Array.isArray(extra.features) ? extra.features : [],
        visible: extra.visible ?? true,
        order: typeof extra.order === "number" ? extra.order : offers.length,
      });
    }
  }

  const storedHero: Partial<CmsHeroContent> = stored.hero ?? {};
  const legacyHeadline =
    storedHero.headline === "Everything You Need." ||
    storedHero.headline === "Everything You Need" ||
    storedHero.headline === "HOST SMARTER." ||
    storedHero.headline === "Built for Speed." ||
    storedHero.headline?.includes("Built for Speed") ||
    storedHero.headline?.includes("Secured for You") ||
    storedHero.headline?.includes("HOST SMARTER");
  const legacyAccent =
    storedHero.headlineAccent === "Beyond Expectations." ||
    storedHero.headlineAccent === "GROW BEYOND." ||
    storedHero.headlineAccent === "Beyond Limits." ||
    storedHero.headlineAccent?.includes("Beyond Limits") ||
    storedHero.headlineAccent?.includes("GROW BEYOND");
  const hero = {
    ...defaults.hero,
    ...storedHero,
    eyebrow: "",
    headline: defaults.hero.headline,
    headlineAccent: defaults.hero.headlineAccent,
    description:
      legacyHeadline ||
      storedHero.description?.includes("Premium domains, blazing-fast") ||
      storedHero.description?.includes(
        "Premium hosting infrastructure for ambitious",
      ) ||
      storedHero.description?.includes("High-performance hosting")
        ? defaults.hero.description
        : (storedHero.description ?? defaults.hero.description),
    searchPlaceholder: defaults.hero.searchPlaceholder,
    trustItems: storedHero.trustItems ?? defaults.hero.trustItems,
    stats: storedHero.stats ?? defaults.hero.stats,
  };

  const storedNav = stored.navigation;
  const hasCloudNav =
    Array.isArray(storedNav) &&
    storedNav.some(
      (item) =>
        typeof item?.label === "string" &&
        item.label.toLowerCase().includes("cloud"),
    );

  return {
    ...defaults,
    ...stored,
    hero,
    products: {
      ...defaults.products,
      ...stored.products,
      offers: offers.sort((a, b) => a.order - b.order),
    },
    navigation: hasCloudNav ? storedNav! : defaults.navigation,
  };
}
