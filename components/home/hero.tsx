"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroFeatures } from "./hero-features";

/**
 * Premium HostingBeyond hero — full-bleed speaker stage + glass UI.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[var(--hb-bg)] pt-[108px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1280px] flex-1 items-center px-4 py-3 sm:px-6 lg:px-8 lg:py-2">
        <div className="w-full max-w-xl lg:max-w-[540px]">
          <HeroContent />
        </div>
      </div>

      <HeroFeatures />
    </section>
  );
}
