import Image from "next/image";

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
    sections.hero.backgroundImage === "/images/hero-speaker.png"
      ? "/images/hero-speaker-v2.png"
      : sections.hero.backgroundImage;

  return (
    <div className="overflow-x-hidden bg-[#07122a]">
      <div className="relative flex flex-col lg:h-svh lg:max-h-svh lg:overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#07122a]" />

          {/* Ambient color bleed — blurred photo so edges never look rectangular */}
          <div className="absolute top-[2%] right-[-10%] bottom-[-4%] hidden w-[72%] lg:block">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={60}
              sizes="72vw"
              className="scale-105 object-cover object-[70%_22%] opacity-35 blur-[52px] saturate-125"
            />
          </div>

          {/* Soft stage glows */}
          <div className="absolute top-[10%] right-[2%] h-[65%] w-[50%] rounded-full bg-[radial-gradient(ellipse,rgba(47,107,255,0.18),transparent_68%)] blur-3xl max-lg:hidden" />
          <div className="absolute right-[8%] bottom-[8%] h-[40%] w-[35%] rounded-full bg-[radial-gradient(ellipse,rgba(124,58,237,0.12),transparent_70%)] blur-3xl max-lg:hidden" />

          {/*
            Sharp subject — slight zoom-out so both hands read clearly.
            Soft CSS mask dissolves left/top/bottom into navy (no pasted box).
          */}
          <div className="hb-hero-blend absolute top-[64px] right-[-5%] bottom-[-2%] hidden w-[62%] lg:block xl:w-[58%]">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={95}
              sizes="62vw"
              className="origin-[75%_35%] scale-[0.92] object-cover object-[70%_20%]"
            />
          </div>

          {/* Mobile soft presence only */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              quality={75}
              sizes="100vw"
              className="object-cover object-[78%_18%] opacity-28 blur-[2px]"
            />
            <div className="absolute inset-0 bg-[#07122a]/65" />
          </div>

          {/* Multi-layer navy washes — kill any remaining hard edge */}
          <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-[#07122a] from-[38%] via-[#07122a]/85 via-[62%] to-transparent lg:block" />
          <div className="absolute inset-y-0 left-[40%] hidden w-[22%] bg-gradient-to-r from-[#07122a]/40 to-transparent lg:block" />
          <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#07122a] via-[#07122a]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07122a] via-[#07122a]/80 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-[#07122a]/50 to-transparent max-lg:hidden" />
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
      {sections.hostingTypes?.visible !== false ? (
        <HostingTypesSection content={sections.hostingTypes} />
      ) : null}
      {sections.hostingPlans?.visible !== false ? (
        <HostingPlansSection content={sections.hostingPlans} />
      ) : null}
    </div>
  );
}
