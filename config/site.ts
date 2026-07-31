/**
 * Site-wide configuration for HostingBeyond.
 * Brand assets and design tokens will be applied in a later phase.
 */

export const siteConfig = {
  name: "HostingBeyond",
  tagline: "Beyond Hosting, Beyond Possibilities",
  description:
    "Premium domains, blazing-fast hosting, and secure business email.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "en_US",
  twitterHandle: "@hostingbeyond",
} as const;

export type SiteConfig = typeof siteConfig;
