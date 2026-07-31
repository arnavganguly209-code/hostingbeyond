"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050814] pt-[100px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] flex-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:py-6">
        <HeroContent />
        <HeroShowcase />
      </div>

      <HeroFeatures />
    </section>
  );
}
