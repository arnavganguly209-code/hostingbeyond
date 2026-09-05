import { SiteHeader } from "@/components/layout";
import {
  HeroSection,
  HostingPlansSection,
  HostingTypesSection,
  ProductsSection,
} from "@/components/home";
import { getHomeSections, getSiteSettings } from "@/lib/orbit/content";

export default async function HomePage() {
  const [sections, settings] = await Promise.all([
    getHomeSections(),
    getSiteSettings(),
  ]);

  const heroImage =
    !sections.hero.backgroundImage ||
    sections.hero.backgroundImage === "/images/hero-speaker.png" ||
    sections.hero.backgroundImage === "/images/hero-speaker-v2.png"
      ? "/images/hero-speaker-light.png"
      : sections.hero.backgroundImage;

  return (
    <div className="overflow-x-hidden bg-[#07122a]">
      {/* Light glass hero — fits first viewport, no scroll needed */}
      <div className="relative flex flex-col overflow-hidden bg-[#f4f7fc] lg:h-svh lg:max-h-svh">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_20%,rgba(147,197,253,0.35),transparent_55%),radial-gradient(ellipse_at_82%_18%,rgba(196,181,253,0.32),transparent_50%),radial-gradient(ellipse_at_70%_75%,rgba(125,211,252,0.22),transparent_55%),linear-gradient(180deg,#eef3fb_0%,#f7f9fd_48%,#ffffff_100%)]" />
          <div className="absolute top-[-12%] right-[-8%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.14),transparent_68%)] blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[45%] w-[40%] rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.12),transparent_70%)] blur-3xl" />
        </div>

        <SiteHeader
          navigation={sections.navigation}
          loginLabel={settings.loginLabel}
          loginHref={settings.loginHref}
          getStartedLabel={settings.getStartedLabel}
          getStartedHref={settings.getStartedHref}
          logoPath={settings.logoPath}
        />
        {sections.hero.visible ? (
          <HeroSection content={sections.hero} speakerSrc={heroImage} />
        ) : null}
      </div>

      {sections.products.visible ? (
        <ProductsSection content={sections.products} />
      ) : null}
      {sections.hostingTypes?.visible !== false ? (
        <HostingTypesSection content={sections.hostingTypes} />
      ) : null}
      {sections.hostingPlans?.visible !== false ? (
        <HostingPlansSection content={sections.hostingPlans} />
      ) : null}
    </div>
  );
}
