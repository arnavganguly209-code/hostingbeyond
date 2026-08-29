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
    <section className="relative isolate flex min-h-[min(880px,92svh)] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[100px] pb-6 sm:pb-8 lg:min-h-[min(820px,88svh)] lg:pb-10">
      <HeroBackground imageSrc={content?.backgroundImage} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 items-center px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="w-full max-w-xl lg:max-w-[580px]">
          <HeroContent content={content} />
        </div>
      </div>

      <HeroFeatures stats={content?.stats} />
    </section>
  );
}
