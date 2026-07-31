"use client";

import { Globe2, Mail, Server, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const features = [
  {
    title: "Premium Domains",
    description: "Find the perfect domain for your brand.",
    icon: Globe2,
  },
  {
    title: "Business Email",
    description: "Professional email that builds trust.",
    icon: Mail,
  },
  {
    title: "Blazing Fast Hosting",
    description: "Powerful, secure, and always reliable.",
    icon: Server,
  },
  {
    title: "SSL Security",
    description: "Advanced protection for your website.",
    icon: Shield,
  },
] as const;

export function HeroFeatures() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65 }}
      className="relative z-10 mx-auto mt-12 max-w-[1200px] px-5 pb-10 sm:mt-16 lg:px-8"
    >
      <div className="grid gap-1 rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_0_50px_rgb(99_102_241_/_0.12)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * index, duration: 0.45 }}
            className="rounded-2xl p-5 sm:p-6"
          >
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full border border-violet-400/35 bg-[linear-gradient(145deg,rgb(59_130_246_/_0.25),rgb(168_85_247_/_0.25))] text-violet-100 shadow-[0_0_24px_rgb(139_92_246_/_0.35)]">
              <feature.icon className="size-5" strokeWidth={1.75} />
            </div>
            <h2 className="text-[15px] font-semibold text-white">
              {feature.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              {feature.description}
            </p>
          </motion.article>
        ))}
      </div>

      <p className="mt-7 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-400">
        <span>Trusted by 10,000+ Businesses Worldwide</span>
        <span className="text-green-400" aria-label="5 star rating">
          ★★★★★
        </span>
        <span className="font-medium text-slate-200">4.8/5 Rating</span>
      </p>
    </motion.div>
  );
}
