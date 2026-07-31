"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

/**
 * Premium left-side hosting atmosphere — soft grid, glow, particles.
 * No clutter. No large distracting objects.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    gsap.defaults(gsapConfig.defaults);
    const ctx = gsap.context(() => {
      gsap.to(".hb-soft-glow", {
        opacity: 0.85,
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050814]" />

      {/* Soft hosting ambience */}
      <div className="hb-soft-glow absolute top-[-10%] left-[-5%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.16),transparent_68%)] blur-3xl" />
      <div className="hb-soft-glow absolute bottom-[-15%] left-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.12),transparent_70%)] blur-3xl" />
      <div className="absolute top-[20%] right-[30%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.08),transparent_70%)] blur-3xl" />

      {/* Subtle network grid — left emphasis */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(10_132_255_/_0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(10_132_255_/_0.12)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_20%_40%,black_0%,transparent_72%)] [background-size:64px_64px] opacity-[0.22]" />

      {/* Soft tech lines */}
      <div className="absolute top-[32%] left-0 h-px w-[42%] bg-gradient-to-r from-transparent via-[#0A84FF]/35 to-transparent" />
      <div className="absolute top-[58%] left-[4%] h-px w-[28%] bg-gradient-to-r from-transparent via-[#6F3CFF]/25 to-transparent" />

      {/* Micro particles */}
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(124_196_255_/_0.55)_0.7px,transparent_0.8px)] [mask-image:radial-gradient(ellipse_at_25%_45%,black,transparent_65%)] [background-size:48px_48px] opacity-30" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_20_/_0.35)_0%,transparent_20%,transparent_78%,rgb(5_8_20_/_0.55)_100%)]" />
    </div>
  );
}
