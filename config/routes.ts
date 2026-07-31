/**
 * Application routes — single source of truth for internal navigation.
 */

export const routes = {
  home: "/",
  domains: "/domains",
  businessEmail: "/business-email",
  hosting: "/hosting",
  vps: "/vps",
  cloud: "/cloud",
  pricing: "/pricing",
  resources: "/resources",
  about: "/about",
  contact: "/contact",
  login: "/login",
  getStarted: "/get-started",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
