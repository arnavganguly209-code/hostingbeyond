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
          {/* Zoomed-out speaker — object-contain so head/body are not cropped */}
          <div className="absolute top-[6%] right-[-2%] bottom-[8%] w-[58%] max-lg:hidden">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={92}
              sizes="58vw"
              className="object-contain object-bottom object-right"
            />
          </div>
          <div className="absolute inset-0 lg:hidden">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-contain object-[80%_20%] opacity-45"
            />
          </div>
          <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-[#0a1630] via-[#0a1630]/88 to-transparent max-lg:w-full max-lg:via-[#0a1630]/70" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a1630]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a1630] to-transparent" />
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
