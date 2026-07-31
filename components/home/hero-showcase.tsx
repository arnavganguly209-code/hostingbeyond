"use client";

/**
 * Right column spacer — speaker lives as full hero background (uncropped).
 * Kept for layout balance on large screens.
 */
export function HeroShowcase() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative hidden h-full min-h-[1px] w-full lg:block"
    />
  );
}
