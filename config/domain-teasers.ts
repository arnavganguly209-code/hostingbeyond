/**
 * Visual domain extension teasers for the hero search bar.
 * Display-only placeholders — replace via pricing config / CMS later.
 */
export const heroDomainTeasers = [
  { tld: ".com", priceLabel: "$6.99/yr" },
  { tld: ".net", priceLabel: "$7.99/yr" },
  { tld: ".org", priceLabel: "$6.99/yr" },
  { tld: ".co", priceLabel: "$5.99/yr" },
  { tld: ".dev", priceLabel: "$9.99/yr" },
] as const;

export const heroTldOptions = [
  ".com",
  ".net",
  ".org",
  ".co",
  ".dev",
  ".io",
  ".ai",
] as const;
