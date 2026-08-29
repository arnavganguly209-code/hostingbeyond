"use client";

import {
  BadgeCheck,
  Headphones,
  Lock,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { productsTrustItems } from "@/config/products";

const iconMap = {
  shield: BadgeCheck,
  uptime: ShieldCheck,
  lock: Lock,
  support: Headphones,
  rocket: Rocket,
} as const;

export function ProductsTrustBar({
  items,
}: {
  items?: ReadonlyArray<{
    title: string;
    subtitle: string;
    icon: string;
  }>;
}) {
  const reduceMotion = useReducedMotion();
  const list = items ?? productsTrustItems;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mt-12 w-full"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {list.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? BadgeCheck;
          return (
            <div
              key={item.title}
              className="relative flex items-start gap-3 px-2 py-2 lg:px-4"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute top-2 bottom-2 left-0 hidden w-px bg-gradient-to-b from-transparent via-[#0a84ff]/35 to-transparent lg:block"
                />
              ) : null}
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#0a84ff]/40 bg-[linear-gradient(145deg,rgb(10_132_255_/_0.25),rgb(111_60_255_/_0.18))] text-white shadow-[0_0_20px_rgb(10_132_255_/_0.28)]">
                <Icon className="size-4" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[13px] font-bold text-white">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[var(--hb-muted)]">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
