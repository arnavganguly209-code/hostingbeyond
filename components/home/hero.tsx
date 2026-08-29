"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

type HeroSectionProps = {
  content?: CmsHeroContent;
};

/**
 * Strict one-viewport hero: copy + stats bar fully visible without scrolling.
 */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative isolate flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[68px] sm:pt-[76px] lg:pt-[80px]">
      <HeroBackground imageSrc={content?.backgroundImage} />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1280px] flex-1 items-center px-4 py-1 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl min-w-0 lg:max-w-[540px]">
          <HeroContent content={content} />
        </div>
      </div>

      <div className="relative z-20 shrink-0">
        <HeroFeatures stats={content?.stats} />
      </div>
    </section>
  );
}
