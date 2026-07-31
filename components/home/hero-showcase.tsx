"use client";

import { Cloud, Globe2, Mail, Server, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";

import { GlassPanel } from "@/components/shared/glass-panel";
import { cn } from "@/lib/utils";

type ShowcaseItem = {
  title: string;
  subtitle: string;
  detail: string;
  icon: LucideIcon;
  glow: "blue" | "purple";
  className: string;
  delay: number;
};

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Business Email",
    subtitle: "From $5 / 12 months",
    detail: "Professional inbox that builds trust",
    icon: Mail,
    glow: "blue",
    className: "lg:left-0 lg:top-[8%]",
    delay: 0.15,
  },
  {
    title: "Domain .COM",
    subtitle: "Bundle from $15 / year",
    detail: "Secure your brand identity",
    icon: Globe2,
    glow: "purple",
    className: "lg:right-0 lg:top-[2%]",
    delay: 0.28,
  },
  {
    title: "Web Hosting",
    subtitle: "NVMe · Global CDN",
    detail: "Built for speed and uptime",
    icon: Server,
    glow: "blue",
    className: "lg:bottom-[18%] lg:left-[8%]",
    delay: 0.4,
  },
  {
    title: "Cloud VPS",
    subtitle: "Dedicated resources",
    detail: "Scale without compromise",
    icon: Cloud,
    glow: "purple",
    className: "lg:right-[4%] lg:bottom-[8%]",
    delay: 0.52,
  },
];

function ShowcaseCard({
  item,
  reduceMotion,
  className,
}: {
  item: ShowcaseItem;
  reduceMotion: boolean | null;
  className?: string;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.65,
        delay: item.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { y: [0, item.glow === "blue" ? -8 : -12, 0] }
        }
        transition={{
          duration: item.glow === "blue" ? 5.2 : 6.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.delay,
        }}
        whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
        className="will-change-transform"
      >
        <GlassPanel
          glow={item.glow}
          className={cn(
            "group h-full p-4 transition-shadow duration-300",
            item.glow === "blue"
              ? "hover:shadow-[0_0_50px_rgb(47_107_255_/_0.35)]"
              : "hover:shadow-[0_0_50px_rgb(155_92_255_/_0.35)]",
          )}
        >
          <div
            className={cn(
              "mb-4 inline-flex size-11 items-center justify-center rounded-xl border",
              item.glow === "blue"
                ? "border-[#4d8cff]/35 bg-[#2f6bff]/15 text-[#8ec0ff] shadow-[0_0_24px_rgb(47_107_255_/_0.35)]"
                : "border-[#9b5cff]/35 bg-[#7b4dff]/15 text-[#d2b4ff] shadow-[0_0_24px_rgb(155_92_255_/_0.35)]",
            )}
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </div>
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-[#9eb0d4] uppercase">
            {item.title}
          </p>
          <p className="font-heading mt-2 text-lg font-semibold text-white">
            {item.subtitle}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#8f9bb3]">
            {item.detail}
          </p>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}

export function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 18);
    y.set(py * 14);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto w-full max-w-lg lg:h-[34rem] lg:max-w-none"
    >
      {/* Mobile / tablet grid */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {showcaseItems.map((item) => (
          <ShowcaseCard
            key={item.title}
            item={item}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      {/* Desktop floating composition */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 hidden lg:block"
      >
        {showcaseItems.map((item) => (
          <ShowcaseCard
            key={item.title}
            item={item}
            reduceMotion={reduceMotion}
            className={cn("absolute w-[13rem]", item.className)}
          />
        ))}
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] bottom-0 hidden h-24 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgb(123_77_255_/_0.22),transparent_70%)] blur-2xl lg:block"
      />
    </div>
  );
}
