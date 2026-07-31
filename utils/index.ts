/**
 * Pure utility helpers (non-React).
 */

export function absoluteUrl(path: string, baseUrl: string): string {
  return new URL(path, baseUrl).toString();
}

export function isServer(): boolean {
  return typeof window === "undefined";
}
