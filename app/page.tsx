import { SiteHeader } from "@/components/layout";
import { HeroSection, ProductsSection } from "@/components/home";
import { getHomeSections, getSiteSettings } from "@/lib/orbit/content";

export default async function HomePage() {
  const [sections, settings] = await Promise.all([
    getHomeSections(),
    getSiteSettings(),
  ]);

  return (
    <div className="overflow-x-hidden bg-[var(--hb-bg)]">
      {/*
        Desktop first viewport is locked to 100svh so header + hero +
        domain search are always visible without scrolling.
      */}
      <div className="flex flex-col lg:h-svh lg:max-h-svh lg:overflow-hidden">
        <SiteHeader
          navigation={sections.navigation}
          loginLabel={settings.loginLabel}
          loginHref={settings.loginHref}
          getStartedLabel={settings.getStartedLabel}
          getStartedHref={settings.getStartedHref}
          logoPath={settings.logoPath}
        />
        {sections.hero.visible ? <HeroSection content={sections.hero} /> : null}
      </div>
      {sections.products.visible ? (
        <ProductsSection content={sections.products} />
      ) : null}
    </div>
  );
}
