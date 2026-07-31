"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";
import { HeroShowcase } from "./hero-showcase";

/**
 * Single-viewport hero — no page scroll required to see the full section.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#050814] pt-[108px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-cols-1 items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:px-8 lg:py-2">
        <HeroContent />
        <HeroShowcase />
      </div>

      {/* Mobile offer strip (desktop cards sit over speaker) */}
      <div className="relative z-20 flex shrink-0 gap-3 overflow-x-auto px-4 pb-2 lg:hidden">
        <div className="min-w-[140px] rounded-2xl border border-[#0A84FF]/45 bg-[rgba(10,16,35,0.75)] px-3 py-3 text-center backdrop-blur-xl">
          <p className="text-[9px] font-bold tracking-wider text-[#9AD0FF] uppercase">
            Business Email
          </p>
          <p className="mt-1 text-3xl font-extrabold text-white">$5</p>
          <p className="text-[10px] text-[#AAB2C5]">/12 Month</p>
        </div>
        <div className="min-w-[140px] rounded-2xl border border-[#6F3CFF]/45 bg-[rgba(10,16,35,0.75)] px-3 py-3 text-center backdrop-blur-xl">
          <p className="text-[9px] font-bold tracking-wider text-[#D4C4FF] uppercase">
            Domain + Mail
          </p>
          <p className="mt-1 text-3xl font-extrabold text-white">$15</p>
          <p className="text-[10px] text-[#AAB2C5]">1 Year</p>
        </div>
      </div>

      <HeroFeatures />
    </section>
  );
}
