/**
 * Visual domain extension teasers for the hero search bar.
 * These are the display prices shown in the hero — sourced from the
 * centralized domain pricing configuration.
 * Update prices here or wire to the DB-backed pricing system later.
 */
export const heroDomainTeasers = [
  { tld: ".com", priceLabel: "$9.99" },
  { tld: ".net", priceLabel: "$11.99" },
  { tld: ".org", priceLabel: "$9.99" },
  { tld: ".dev", priceLabel: "$14.99" },
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
