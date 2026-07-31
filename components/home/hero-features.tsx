"use client";

import { Globe2, Mail, Server, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { GlassPanel } from "@/components/shared/glass-panel";

const features = [
  {
    title: "Premium Domains",
    description: "Find the perfect domain for your brand with instant setup.",
    icon: Globe2,
  },
  {
    title: "Business Email",
    description: "Professional email that builds trust with every message.",
    icon: Mail,
  },
  {
    title: "Blazing Fast Hosting",
    description: "Powerful, secure infrastructure that stays always online.",
    icon: Server,
  },
  {
    title: "SSL Security",
    description: "Advanced protection for every site you launch with us.",
    icon: Shield,
  },
] as const;

export function HeroFeatures() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto mt-10 max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8"
    >
      <GlassPanel className="grid gap-px overflow-hidden rounded-3xl border-white/10 bg-white/[0.03] p-2 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * index, duration: 0.5 }}
            className="group rounded-[1.15rem] p-5 transition-colors hover:bg-white/[0.04] sm:p-6"
          >
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl border border-[#7b4dff]/30 bg-[linear-gradient(145deg,rgb(47_107_255_/_0.2),rgb(155_92_255_/_0.18))] text-[#c7b6ff] shadow-[0_0_28px_rgb(123_77_255_/_0.2)] transition-transform duration-300 group-hover:scale-105">
              <feature.icon className="size-5" strokeWidth={1.75} />
            </div>
            <h2 className="font-heading text-base font-semibold text-white">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#8f9bb3]">
              {feature.description}
            </p>
          </motion.article>
        ))}
      </GlassPanel>

      <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-[#8f9bb3]">
        <span>Trusted by 10,000+ businesses worldwide</span>
        <span aria-hidden className="text-[#22c55e]">
          ★★★★★
        </span>
        <span className="font-medium text-[#c8d0e4]">4.8/5 rating</span>
      </p>
    </motion.div>
  );
}
