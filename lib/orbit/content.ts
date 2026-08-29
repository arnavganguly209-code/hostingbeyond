import { prisma } from "@/lib/prisma";
import {
  defaultHomeSections,
  defaultSiteSettings,
  type CmsHomeSections,
  type CmsSiteSettings,
} from "@/lib/orbit/defaults";

export async function getSiteSettings(): Promise<CmsSiteSettings> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!row) return defaultSiteSettings();
    return { ...defaultSiteSettings(), ...(row.data as CmsSiteSettings) };
  } catch {
    return defaultSiteSettings();
  }
}

export async function saveSiteSettings(data: CmsSiteSettings) {
  return prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", data },
    update: { data },
  });
}

export async function getHomeSections(): Promise<CmsHomeSections> {
  try {
    const page = await prisma.pageContent.findUnique({
      where: { slug: "home" },
    });
    if (!page) return defaultHomeSections();
    return {
      ...defaultHomeSections(),
      ...(page.sections as CmsHomeSections),
    };
  } catch {
    return defaultHomeSections();
  }
}

export async function saveHomeSections(sections: CmsHomeSections) {
  return prisma.pageContent.upsert({
    where: { slug: "home" },
    create: {
      slug: "home",
      title: "Home",
      isPublished: true,
      isVisible: true,
      sections,
      seo: {
        title: "HostingBeyond — Beyond Hosting, Beyond Possibilities",
        description: defaultSiteSettings().description,
      },
    },
    update: { sections },
  });
}

export async function listPages() {
  try {
    const pages = await prisma.pageContent.findMany({
      orderBy: { updatedAt: "desc" },
    });
    if (pages.length) return pages;
  } catch {
    /* fall through */
  }

  const defaults = defaultHomeSections();
  return [
    {
      id: "home-fallback",
      slug: "home",
      title: "Home",
      isPublished: true,
      isVisible: true,
      seo: null,
      sections: defaults,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ];
}

export async function ensureHomeSeeded() {
  try {
    const existing = await prisma.pageContent.findUnique({
      where: { slug: "home" },
    });
    if (!existing) {
      await saveHomeSections(defaultHomeSections());
    }
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      await saveSiteSettings(defaultSiteSettings());
    }
  } catch {
    /* DB may be unavailable during local UI work */
  }
}
