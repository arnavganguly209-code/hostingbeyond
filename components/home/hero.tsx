"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

/**
 * Premium HostingBeyond hero — official logo, speaker background, glass UI.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[108px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-cols-1 items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:py-2">
        <HeroContent />
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
