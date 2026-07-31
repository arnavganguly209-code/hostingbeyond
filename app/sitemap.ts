import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(routes).map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === routes.home ? "weekly" : "monthly",
    priority: path === routes.home ? 1 : 0.8,
  }));
}
