"use client";

import { ArrowRight, Headphones, Lock, Play, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";
import { routes } from "@/config/routes";

const trustItems = [
  {
    title: "99.99% Uptime",
    subtitle: "Network Guarantee",
    icon: ShieldCheck,
  },
  {
    title: "Secure & Trusted",
    subtitle: "Your data is safe",
    icon: Lock,
  },
  {
    title: "24/7 Expert Support",
    subtitle: "We're here for you",
    icon: Headphones,
  },
] as const;

export function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 max-w-xl">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-violet-100 uppercase backdrop-blur-md"
      >
        Fast. Secure. Reliable.
      </motion.div>

      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-[2.5rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.35rem]"
      >
        Everything You Need.
        <br />
        <GradientText
          as="span"
          className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9]"
        >
          Beyond Expectations.
        </GradientText>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-400 sm:text-base"
      >
        Premium domains, blazing-fast hosting, and secure business email —
        everything you need to build, grow, and succeed online.
      </motion.p>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <GlowButton
          href={routes.getStarted}
          size="lg"
          className="rounded-full px-7"
        >
          Get Started Now
          <ArrowRight className="size-4" />
        </GlowButton>
        <GlowButton
          href={routes.hosting}
          variant="secondary"
          size="lg"
          className="rounded-full border-white/25"
        >
          <span className="inline-flex size-6 items-center justify-center rounded-full border border-white/30">
            <Play className="size-3 fill-current" />
          </span>
          Explore Services
        </GlowButton>
      </motion.div>

      <motion.ul
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        className="mt-10 grid gap-5 sm:grid-cols-3"
      >
        {trustItems.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_16px_rgb(34_211_238_/_0.25)]">
              <item.icon className="size-3.5" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-white">
                {item.title}
              </span>
              <span className="block text-[11px] text-slate-400">
                {item.subtitle}
              </span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
