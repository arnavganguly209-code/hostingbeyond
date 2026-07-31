/**
 * Application routes — single source of truth for internal navigation.
 */

export const routes = {
  home: "/",
  domains: "/domains",
  hosting: "/hosting",
  businessEmail: "/business-email",
  resources: "/resources",
  getStarted: "/get-started",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
