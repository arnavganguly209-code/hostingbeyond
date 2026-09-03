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

export type CmsDomainTld = {
  tld: string;
  priceLabel: string;
  visible: boolean;
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
  /** Editable domain TLD price teasers shown in hero search */
  domainPricing?: CmsDomainTld[];
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

export type CmsHostingPlan = {
  id: string;
  visible: boolean;
  order: number;
  name: string;
  discountBadge: string;
  popular: boolean;
  popularLabel: string;
  accent: "blue" | "purple" | "gradient";
  /** Per-month price when Annually is selected */
  priceAnnually: string;
  /** Strikethrough when Annually is selected */
  originalAnnually: string;
  billedAnnually: string;
  /** Per-month price when Monthly is selected */
  priceMonthly: string;
  originalMonthly: string;
  billedMonthly: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type CmsHostingGuarantee = {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "lock" | "rocket";
};

export type CmsHostingPlansContent = {
  visible: boolean;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  supportLabel: string;
  activationLabel: string;
  annualToggleLabel: string;
  monthlyToggleLabel: string;
  defaultBilling: "annually" | "monthly";
  plans: CmsHostingPlan[];
  guarantees: CmsHostingGuarantee[];
};

export type CmsHomeSections = {
  hero: CmsHeroContent;
  products: CmsProductsContent;
  hostingPlans: CmsHostingPlansContent;
  navigation: typeof mainNavigation;
};

export type CmsLoginOAuthButton = {
  visible: boolean;
  label: string;
  href: string;
};

export type CmsLoginFeature = {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "zap" | "headphones" | "lock";
};

export type CmsLoginPage = {
  logoPath: string;
  tagline: string;
  copyright: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  features: CmsLoginFeature[];
  cardTitle: string;
  cardSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  rememberLabel: string;
  forgotLabel: string;
  forgotHref: string;
  loginCtaLabel: string;
  signupPrompt: string;
  signupLabel: string;
  signupHref: string;
  dividerLabel: string;
  google: CmsLoginOAuthButton;
  github: CmsLoginOAuthButton;
  backgroundImage: string;
};

export function defaultLoginPage(): CmsLoginPage {
  return {
    logoPath: "/logo/hostingbeyond-logo-transparent.png",
    tagline: "— BEYOND HOSTING, BEYOND POSSIBILITIES —",
    copyright: "© 2025 HostingBeyond. All rights reserved.",
    badge: "Everything You Need, All in One Place",
    headline: "Power Your Online Success with",
    headlineAccent: "HostingBeyond",
    description:
      "Premium hosting solutions, powerful tools, and 24/7 support to help your business grow online with confidence.",
    features: [
      {
        id: "secure",
        title: "Secure & Reliable",
        description: "Enterprise-grade security for your peace of mind.",
        icon: "shield",
      },
      {
        id: "performance",
        title: "High Performance",
        description: "Lightning-fast servers for optimal performance.",
        icon: "zap",
      },
      {
        id: "support",
        title: "24/7 Support",
        description: "Expert support whenever you need us.",
        icon: "headphones",
      },
      {
        id: "uptime",
        title: "99.99% Uptime",
        description: "Guaranteed uptime for your business reliability.",
        icon: "lock",
      },
    ],
    cardTitle: "Welcome Back",
    cardSubtitle:
      "Login to your account and continue managing your hosting services.",
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    rememberLabel: "Remember me",
    forgotLabel: "Forgot password?",
    forgotHref: "/forgot-password",
    loginCtaLabel: "Login",
    signupPrompt: "Don't have an account?",
    signupLabel: "Sign up",
    signupHref: "/get-started",
    dividerLabel: "OR",
    google: {
      visible: true,
      label: "Continue with Google",
      href: "#",
    },
    github: {
      visible: true,
      label: "Continue with GitHub",
      href: "#",
    },
    backgroundImage: "/images/login-bg.jpg",
  };
}

export function mergeLoginPage(
  stored?: Partial<CmsLoginPage> | null,
): CmsLoginPage {
  const defaults = defaultLoginPage();
  if (!stored) return defaults;

  const storedFeatures = Array.isArray(stored.features) ? stored.features : [];
  const features: CmsLoginFeature[] =
    storedFeatures.length > 0
      ? storedFeatures.map((item, index) => {
          const fallback = defaults.features[index % defaults.features.length];
          const icon: CmsLoginFeature["icon"] =
            item.icon === "zap" ||
            item.icon === "headphones" ||
            item.icon === "lock"
              ? item.icon
              : "shield";
          return {
            ...fallback,
            ...item,
            id: item.id || `feature-${index}`,
            icon,
          };
        })
      : defaults.features;

  return {
    ...defaults,
    ...stored,
    features,
    backgroundImage: stored.backgroundImage || defaults.backgroundImage,
    google: {
      ...defaults.google,
      ...stored.google,
      visible: stored.google?.visible ?? defaults.google.visible,
    },
    github: {
      ...defaults.github,
      ...stored.github,
      visible: stored.github?.visible ?? defaults.github.visible,
    },
  };
}

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

function defaultHostingPlans(): CmsHostingPlan[] {
  return [
    {
      id: "essential",
      visible: true,
      order: 0,
      name: "Web Essential",
      discountBadge: "50% OFF",
      popular: false,
      popularLabel: "",
      accent: "blue",
      priceAnnually: "$5.00",
      originalAnnually: "$10.00",
      billedAnnually: "Billed $60.00 Annually",
      priceMonthly: "$10.00",
      originalMonthly: "",
      billedMonthly: "Billed monthly",
      features: [
        "1 Website",
        "10 GB SSD Storage",
        "Unmetered Bandwidth",
        "2 GB RAM",
        "1 Email Account",
        "Free SSL Certificate",
        "24/7 Support",
      ],
      ctaLabel: "Get Started",
      ctaHref: routes.getStarted,
    },
    {
      id: "plus",
      visible: true,
      order: 1,
      name: "Web Plus",
      discountBadge: "50% OFF",
      popular: false,
      popularLabel: "",
      accent: "blue",
      priceAnnually: "$10.00",
      originalAnnually: "$20.00",
      billedAnnually: "Billed $120.00 Annually",
      priceMonthly: "$20.00",
      originalMonthly: "",
      billedMonthly: "Billed monthly",
      features: [
        "5 Websites",
        "20 GB SSD Storage",
        "Unmetered Bandwidth",
        "4 GB RAM",
        "10 Email Accounts",
        "Free SSL Certificate",
        "24/7 Support",
      ],
      ctaLabel: "Get Started",
      ctaHref: routes.getStarted,
    },
    {
      id: "pro",
      visible: true,
      order: 2,
      name: "Web Pro",
      discountBadge: "50% OFF",
      popular: true,
      popularLabel: "Most Popular",
      accent: "gradient",
      priceAnnually: "$15.00",
      originalAnnually: "$30.00",
      billedAnnually: "Billed $180.00 Annually",
      priceMonthly: "$30.00",
      originalMonthly: "",
      billedMonthly: "Billed monthly",
      features: [
        "Unlimited Websites",
        "40 GB SSD Storage",
        "Unmetered Bandwidth",
        "6 GB RAM",
        "Unlimited Email Accounts",
        "Free SSL Certificate",
        "Priority Support",
      ],
      ctaLabel: "Get Started",
      ctaHref: routes.getStarted,
    },
    {
      id: "ultimate",
      visible: true,
      order: 3,
      name: "Web Ultimate",
      discountBadge: "50% OFF",
      popular: false,
      popularLabel: "",
      accent: "purple",
      priceAnnually: "$20.00",
      originalAnnually: "$40.00",
      billedAnnually: "Billed $240.00 Annually",
      priceMonthly: "$40.00",
      originalMonthly: "",
      billedMonthly: "Billed monthly",
      features: [
        "Unlimited Websites",
        "60 GB SSD Storage",
        "Unmetered Bandwidth",
        "8 GB RAM",
        "Unlimited Email Accounts",
        "Free SSL Certificate",
        "Priority Support",
      ],
      ctaLabel: "Get Started",
      ctaHref: routes.getStarted,
    },
  ];
}

function defaultHostingPlansSection(): CmsHostingPlansContent {
  return {
    visible: true,
    eyebrow: "Web Hosting Plans",
    title: "Web Hosting",
    titleAccent: "Plans & Price",
    description:
      "Compare our affordable web hosting price in Nepal and choose the perfect hosting plan for your website.",
    supportLabel: "24/7 Local Support",
    activationLabel: "Instant Activation",
    annualToggleLabel: "Annually (Save 50%)",
    monthlyToggleLabel: "Monthly",
    defaultBilling: "annually",
    plans: defaultHostingPlans(),
    guarantees: [
      {
        id: "moneyback",
        title: "30-Day Money-Back Guarantee",
        description:
          "Try risk-free. If you're not satisfied, get a full refund within 30 days.",
        icon: "shield",
      },
      {
        id: "secure",
        title: "Secure & Reliable Infrastructure",
        description:
          "Enterprise-grade security and daily backups keep your sites protected.",
        icon: "lock",
      },
      {
        id: "uptime",
        title: "99.99% Uptime Guarantee",
        description:
          "High-availability network designed for always-on performance.",
        icon: "rocket",
      },
    ],
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
      domainPricing: [
        { tld: ".com", priceLabel: "$7.99/yr", visible: true },
        { tld: ".net", priceLabel: "$6.99/yr", visible: true },
        { tld: ".org", priceLabel: "$5.99/yr", visible: true },
        { tld: ".co", priceLabel: "$4.99/yr", visible: true },
        { tld: ".dev", priceLabel: "$3.99/yr", visible: true },
      ],
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
    hostingPlans: defaultHostingPlansSection(),
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

  const storedPlans = Array.isArray(stored.hostingPlans?.plans)
    ? stored.hostingPlans!.plans
    : [];

  const plans = defaults.hostingPlans.plans
    .map((fallback) => {
      const match = storedPlans.find((item) => item.id === fallback.id);
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
        popular: Boolean(match.popular),
      } satisfies CmsHostingPlan;
    })
    .sort((a, b) => a.order - b.order);

  for (const extra of storedPlans) {
    if (!plans.some((p) => p.id === extra.id)) {
      plans.push({
        ...defaults.hostingPlans.plans[0],
        ...extra,
        id: extra.id || `plan-${plans.length}`,
        features: Array.isArray(extra.features) ? extra.features : [],
        visible: extra.visible ?? true,
        order: typeof extra.order === "number" ? extra.order : plans.length,
      });
    }
  }

  const storedGuarantees = Array.isArray(stored.hostingPlans?.guarantees)
    ? stored.hostingPlans!.guarantees
    : [];

  const guarantees: CmsHostingGuarantee[] =
    storedGuarantees.length > 0
      ? storedGuarantees.map((item, index) => {
          const fallback =
            defaults.hostingPlans.guarantees[
              index % defaults.hostingPlans.guarantees.length
            ];
          const icon: CmsHostingGuarantee["icon"] =
            item.icon === "lock" || item.icon === "rocket"
              ? item.icon
              : "shield";
          return {
            ...fallback,
            ...item,
            id: item.id || `guarantee-${index}`,
            icon,
          };
        })
      : defaults.hostingPlans.guarantees;

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
    domainPricing: storedHero.domainPricing ?? defaults.hero.domainPricing,
  };

  const storedNav = stored.navigation;
  const hasLegacyCloudTopNav =
    Array.isArray(storedNav) &&
    storedNav.some(
      (item) =>
        typeof item?.label === "string" &&
        (item.label === "Cloud & VPS" ||
          /^cloud\s*&\s*vps$/i.test(item.label.trim())),
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
    hostingPlans: {
      ...defaults.hostingPlans,
      ...stored.hostingPlans,
      defaultBilling:
        stored.hostingPlans?.defaultBilling === "monthly"
          ? "monthly"
          : "annually",
      plans: plans.sort((a, b) => a.order - b.order),
      guarantees,
    },
    // Drop legacy top-level Cloud & VPS — those live under Hosting now.
    // Also normalize stored "Web Hosting" label → "Hosting".
    navigation: (() => {
      if (hasLegacyCloudTopNav || !Array.isArray(storedNav)) {
        return defaults.navigation;
      }
      return storedNav.map((item) =>
        item.label === "Web Hosting" ? { ...item, label: "Hosting" } : item,
      );
    })(),
  };
}
