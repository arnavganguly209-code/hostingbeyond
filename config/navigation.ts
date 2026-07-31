import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

/** Matches the official hero mockup navigation. */
export const mainNavigation: NavItem[] = [
  { label: "Domains", href: routes.domains, hasDropdown: true },
  { label: "Business Email", href: routes.businessEmail },
  { label: "Hosting", href: routes.hosting, hasDropdown: true },
  { label: "Resources", href: routes.resources, hasDropdown: true },
];
