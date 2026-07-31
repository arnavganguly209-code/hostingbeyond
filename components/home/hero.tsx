"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#050814] pt-[88px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-4 pt-12 pb-2 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pt-16">
        <HeroContent />
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
