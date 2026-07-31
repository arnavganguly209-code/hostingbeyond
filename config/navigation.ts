import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNavigation: NavItem[] = [
  { label: "Domains", href: routes.domains },
  { label: "Business Email", href: routes.businessEmail },
  { label: "Hosting", href: routes.hosting },
  { label: "VPS", href: routes.vps },
  { label: "Cloud", href: routes.cloud },
  { label: "Pricing", href: routes.pricing },
  { label: "Resources", href: routes.resources },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];
