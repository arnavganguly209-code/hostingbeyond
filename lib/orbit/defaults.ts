import { mainNavigation } from "@/config/navigation";
import { productOffers, productsTrustItems } from "@/config/products";
import { siteConfig } from "@/config/site";

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
  headline: string;
  headlineAccent: string;
  description: string;
  searchPlaceholder: string;
  bulkSearchLabel: string;
  backgroundImage: string;
  trustItems: Array<{ title: string; subtitle: string; icon: string }>;
  stats: Array<{ value: string; label: string; icon: string }>;
};

export type CmsProductsContent = {
  visible: boolean;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  offers: Array<{
    id: string;
    title: string;
    subtitle?: string;
    badge: string;
    accent: "blue" | "purple" | "cyan";
    price: string;
    priceSuffix: string;
    highlight?: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    searchEnabled?: boolean;
  }>;
  trustItems: Array<{ title: string; subtitle: string; icon: string }>;
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
    loginLabel: "Login",
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

export function defaultHomeSections(): CmsHomeSections {
  return {
    hero: {
      visible: true,
      headline: "Everything You Need.",
      headlineAccent: "Beyond Expectations.",
      description:
        "Premium domains, blazing-fast hosting, and secure business email — everything you need to build, grow, and succeed online.",
      searchPlaceholder: "Find your perfect domain",
      bulkSearchLabel: "Bulk Search",
      backgroundImage: "/images/hero-speaker.png",
      trustItems: [
        {
          title: "99.99% Uptime",
          subtitle: "Network Guarantee",
          icon: "shield",
        },
        {
          title: "Secure & Trusted",
          subtitle: "Your data is safe",
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
        "Get premium domains, professional email, and blazing-fast hosting at unbeatable prices. Simple, secure, and built for your growth.",
      offers: productOffers.map((offer) => ({
        id: offer.id,
        title: offer.title,
        subtitle: "subtitle" in offer ? offer.subtitle : undefined,
        badge: offer.badge,
        accent: offer.accent,
        // Display hints for Orbit CMS — live site uses config/pricing.ts
        price: "Managed in pricing config",
        priceSuffix:
          offer.priceSuffixKey === "perYear" ? "/ 1 Year" : "/ Month",
        highlight:
          offer.highlightKey === "domainHighlight"
            ? "+ Free 2 Business Mail 1 Year"
            : offer.highlightKey === "perMailbox"
              ? "Per Mailbox"
              : offer.highlightKey === "startingPlan"
                ? "Starting Plan"
                : undefined,
        features: [...offer.features],
        ctaLabel: offer.ctaLabel,
        ctaHref: offer.ctaHref,
        searchEnabled: "searchEnabled" in offer ? offer.searchEnabled : false,
      })),
      trustItems: productsTrustItems.map((item) => ({ ...item })),
    },
    navigation: mainNavigation.map((item) => ({
      ...item,
      children: item.children?.map((child) => ({ ...child })),
    })),
  };
}
