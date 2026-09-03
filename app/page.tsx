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
    <div className="overflow-x-hidden bg-[#07122a]">
      <div className="relative flex flex-col lg:h-svh lg:max-h-svh lg:overflow-hidden">
        {/* Atmospheric backdrop — soft blend, no pasted rectangle */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#07122a]" />

          {/* Soft blue stage glow behind subject */}
          <div className="absolute top-[12%] right-[4%] h-[70%] w-[48%] rounded-full bg-[radial-gradient(ellipse,rgba(47,107,255,0.22),transparent_70%)] blur-3xl max-lg:hidden" />
          <div className="absolute right-[10%] bottom-[10%] h-[40%] w-[35%] rounded-full bg-[radial-gradient(ellipse,rgba(124,58,237,0.14),transparent_70%)] blur-3xl max-lg:hidden" />

          {/* Desktop subject — masked so left edge dissolves into navy */}
          <div className="hb-hero-subject absolute inset-y-0 right-0 hidden w-[62%] lg:block">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={93}
              sizes="62vw"
              className="object-cover object-[68%_18%]"
            />
          </div>

          {/* Mobile soft presence */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={80}
              sizes="100vw"
              className="object-cover object-[75%_15%] opacity-35"
            />
            <div className="absolute inset-0 bg-[#07122a]/55" />
          </div>

          {/* Left readability wash — soft, not a hard cut */}
          <div className="absolute inset-y-0 left-0 hidden w-[48%] bg-gradient-to-r from-[#07122a] from-40% via-[#07122a]/75 to-transparent lg:block" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07122a]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07122a] via-[#07122a]/70 to-transparent" />
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
