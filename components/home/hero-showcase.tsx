"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Exact uploaded speaker image — face fully visible, no aggressive crop/zoom.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex h-full min-h-[280px] w-full items-end justify-center lg:items-center lg:justify-end"
    >
      <div className="relative h-full w-full max-w-[560px]">
        <div className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(10_132_255_/_0.22),transparent_68%)] blur-3xl" />
        <Image
          src="/images/hero-speaker.jpg"
          alt="HostingBeyond speaker presenting on stage"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 560px"
          className="object-contain object-bottom drop-shadow-[0_24px_60px_rgb(10_132_255_/_0.2)] lg:object-center"
        />
      </div>
    </motion.div>
  );
}
