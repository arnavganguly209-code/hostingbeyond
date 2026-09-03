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
          <div className="absolute top-[18%] right-[6%] h-[60%] w-[42%] rounded-full bg-[radial-gradient(ellipse,rgba(47,107,255,0.2),transparent_70%)] blur-3xl max-lg:hidden" />
          <div className="absolute right-[12%] bottom-[12%] h-[36%] w-[30%] rounded-full bg-[radial-gradient(ellipse,rgba(124,58,237,0.12),transparent_70%)] blur-3xl max-lg:hidden" />

          {/*
            Desktop subject: starts BELOW header so cap/head never crops.
            object-contain + slight scale-down = ~20% less zoom, full head visible.
          */}
          <div className="hb-hero-subject absolute top-[92px] right-0 bottom-[6%] hidden w-[56%] lg:block xl:w-[54%]">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={93}
              sizes="56vw"
              className="scale-[0.92] object-contain object-bottom object-right"
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
              className="object-contain object-[85%_30%] opacity-30"
            />
            <div className="absolute inset-0 bg-[#07122a]/60" />
          </div>

          {/* Left readability wash — soft dissolve into navy */}
          <div className="absolute inset-y-0 left-0 hidden w-[50%] bg-gradient-to-r from-[#07122a] from-45% via-[#07122a]/80 to-transparent lg:block" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07122a]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07122a] via-[#07122a]/75 to-transparent" />
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
