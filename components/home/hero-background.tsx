"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

/**
 * Full-hero background using the exact uploaded speaker image.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    gsap.defaults(gsapConfig.defaults);
    const ctx = gsap.context(() => {
      gsap.to(".hb-glow", {
        opacity: 0.9,
        duration: 4.8,
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

      {/* Exact speaker photo — full hero background */}
      <Image
        src="/images/hero-speaker.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] opacity-90 sm:object-[78%_center]"
      />

      {/* Blend overlays so left copy stays readable */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050814_0%,rgb(5_8_20_/_0.92)_34%,rgb(5_8_20_/_0.45)_58%,rgb(5_8_20_/_0.25)_78%,rgb(5_8_20_/_0.55)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_8_20_/_0.55)_0%,transparent_22%,transparent_72%,rgb(5_8_20_/_0.75)_100%)]" />
      <div className="hb-glow absolute top-[12%] right-[18%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.28),transparent_70%)] blur-3xl" />
      <div className="hb-glow absolute right-[8%] bottom-[18%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgb(111_60_255_/_0.24),transparent_70%)] blur-3xl" />

      <motion.div
        className="absolute top-[30%] right-[30%] h-px w-48 rotate-[-12deg] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
