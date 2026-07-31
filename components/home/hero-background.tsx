"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

/**
 * Cinematic hero atmosphere matching the official mockup.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    gsap.defaults(gsapConfig.defaults);
    const ctx = gsap.context(() => {
      gsap.to(".hb-streak-a", {
        opacity: 0.95,
        x: 30,
        duration: 4.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".hb-streak-b", {
        opacity: 0.85,
        x: -24,
        duration: 5.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.4,
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

      <Image
        src="/images/hero-atmosphere.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] opacity-45 blur-[2px] saturate-125"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050814_0%,rgb(5_8_20_/_0.82)_42%,rgb(5_8_20_/_0.35)_70%,rgb(5_8_20_/_0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(59_130_246_/_0.22),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgb(168_85_247_/_0.2),transparent_50%)]" />

      <div className="hb-streak-a absolute top-[28%] left-[-10%] h-[3px] w-[55%] rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 blur-[1px]" />
      <div className="hb-streak-b absolute top-[48%] right-[-8%] h-[3px] w-[50%] rotate-[12deg] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-70 blur-[1px]" />
      <div className="absolute bottom-[22%] left-[20%] h-[2px] w-[40%] rotate-[-4deg] bg-gradient-to-r from-transparent via-violet-400/80 to-transparent blur-[1px]" />

      <motion.div
        className="absolute top-[18%] right-[18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(56_189_248_/_0.28),transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] bottom-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(217_70_239_/_0.25),transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.75, 0.35] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
    </div>
  );
}
