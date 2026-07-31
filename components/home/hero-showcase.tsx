"use client";

import { Globe2, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Two floating offer cards matching the official hero mockup.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-auto w-full max-w-md items-end justify-center gap-4 pt-6 sm:max-w-lg sm:gap-5 lg:h-[420px] lg:max-w-none lg:pt-0">
      {/* Soft reflection floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] bottom-0 h-28 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgb(99_102_241_/_0.35),transparent_70%)] blur-2xl"
      />

      {/* Business Email card */}
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[46%] max-w-[200px] origin-bottom"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reduceMotion ? undefined : { y: -8, scale: 1.03 }}
          className="rounded-[22px] border border-cyan-400/40 bg-[linear-gradient(160deg,rgb(15_23_42_/_0.75),rgb(8_15_35_/_0.55))] p-5 shadow-[0_0_40px_rgb(34_211_238_/_0.28),inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-xl"
        >
          <p className="text-center text-[10px] font-bold tracking-[0.18em] text-cyan-200 uppercase">
            Business Email
          </p>
          <p className="mt-4 text-center text-[11px] font-semibold tracking-wide text-slate-300 uppercase">
            Start Just
          </p>
          <p className="mt-1 text-center text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            $5
          </p>
          <p className="mt-1 text-center text-[11px] font-semibold tracking-wide text-slate-300 uppercase">
            /12 Month
          </p>
          <p className="mt-4 text-center text-[10px] font-medium tracking-[0.12em] text-slate-400 uppercase">
            No Hidden Charges
          </p>
          <div className="mt-5 flex justify-center">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_24px_rgb(34_211_238_/_0.4)]">
              <Mail className="size-6" strokeWidth={1.6} />
            </span>
          </div>
        </motion.div>
      </motion.article>

      {/* Domain bundle card */}
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-[48%] max-w-[210px] origin-bottom self-start sm:mt-2"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          whileHover={reduceMotion ? undefined : { y: -8, scale: 1.03 }}
          className="relative rounded-[22px] border border-fuchsia-400/40 bg-[linear-gradient(160deg,rgb(30_15_50_/_0.75),rgb(12_10_30_/_0.55))] p-5 shadow-[0_0_44px_rgb(217_70_239_/_0.3),inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-xl"
        >
          <div className="absolute -top-3 -right-3 z-30 flex size-[72px] items-center justify-center rounded-full border border-fuchsia-300/40 bg-[linear-gradient(145deg,#7C3AED,#DB2777)] p-2 text-center text-[9px] leading-tight font-bold tracking-wide text-white uppercase shadow-[0_0_24px_rgb(217_70_239_/_0.55)]">
            Limited
            <br />
            Time Offer
          </div>

          <p className="pr-4 text-center text-[9px] font-bold tracking-[0.14em] text-fuchsia-200 uppercase sm:text-[10px]">
            Domain .COM + 1 Business Mail
          </p>
          <p className="mt-4 text-center text-[11px] font-semibold tracking-wide text-slate-300 uppercase">
            1 Year Just
          </p>
          <p className="mt-1 text-center text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            $15
          </p>
          <p className="mt-4 text-center text-[10px] font-medium tracking-[0.12em] text-fuchsia-200/90 uppercase">
            Limited Time Offer
          </p>
          <div className="mt-5 flex justify-center">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-300 shadow-[0_0_24px_rgb(217_70_239_/_0.4)]">
              <Globe2 className="size-6" strokeWidth={1.6} />
            </span>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}
