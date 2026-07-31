"use client";

import { Globe2, Server, Shield, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "2.7M+",
    label: "Domains Under Management",
    icon: Globe2,
  },
  {
    value: "600+",
    label: "Domain Extensions",
    icon: Server,
  },
  {
    value: "24/7",
    label: "Expert Support",
    icon: Shield,
  },
  {
    value: "10,000+",
    label: "Businesses Trust Us",
    icon: Users,
  },
] as const;

export function HeroFeatures() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
      className="relative z-20 mx-auto mt-auto w-full max-w-[1280px] px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div className="grid gap-2 rounded-[24px] border border-white/[0.08] bg-[rgba(10,16,35,0.55)] p-3 shadow-[0_20px_60px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl px-4 py-4"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#6F3CFF]/35 bg-gradient-to-br from-[#0A84FF]/25 to-[#6F3CFF]/3 text-white shadow-[0_0_20px_rgb(111_60_255_/_0.28)]">
              <stat.icon className="size-5" strokeWidth={1.7} />
            </span>
            <div>
              <p className="text-xl font-extrabold text-white">{stat.value}</p>
              <p className="text-[12px] leading-snug text-[#AAB2C5]">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
