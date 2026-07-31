"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-[4.25rem]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-6 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-24 xl:gap-16">
        <HeroContent />
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
