"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

type HeroSectionProps = {
  content?: CmsHeroContent;
};

/**
 * First-screen hero on desktop; fluid height on mobile so nothing is cropped.
 */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[72px] sm:pt-[80px] lg:h-[100svh] lg:max-h-[980px] lg:min-h-[700px] lg:pt-[88px]">
      <HeroBackground imageSrc={content?.backgroundImage} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 items-center px-4 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
        <div className="w-full max-w-xl min-w-0 lg:max-w-[560px]">
          <HeroContent content={content} />
        </div>
      </div>

      <HeroFeatures stats={content?.stats} />
    </section>
  );
}
