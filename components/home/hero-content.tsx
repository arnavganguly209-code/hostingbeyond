"use client";

import {
  ArrowRight,
  Headphones,
  Play,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

const trustItems = [
  { label: "99.99% Uptime", icon: Timer },
  { label: "24/7 Support", icon: Headphones },
  { label: "Secure Infrastructure", icon: ShieldCheck },
  { label: "Business Ready", icon: Sparkles },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 max-w-xl xl:max-w-2xl">
      <motion.div
        custom={0.05}
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="inline-flex items-center gap-2 rounded-full border border-[#7b4dff]/30 bg-[#7b4dff]/10 px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-[#c9b6ff] uppercase backdrop-blur-md"
      >
        <span className="size-1.5 rounded-full bg-[#8ec0ff] shadow-[0_0_10px_#8ec0ff]" />
        Fast • Secure • Reliable
      </motion.div>

      <motion.h1
        custom={0.15}
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="font-heading mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]"
      >
        Everything You Need.
        <br />
        <GradientText as="span">Beyond Expectations.</GradientText>
      </motion.h1>

      <motion.p
        custom={0.28}
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="mt-5 max-w-lg text-base leading-relaxed text-[#9aa6bf] sm:text-lg"
      >
        {siteConfig.description}
      </motion.p>

      <motion.div
        custom={0.38}
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <GlowButton href={routes.getStarted} size="lg">
          Get Started
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </GlowButton>
        <GlowButton href={routes.hosting} variant="secondary" size="lg">
          <span className="inline-flex size-6 items-center justify-center rounded-full border border-white/20">
            <Play className="size-3 fill-current" />
          </span>
          Explore Services
        </GlowButton>
      </motion.div>

      <motion.ul
        custom={0.5}
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {trustItems.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#4d8cff]/25 bg-[#2f6bff]/10 text-[#8ec0ff]">
              <item.icon className="size-3.5" strokeWidth={1.8} />
            </span>
            <span className="text-xs leading-snug font-medium text-[#c8d0e4] sm:text-[0.8rem]">
              {item.label}
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
