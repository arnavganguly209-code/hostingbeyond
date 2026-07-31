"use client";

import Image from "next/image";
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
 * Exact uploaded speaker + floating offer cards (mockup composition).
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
    x.set(px * 14);
    y.set(py * 10);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative z-10 mx-auto h-[420px] w-full max-w-lg sm:h-[480px] lg:h-[560px] lg:max-w-none"
    >
      {/* Mobile / tablet speaker */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero-speaker.jpg"
          alt="HostingBeyond speaker"
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/35 to-transparent" />
      </div>

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
          className="top-[8%] left-[2%] sm:top-[10%] sm:left-[4%] lg:top-[12%] lg:left-[2%]"
          delay={0.1}
          reduceMotion={reduceMotion}
        />
        <OfferCard
          tone="purple"
          icon={Globe2}
          title={"Domain .COM\n+ 1 Business Mail"}
          lines={["1 Year", "Just", "$15"]}
          footer="Limited Time Offer"
          className="top-[28%] right-[2%] sm:top-[30%] sm:right-[4%] lg:top-[26%] lg:right-[4%]"
          delay={0.22}
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
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute w-[148px] sm:w-[168px]", className)}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, isBlue ? -10 : -14, 0] }}
        transition={{
          duration: isBlue ? 5.1 : 5.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.04, y: -4 }}
        className={cn(
          "rounded-[18px] border px-4 py-5 text-center backdrop-blur-xl",
          isBlue
            ? "border-[#0A84FF]/55 bg-[rgba(10,16,35,0.62)] shadow-[0_0_40px_rgb(10_132_255_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.1)]"
            : "border-[#6F3CFF]/55 bg-[rgba(10,16,35,0.62)] shadow-[0_0_40px_rgb(111_60_255_/_0.38),inset_0_1px_0_rgb(255_255_255_/_0.1)]",
        )}
      >
        <span
          className={cn(
            "mx-auto mb-3 inline-flex size-10 items-center justify-center rounded-xl border",
            isBlue
              ? "border-[#0A84FF]/40 bg-[#0A84FF]/15 text-[#7CC4FF]"
              : "border-[#6F3CFF]/40 bg-[#6F3CFF]/15 text-[#C4B5FF]",
          )}
        >
          <Icon className="size-5" strokeWidth={1.7} />
        </span>
        <p
          className={cn(
            "text-[10px] font-bold tracking-[0.12em] whitespace-pre-line uppercase",
            isBlue ? "text-[#9AD0FF]" : "text-[#D4C4FF]",
          )}
        >
          {title}
        </p>
        <div className="mt-3 space-y-0.5">
          {lines.map((line) => (
            <p
              key={line}
              className={cn(
                "font-extrabold text-white",
                line.startsWith("$")
                  ? "text-4xl tracking-tight sm:text-5xl"
                  : "text-[11px] tracking-[0.14em] text-[#AAB2C5] uppercase",
              )}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          className={cn(
            "mt-4 text-[10px] font-semibold tracking-[0.12em] uppercase",
            isBlue ? "text-[#AAB2C5]" : "text-[#D4C4FF]/90",
          )}
        >
          {footer}
        </p>
      </motion.div>
    </motion.article>
  );
}
