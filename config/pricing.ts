/**
 * Centralized commercial pricing — base amounts by product + currency.
 * These are commercial list prices (not live FX conversion).
 */

export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "NPR"
  | "JPY"
  | "AUD"
  | "CAD"
  | "AED"
  | "SGD"
  | "MYR"
  | "THB"
  | "IDR"
  | "PHP"
  | "KRW"
  | "BRL"
  | "MXN"
  | "ZAR"
  | "CHF"
  | "SEK"
  | "NOK"
  | "DKK"
  | "PLN"
  | "TRY"
  | "SAR"
  | "HKD"
  | "NZD"
  | "PKR"
  | "BDT"
  | "LKR"
  | "VND";

export type ProductPriceId =
  "domain_yearly" | "email_monthly" | "hosting_monthly";

export type PriceBook = Record<ProductPriceId, number>;

/** Base commercial book in USD */
export const basePriceBookUsd: PriceBook = {
  domain_yearly: 15,
  email_monthly: 0.42,
  hosting_monthly: 1,
};

/**
 * Localized commercial prices by currency.
 * Missing currencies fall back to USD book with USD formatting.
 */
export const priceBooksByCurrency: Partial<Record<CurrencyCode, PriceBook>> = {
  USD: basePriceBookUsd,
  EUR: { domain_yearly: 14, email_monthly: 0.39, hosting_monthly: 0.95 },
  GBP: { domain_yearly: 12, email_monthly: 0.35, hosting_monthly: 0.85 },
  INR: { domain_yearly: 1249, email_monthly: 35, hosting_monthly: 89 },
  NPR: { domain_yearly: 2099, email_monthly: 59, hosting_monthly: 149 },
  JPY: { domain_yearly: 2300, email_monthly: 65, hosting_monthly: 150 },
  AUD: { domain_yearly: 23, email_monthly: 0.65, hosting_monthly: 1.55 },
  CAD: { domain_yearly: 21, email_monthly: 0.59, hosting_monthly: 1.39 },
  AED: { domain_yearly: 55, email_monthly: 1.55, hosting_monthly: 3.7 },
  SGD: { domain_yearly: 20, email_monthly: 0.55, hosting_monthly: 1.35 },
  MYR: { domain_yearly: 69, email_monthly: 1.9, hosting_monthly: 4.5 },
  THB: { domain_yearly: 520, email_monthly: 15, hosting_monthly: 35 },
  IDR: { domain_yearly: 245000, email_monthly: 6900, hosting_monthly: 16500 },
  PHP: { domain_yearly: 850, email_monthly: 24, hosting_monthly: 58 },
  KRW: { domain_yearly: 19900, email_monthly: 550, hosting_monthly: 1350 },
  BRL: { domain_yearly: 79, email_monthly: 2.2, hosting_monthly: 5.5 },
  MXN: { domain_yearly: 269, email_monthly: 7.5, hosting_monthly: 18 },
  ZAR: { domain_yearly: 269, email_monthly: 7.5, hosting_monthly: 18 },
  CHF: { domain_yearly: 14, email_monthly: 0.39, hosting_monthly: 0.95 },
  SEK: { domain_yearly: 159, email_monthly: 4.5, hosting_monthly: 11 },
  NOK: { domain_yearly: 159, email_monthly: 4.5, hosting_monthly: 11 },
  DKK: { domain_yearly: 105, email_monthly: 2.9, hosting_monthly: 7 },
  PLN: { domain_yearly: 59, email_monthly: 1.7, hosting_monthly: 4 },
  TRY: { domain_yearly: 499, email_monthly: 14, hosting_monthly: 35 },
  SAR: { domain_yearly: 56, email_monthly: 1.55, hosting_monthly: 3.75 },
  HKD: { domain_yearly: 118, email_monthly: 3.3, hosting_monthly: 7.9 },
  NZD: { domain_yearly: 25, email_monthly: 0.7, hosting_monthly: 1.7 },
  PKR: { domain_yearly: 4199, email_monthly: 119, hosting_monthly: 289 },
  BDT: { domain_yearly: 1799, email_monthly: 49, hosting_monthly: 119 },
  LKR: { domain_yearly: 4599, email_monthly: 129, hosting_monthly: 309 },
  VND: { domain_yearly: 379000, email_monthly: 10500, hosting_monthly: 25500 },
};

export const productPriceMeta: Record<
  ProductPriceId,
  { periodKey: "perYear" | "perMonth"; productKey: string }
> = {
  domain_yearly: { periodKey: "perYear", productKey: "domain" },
  email_monthly: { periodKey: "perMonth", productKey: "email" },
  hosting_monthly: { periodKey: "perMonth", productKey: "hosting" },
};

export function getPriceBook(currency: CurrencyCode): PriceBook {
  return priceBooksByCurrency[currency] ?? basePriceBookUsd;
}

export function getProductPrice(
  productId: ProductPriceId,
  currency: CurrencyCode,
): number {
  return getPriceBook(currency)[productId];
}

export function formatMoney(
  amount: number,
  currency: CurrencyCode,
  locale: string,
): string {
  try {
    const fractionDigits = ["JPY", "KRW", "VND", "IDR"].includes(currency)
      ? 0
      : amount % 1 === 0
        ? 0
        : 2;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}
