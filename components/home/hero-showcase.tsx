"use client";

import { Globe2, Mail } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

/**
 * Floating offer cards over the full-bleed speaker background.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 55, damping: 18 });
  const springY = useSpring(y, { stiffness: 55, damping: 18 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 10);
    y.set(py * 8);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative z-10 hidden h-full min-h-[280px] w-full lg:block"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0"
      >
        <OfferCard
          tone="blue"
          icon={Mail}
          title="Business Email"
          lines={["Start Just", "$5", "/12 Month"]}
          footer="No Hidden Charges"
          className="bottom-[18%] left-[8%]"
          delay={0.1}
          reduceMotion={reduceMotion}
        />
        <OfferCard
          tone="purple"
          icon={Globe2}
          title={"Domain .COM\n+ 1 Business Mail"}
          lines={["1 Year Just", "$15"]}
          footer="Limited Time Offer"
          className="right-[6%] bottom-[8%]"
          delay={0.18}
          reduceMotion={reduceMotion}
        />
      </motion.div>
    </div>
  );
}

type OfferCardProps = {
  tone: "blue" | "purple";
  icon: typeof Mail;
  title: string;
  lines: string[];
  footer: string;
  className?: string;
  delay: number;
  reduceMotion: boolean | null;
};

function OfferCard({
  tone,
  icon: Icon,
  title,
  lines,
  footer,
  className,
  delay,
  reduceMotion,
}: OfferCardProps) {
  const isBlue = tone === "blue";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute w-[150px]", className)}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, isBlue ? -8 : -11, 0] }}
        transition={{
          duration: isBlue ? 4.8 : 5.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        className={cn(
          "rounded-[16px] border px-3.5 py-4 text-center backdrop-blur-xl",
          isBlue
            ? "border-[#0A84FF]/55 bg-[rgba(10,16,35,0.7)] shadow-[0_0_32px_rgb(10_132_255_/_0.35)]"
            : "border-[#6F3CFF]/55 bg-[rgba(10,16,35,0.7)] shadow-[0_0_32px_rgb(111_60_255_/_0.38)]",
        )}
      >
        <span
          className={cn(
            "mx-auto mb-2 inline-flex size-9 items-center justify-center rounded-lg border",
            isBlue
              ? "border-[#0A84FF]/40 bg-[#0A84FF]/15 text-[#7CC4FF]"
              : "border-[#6F3CFF]/40 bg-[#6F3CFF]/15 text-[#C4B5FF]",
          )}
        >
          <Icon className="size-4" strokeWidth={1.7} />
        </span>
        <p
          className={cn(
            "text-[9px] font-bold tracking-[0.12em] whitespace-pre-line uppercase",
            isBlue ? "text-[#9AD0FF]" : "text-[#D4C4FF]",
          )}
        >
          {title}
        </p>
        <div className="mt-2 space-y-0.5">
          {lines.map((line) => (
            <p
              key={line}
              className={cn(
                "font-extrabold text-white",
                line.startsWith("$")
                  ? "text-4xl tracking-tight"
                  : "text-[10px] tracking-[0.12em] text-[#AAB2C5] uppercase",
              )}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          className={cn(
            "mt-3 text-[9px] font-semibold tracking-[0.1em] uppercase",
            isBlue ? "text-[#AAB2C5]" : "text-[#D4C4FF]/90",
          )}
        >
          {footer}
        </p>
      </motion.div>
    </motion.article>
  );
}
