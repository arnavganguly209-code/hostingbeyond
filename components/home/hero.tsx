"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import type { CmsHeroContent } from "@/lib/orbit/defaults";

type HeroSectionProps = {
  content?: CmsHeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[100px]">
      <HeroBackground imageSrc={content?.backgroundImage} />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1280px] flex-1 items-center px-4 py-4 sm:px-6 lg:px-8 lg:py-3">
        <div className="w-full max-w-xl lg:max-w-[560px]">
          <HeroContent content={content} />
        </div>
      </div>

      <HeroFeatures stats={content?.stats} />
    </section>
  );
}
