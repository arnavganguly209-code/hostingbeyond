import Image from "next/image";

import { SiteHeader } from "@/components/layout";
import { HeroSection, ProductsSection } from "@/components/home";
import { getHomeSections, getSiteSettings } from "@/lib/orbit/content";

export default async function HomePage() {
  const [sections, settings] = await Promise.all([
    getHomeSections(),
    getSiteSettings(),
  ]);

  const heroImage =
    !sections.hero.backgroundImage ||
    sections.hero.backgroundImage === "/images/hero-speaker.png"
      ? "/images/hero-speaker-v2.png"
      : sections.hero.backgroundImage;

  return (
    <div className="overflow-x-hidden bg-[#0a1630]">
      <div className="relative flex flex-col lg:h-svh lg:max-h-svh lg:overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#0a1630]" />
          <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={92}
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="object-cover object-[72%_16%] opacity-80 lg:opacity-95"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1630] via-[#0a1630]/92 to-[#0a1630]/20 lg:via-[#0a1630]/72 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1630] via-transparent to-[#0a1630]/45" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a1630] to-transparent" />
        </div>

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
