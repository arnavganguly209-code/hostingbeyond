"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

type HeroSectionProps = {
  content?: CmsHeroContent;
};

/**
 * Full first-screen hero: copy + trust chips + stats bar fit in one viewport
 * without scrolling on typical desktop/laptop heights.
 */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[980px] min-h-[640px] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[72px] sm:pt-[80px] lg:pt-[88px]">
      <HeroBackground imageSrc={content?.backgroundImage} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
        <div className="w-full max-w-xl lg:max-w-[560px]">
          <HeroContent content={content} />
        </div>
      </div>

      <HeroFeatures stats={content?.stats} />
    </section>
  );
}
