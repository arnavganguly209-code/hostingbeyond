"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

import { gsapConfig } from "@/lib/animations/gsap";

/**
 * Hero atmosphere matching the official mockup:
 * dark void, glowing globe (top-right), blue/purple light streaks.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    gsap.defaults(gsapConfig.defaults);

    const ctx = gsap.context(() => {
      gsap.to(".hb-orb-blue", {
        opacity: 0.9,
        scale: 1.06,
        duration: 4.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".hb-orb-purple", {
        opacity: 0.75,
        scale: 1.1,
        duration: 5.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.5,
      });
      gsap.to(".hb-globe-spin", {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
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
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(30_27_75_/_0.55),transparent_50%)]" />

      <div className="hb-orb-blue absolute top-[-12%] left-[5%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(59_130_246_/_0.35),transparent_68%)] blur-3xl" />
      <div className="hb-orb-purple absolute top-[0%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(168_85_247_/_0.32),transparent_68%)] blur-3xl" />
      <div className="absolute top-[35%] right-[15%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgb(34_211_238_/_0.18),transparent_70%)] blur-3xl" />

      {/* Digital globe — upper right */}
      <div className="absolute top-[6%] right-[-4%] hidden h-[520px] w-[520px] md:block lg:right-[2%] xl:right-[6%]">
        <div className="hb-globe-spin absolute inset-[10%] rounded-full border border-cyan-400/20 shadow-[0_0_80px_rgb(56_189_248_/_0.2)]" />
        <div className="absolute inset-[18%] rounded-full border border-violet-400/20" />
        <div className="absolute inset-[26%] rounded-full border border-dashed border-blue-400/25" />
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgb(56_189_248_/_0.22),rgb(168_85_247_/_0.1)_42%,transparent_72%)]" />

        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full opacity-70"
        >
          <defs>
            <linearGradient id="globeLine" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#C084FC" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="138"
            fill="none"
            stroke="url(#globeLine)"
            strokeWidth="1.15"
            opacity="0.55"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={`lat-${i}`}
              cx="200"
              cy="200"
              rx="138"
              ry={22 + i * 24}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="0.65"
              opacity={0.28}
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={`lon-${i}`}
              cx="200"
              cy="200"
              rx={28 + i * 28}
              ry="138"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="0.65"
              opacity={0.22}
            />
          ))}
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * Math.PI * 2;
            const r = 118 + (i % 3) * 8;
            return (
              <circle
                key={`dot-${i}`}
                cx={200 + Math.cos(angle) * r}
                cy={200 + Math.sin(angle) * r}
                r={i % 4 === 0 ? 1.6 : 1}
                fill={i % 2 === 0 ? "#67E8F9" : "#E9D5FF"}
                opacity={0.55}
              />
            );
          })}
        </svg>

        <motion.div
          className="absolute top-[30%] left-[2%] h-[2px] w-56 -rotate-12 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.2, 0.95, 0.2], x: [0, 30, 0] }
          }
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[62%] right-[0%] h-[2px] w-64 rotate-[20deg] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.15, 0.9, 0.15], x: [0, -26, 0] }
          }
          transition={{
            duration: 5.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        />
      </div>

      {/* Floor light streaks */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_bottom,rgb(99_102_241_/_0.22),transparent_70%)]" />
      <div className="absolute inset-x-[8%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute inset-x-[18%] bottom-[14%] h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />

      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgb(255_255_255_/_0.5)_0.55px,transparent_0.7px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [background-size:38px_38px] opacity-30" />
    </div>
  );
}
