"use client";

import Link from "next/link";
import { ArrowUpRight, Cloud, ShoppingCart, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

type Accent = "blue" | "purple";

type HostingTypeCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  accent: Accent;
  icon: "cloud" | "cart" | "wordpress" | "user";
  visual: "cloud" | "shop" | "gallery" | "studio";
};

const cards: HostingTypeCard[] = [
  {
    id: "cloud",
    title: "Cloud Hosting",
    description:
      "Run your heavy sites on a highly stable, multi-server network architecture.",
    href: routes.cloud,
    accent: "blue",
    icon: "cloud",
    visual: "cloud",
  },
  {
    id: "ecommerce",
    title: "eCommerce Hosting",
    description:
      "Get high-speed performance and top security for your e-commerce operations.",
    href: `${routes.hosting}/ecommerce`,
    accent: "purple",
    icon: "cart",
    visual: "shop",
  },
  {
    id: "wordpress",
    title: "WordPress Hosting",
    description:
      "Experience high speeds with specialized staging tools and smart optimization.",
    href: `${routes.hosting}/wordpress`,
    accent: "blue",
    icon: "wordpress",
    visual: "gallery",
  },
  {
    id: "reseller",
    title: "Reseller Hosting",
    description:
      "Create custom packages to sell hosting directly under your white-label brand.",
    href: `${routes.hosting}/reseller`,
    accent: "purple",
    icon: "user",
    visual: "studio",
  },
];

const accentMap = {
  blue: {
    border:
      "border-[#3b82f6]/40 shadow-[0_0_0_1px_rgba(59,130,246,0.12),0_0_40px_rgba(59,130,246,0.08)] hover:border-[#60a5fa]/60",
    icon: "border-[#3b82f6]/45 bg-[#3b82f6]/12 text-[#93c5fd]",
    cta: "text-[#60a5fa]",
  },
  purple: {
    border:
      "border-[#a855f7]/40 shadow-[0_0_0_1px_rgba(168,85,247,0.12),0_0_40px_rgba(168,85,247,0.08)] hover:border-[#c084fc]/60",
    icon: "border-[#a855f7]/45 bg-[#a855f7]/12 text-[#d8b4fe]",
    cta: "text-[#c084fc]",
  },
} as const;

function WordPressMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.1 15.4-2.9-8.6a6.6 6.6 0 0 1 2.9 8.6Zm1.1 1.1a7.4 7.4 0 0 1-2.2-.3l2.4-7 2.3 7a7.5 7.5 0 0 1-2.5.3Zm3.2-1.2-1-3h2.3l.7 2a6.5 6.5 0 0 1-2 .999ZM7.2 7.8l4.1 11.7A7.5 7.5 0 0 1 4.5 12a7.4 7.4 0 0 1 2.7-4.2Zm9.1-.2A7.4 7.4 0 0 1 19.5 12a7.5 7.5 0 0 1-1.6 4.6l-2.7-8.1a3.5 3.5 0 0 0 1.1-.9Z" />
    </svg>
  );
}

function CardIcon({
  type,
  className,
}: {
  type: HostingTypeCard["icon"];
  className?: string;
}) {
  if (type === "cloud")
    return <Cloud className={className} strokeWidth={1.8} />;
  if (type === "cart")
    return <ShoppingCart className={className} strokeWidth={1.8} />;
  if (type === "wordpress") return <WordPressMark className={className} />;
  return <UserRound className={className} strokeWidth={1.8} />;
}

function CardVisual({
  type,
  accent,
}: {
  type: HostingTypeCard["visual"];
  accent: Accent;
}) {
  const isBlue = accent === "blue";
  const line = isBlue
    ? "border-[#3b82f6]/35 bg-[#0b1730]"
    : "border-[#a855f7]/35 bg-[#160b28]";
  const soft = isBlue
    ? "bg-[#3b82f6]/20 text-[#93c5fd]"
    : "bg-[#a855f7]/20 text-[#d8b4fe]";

  if (type === "cloud") {
    return (
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-bold",
              line,
              soft,
            )}
          >
            www
          </span>
          <span
            className={cn(
              "rounded-xl border px-3 py-2 text-[12px] font-extrabold text-white",
              line,
            )}
          >
            ↑ 85.2%
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["UPTIME", "RELIABILITY", "SECURITY"].map((label) => (
            <span
              key={label}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[9px] font-bold tracking-wide uppercase",
                line,
                soft,
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "shop") {
    return (
      <div className={cn("mt-5 overflow-hidden rounded-2xl border p-3", line)}>
        <div className="mb-2 flex items-center justify-between">
          <span className="h-2 w-16 rounded-full bg-white/20" />
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
              soft,
            )}
          >
            1
          </span>
        </div>
        <div className="grid h-20 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-transparent">
          <span className="text-[13px] font-bold text-white/70">109.00</span>
        </div>
      </div>
    );
  }

  if (type === "gallery") {
    return (
      <div className={cn("mt-5 overflow-hidden rounded-2xl border p-2", line)}>
        <div className="flex gap-2">
          <div className="h-24 flex-1 rounded-xl bg-[linear-gradient(160deg,#1e3a5f,#0b1730)]" />
          <div className="flex w-8 flex-col items-center gap-1.5 py-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className={cn("size-5 rounded-md", soft)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mt-5 overflow-hidden rounded-2xl border p-3", line)}>
      <p className="mb-2 text-[11px] font-bold tracking-wide text-white/80 uppercase">
        Botanical Studio
      </p>
      <div className="mb-2 h-16 rounded-xl bg-[linear-gradient(160deg,#1a3d2e,#0b1730)]" />
      <div className="flex gap-1.5">
        {["Aa", "Aa", "Aa"].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-bold",
              soft,
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HostingTypesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#07122a] px-4 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-5 lg:px-8 lg:pt-6 lg:pb-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-40 w-[60%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(59,130,246,0.1),transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {cards.map((card, index) => {
            const styles = accentMap[card.accent];
            return (
              <motion.article
                key={card.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: 0.04 + index * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-[rgba(12,20,40,0.55)] p-5 backdrop-blur-2xl transition-[border-color,box-shadow,transform] duration-200",
                  styles.border,
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
                    card.accent === "blue"
                      ? "via-[#60a5fa]/80"
                      : "via-[#c084fc]/80",
                  )}
                />

                <span
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-full border",
                    styles.icon,
                  )}
                >
                  <CardIcon type={card.icon} className="size-5" />
                </span>

                <h3 className="mt-4 text-[18px] font-extrabold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/65">
                  {card.description}
                </p>

                <Link
                  href={card.href}
                  className={cn(
                    "mt-4 inline-flex items-center gap-1.5 text-[12px] font-extrabold tracking-[0.08em] uppercase transition hover:brightness-110",
                    styles.cta,
                  )}
                >
                  View Plans
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>

                <div className="mt-auto">
                  <CardVisual type={card.visual} accent={card.accent} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
