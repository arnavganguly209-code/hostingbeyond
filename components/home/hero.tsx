"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

/**
 * Premium HostingBeyond hero — full speaker visual, glass UI, no face crop.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[108px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-cols-1 items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:px-8 lg:py-2">
        <HeroContent />
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
