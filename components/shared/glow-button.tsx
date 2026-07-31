import Link from "next/link";

import { cn } from "@/lib/utils";

type GlowButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

const sizeClasses = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
} as const;

export function GlowButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: GlowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--hb-purple)]/70",
        sizeClasses[size],
        variant === "primary" &&
          "bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] text-white shadow-[0_0_28px_var(--hb-glow-blue)] hover:shadow-[0_0_40px_var(--hb-glow-purple)] hover:brightness-110",
        variant === "secondary" &&
          "border border-white/15 bg-white/[0.03] text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.07]",
        variant === "ghost" &&
          "text-[var(--hb-muted)] hover:bg-white/[0.05] hover:text-white",
        className,
      )}
    >
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent,rgb(255_255_255_/_0.3),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
