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
      <SiteHeader
        navigation={sections.navigation}
        loginLabel={settings.loginLabel}
        loginHref={settings.loginHref}
        getStartedLabel={settings.getStartedLabel}
        getStartedHref={settings.getStartedHref}
        logoPath={settings.logoPath}
      />
      {sections.hero.visible ? <HeroSection content={sections.hero} /> : null}
      {sections.products.visible ? (
        <ProductsSection content={sections.products} />
      ) : null}
    </div>
  );
}
