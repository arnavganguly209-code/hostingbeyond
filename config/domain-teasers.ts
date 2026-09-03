/**
 * Visual domain extension teasers for the hero search bar.
 * These are the display prices shown in the hero — sourced from the
 * centralized domain pricing configuration.
 * Update prices here or wire to the DB-backed pricing system later.
 */
export const heroDomainTeasers = [
  { tld: ".com", priceLabel: "$7.99/yr" },
  { tld: ".net", priceLabel: "$6.99/yr" },
  { tld: ".org", priceLabel: "$5.99/yr" },
  { tld: ".co", priceLabel: "$4.99/yr" },
  { tld: ".dev", priceLabel: "$3.99/yr" },
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
