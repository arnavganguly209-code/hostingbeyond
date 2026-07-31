"use client";

import { Globe2, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Two offer boxes matching the official HostingBeyond mockup.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md items-stretch justify-center gap-4 sm:max-w-lg sm:gap-5 lg:max-w-none lg:justify-end">
      <OfferCard
        tone="blue"
        icon={Mail}
        title="Business Email"
        eyebrow="Start Just"
        price="$5"
        period="/12 Month"
        footer="No Hidden Charges"
        reduceMotion={reduceMotion}
        delay={0}
        className="rotate-[-2deg]"
      />
      <OfferCard
        tone="purple"
        icon={Globe2}
        title="Domain .COM + 1 Business Mail"
        eyebrow="1 Year Just"
        price="$15"
        period=""
        footer="Limited Time Offer"
        reduceMotion={reduceMotion}
        delay={0.12}
        className="mt-6 rotate-[2deg] sm:mt-8"
      />
    </div>
  );
}

type OfferCardProps = {
  tone: "blue" | "purple";
  icon: typeof Mail;
  title: string;
  eyebrow: string;
  price: string;
  period: string;
  footer: string;
  reduceMotion: boolean | null;
  delay: number;
  className?: string;
};

function OfferCard({
  tone,
  icon: Icon,
  title,
  eyebrow,
  price,
  period,
  footer,
  reduceMotion,
  delay,
  className,
}: OfferCardProps) {
  const isBlue = tone === "blue";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-[48%] max-w-[210px]", className)}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, isBlue ? -10 : -14, 0] }}
        transition={{
          duration: isBlue ? 5 : 5.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        whileHover={reduceMotion ? undefined : { y: -6, scale: 1.03 }}
        className={cn(
          "flex h-full min-h-[280px] flex-col items-center rounded-[18px] border px-4 py-6 text-center backdrop-blur-xl sm:min-h-[310px] sm:px-5",
          isBlue
            ? "border-cyan-400/60 bg-[linear-gradient(180deg,rgb(8_20_45_/_0.72),rgb(6_14_32_/_0.55))] shadow-[0_0_36px_rgb(34_211_238_/_0.35),inset_0_0_24px_rgb(34_211_238_/_0.08)]"
            : "border-fuchsia-400/60 bg-[linear-gradient(180deg,rgb(35_12_55_/_0.72),rgb(18_8_35_/_0.55))] shadow-[0_0_36px_rgb(217_70_239_/_0.38),inset_0_0_24px_rgb(217_70_239_/_0.08)]",
        )}
      >
        <span
          className={cn(
            "mb-4 inline-flex size-12 items-center justify-center rounded-xl border",
            isBlue
              ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgb(34_211_238_/_0.4)]"
              : "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-300 shadow-[0_0_20px_rgb(217_70_239_/_0.4)]",
          )}
        >
          <Icon className="size-6" strokeWidth={1.6} />
        </span>

        <p
          className={cn(
            "text-[10px] font-bold tracking-[0.14em] uppercase sm:text-[11px]",
            isBlue ? "text-cyan-200" : "text-fuchsia-200",
          )}
        >
          {title}
        </p>

        <p className="mt-5 text-[11px] font-semibold tracking-[0.16em] text-slate-300 uppercase">
          {eyebrow}
        </p>

        <p className="mt-1 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          {price}
        </p>

        {period ? (
          <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-slate-300 uppercase">
            {period}
          </p>
        ) : (
          <span className="mt-1 block h-4" />
        )}

        <p
          className={cn(
            "mt-auto pt-6 text-[10px] font-semibold tracking-[0.14em] uppercase",
            isBlue ? "text-slate-400" : "text-fuchsia-200/90",
          )}
        >
          {footer}
        </p>
      </motion.div>
    </motion.article>
  );
}
