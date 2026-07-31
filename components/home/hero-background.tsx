"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

export function HeroBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !glowRef.current) return;

    gsap.defaults(gsapConfig.defaults);
    const ctx = gsap.context(() => {
      gsap.to(".hb-glow-a", {
        opacity: 0.85,
        scale: 1.08,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".hb-glow-b", {
        opacity: 0.7,
        scale: 1.12,
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.6,
      });
      gsap.to(".hb-orbit", {
        rotate: 360,
        duration: 48,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    }, glowRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(20_24_48_/_0.9),transparent_55%)]" />
      <div className="hb-glow-a absolute top-[-10%] left-[8%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgb(47_107_255_/_0.28),transparent_68%)] blur-3xl" />
      <div className="hb-glow-b absolute top-[5%] right-[-8%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgb(155_92_255_/_0.26),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-20%] left-1/2 h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(79_100_255_/_0.14),transparent_70%)] blur-3xl" />

      {/* Wireframe globe */}
      <div className="absolute top-[12%] right-[2%] hidden h-[34rem] w-[34rem] lg:block xl:right-[6%]">
        <div className="hb-orbit absolute inset-[8%] rounded-full border border-[#4d8cff]/25 shadow-[0_0_60px_rgb(47_107_255_/_0.15)]" />
        <div className="absolute inset-[14%] rounded-full border border-[#7b4dff]/20" />
        <div className="absolute inset-[22%] rounded-full border border-dashed border-[#5eb7ff]/25" />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(94_183_255_/_0.18),rgb(123_77_255_/_0.08)_45%,transparent_70%)]" />
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full opacity-60"
        >
          <defs>
            <linearGradient id="globe-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#5eb7ff" />
              <stop offset="1" stopColor="#b45cff" />
            </linearGradient>
          </defs>
          <ellipse
            cx="200"
            cy="200"
            rx="145"
            ry="145"
            fill="none"
            stroke="url(#globe-stroke)"
            strokeWidth="1.2"
            opacity="0.55"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={`lat-${i}`}
              cx="200"
              cy="200"
              rx={145}
              ry={28 + i * 28}
              fill="none"
              stroke="#6a8cff"
              strokeWidth="0.7"
              opacity={0.28}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={`lon-${i}`}
              cx="200"
              cy="200"
              rx={35 + i * 35}
              ry={145}
              fill="none"
              stroke="#9b5cff"
              strokeWidth="0.7"
              opacity={0.24}
            />
          ))}
        </svg>

        {/* Light streaks */}
        <motion.div
          className="absolute top-[28%] left-[10%] h-px w-40 rotate-[-18deg] bg-gradient-to-r from-transparent via-[#5eb7ff] to-transparent opacity-70"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.25, 0.85, 0.25], x: [0, 24, 0] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[58%] right-[8%] h-px w-48 rotate-[24deg] bg-gradient-to-r from-transparent via-[#b45cff] to-transparent opacity-70"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.2, 0.8, 0.2], x: [0, -18, 0] }
          }
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
      </div>

      {/* Soft particle field */}
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(255_255_255_/_0.55)_0.6px,transparent_0.7px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] [background-size:42px_42px] opacity-40" />
    </div>
  );
}
