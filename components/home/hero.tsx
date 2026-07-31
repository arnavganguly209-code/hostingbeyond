"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#020617] pt-[132px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-10 px-5 pt-14 pb-4 sm:pt-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-20 xl:gap-12">
        <HeroContent />
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
