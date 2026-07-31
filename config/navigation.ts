import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

/** Exact nav from the HostingBeyond hero mockup. */
export const mainNavigation: NavItem[] = [
  { label: "Domains", href: routes.domains },
  { label: "Business Email", href: routes.businessEmail },
  { label: "Hosting", href: routes.hosting, hasDropdown: true },
  { label: "Resources", href: routes.resources, hasDropdown: true },
];
