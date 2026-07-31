"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

/**
 * Single-viewport hero — clear speaker face, coding offers on the right.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#050814] pt-[100px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-cols-1 items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:px-8 lg:py-2">
        <HeroContent />
        <div className="hidden h-full lg:block">
          <HeroShowcase />
        </div>
      </div>

      {/* Mobile coding offers — below content, not over face */}
      <div className="relative z-20 shrink-0 px-4 pb-2 lg:hidden">
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
