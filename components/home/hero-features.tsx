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
    label: "Expert Support Always Here",
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
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto mt-10 max-w-[1240px] px-4 pb-12 sm:mt-14 sm:px-6 lg:px-8"
    >
      <div className="grid gap-2 rounded-2xl border border-white/15 bg-[#0b1224]/55 p-3 shadow-[0_0_40px_rgb(99_102_241_/_0.12)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-2">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl px-4 py-4 sm:px-5"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-violet-400/35 bg-[linear-gradient(145deg,rgb(59_130_246_/_0.25),rgb(168_85_247_/_0.28))] text-violet-100 shadow-[0_0_18px_rgb(139_92_246_/_0.3)]">
              <stat.icon className="size-5" strokeWidth={1.7} />
            </span>
            <div>
              <p className="bg-gradient-to-r from-[#67E8F9] to-[#E879F9] bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
                {stat.value}
              </p>
              <p className="text-[12px] leading-snug text-slate-300 sm:text-[13px]">
                {stat.label}
              </p>
            </div>
            {index < stats.length - 1 ? (
              <span
                aria-hidden
                className="ml-auto hidden h-10 w-px bg-white/10 lg:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
