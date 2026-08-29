"use client";

import { Globe2, Server, Shield, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { CmsHeroContent } from "@/lib/orbit/defaults";

const defaultStats = [
  {
    value: "2.7M+",
    label: "Domains Under Management",
    icon: "globe",
  },
  {
    value: "600+",
    label: "Domain Extensions",
    icon: "server",
  },
  {
    value: "24/7",
    label: "Expert Support Always Here",
    icon: "shield",
  },
  {
    value: "10,000+",
    label: "Businesses Trust Us",
    icon: "users",
  },
] as const;

const icons = {
  globe: Globe2,
  server: Server,
  shield: Shield,
  users: Users,
} as const;

export function HeroFeatures({ stats }: { stats?: CmsHeroContent["stats"] }) {
  const reduceMotion = useReducedMotion();
  const items = stats ?? defaultStats;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.45 }}
      className="relative z-20 mx-auto w-full max-w-[1280px] shrink-0 px-4 pb-3 sm:px-6 sm:pb-4 lg:px-8 lg:pb-5"
    >
      <div className="grid grid-cols-2 gap-1 rounded-[22px] border border-[var(--hb-border-blue)]/70 bg-[rgba(10,16,35,0.42)] p-1.5 shadow-[0_16px_50px_rgb(0_0_0_/_0.28),0_0_24px_var(--hb-glow-blue),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-[20px] lg:grid-cols-4 lg:gap-0 lg:p-2.5">
        {items.map((stat) => {
          const Icon = icons[stat.icon as keyof typeof icons] ?? Globe2;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-2.5 rounded-2xl px-2.5 py-2 sm:gap-3 sm:px-3.5 sm:py-2.5"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--hb-purple)]/35 bg-gradient-to-br from-[var(--hb-blue)]/25 to-[var(--hb-purple)]/30 text-white shadow-[0_0_18px_var(--hb-glow-purple)] sm:size-10">
                <Icon className="size-3.5 sm:size-4" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-base font-extrabold text-white sm:text-lg lg:text-xl">
                  {stat.value}
                </p>
                <p className="truncate text-[10px] leading-snug text-[var(--hb-muted)] sm:text-[11px] lg:text-[12px]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
