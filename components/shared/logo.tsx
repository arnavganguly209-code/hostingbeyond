import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  href?: string;
};

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-auto", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="hb-mark"
          x1="0"
          y1="8"
          x2="72"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2F6BFF" />
          <stop offset="0.55" stopColor="#7B4DFF" />
          <stop offset="1" stopColor="#B45CFF" />
        </linearGradient>
        <linearGradient
          id="hb-orbit"
          x1="4"
          y1="44"
          x2="68"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#9B5CFF" />
        </linearGradient>
        <filter id="hb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Pixel accents */}
      <rect
        x="6"
        y="6"
        width="3.5"
        height="3.5"
        rx="0.6"
        fill="url(#hb-mark)"
        opacity="0.95"
      />
      <rect
        x="11"
        y="3"
        width="2.8"
        height="2.8"
        rx="0.5"
        fill="url(#hb-mark)"
        opacity="0.75"
      />
      <rect
        x="3"
        y="11"
        width="2.5"
        height="2.5"
        rx="0.5"
        fill="url(#hb-mark)"
        opacity="0.65"
      />

      {/* H */}
      <path
        d="M14 10h6.2v12.2H28V10h6.2v30H28V28.4H20.2V40H14V10Z"
        fill="url(#hb-mark)"
        filter="url(#hb-glow)"
      />

      {/* B */}
      <path
        d="M38 10h12.4c4.6 0 7.6 2.4 7.6 6.2 0 2.5-1.3 4.4-3.5 5.4 2.8.9 4.5 3.1 4.5 6.1 0 4.2-3.2 7.3-8.4 7.3H38V10Zm6.2 5.1v6.1h5.4c1.9 0 3-0.9 3-2.9s-1.1-3.2-3.1-3.2H44.2Zm0 11.1v7.3h6.2c2.2 0 3.6-1.1 3.6-3.5s-1.4-3.8-3.7-3.8h-6.1Z"
        fill="url(#hb-mark)"
        filter="url(#hb-glow)"
      />

      {/* Orbit swoosh */}
      <path
        d="M8 46c10-8 24-12 38-9 8 1.6 16 5.2 22 10"
        stroke="url(#hb-orbit)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
    </svg>
  );
}

export function Logo({ className, showTagline = true, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-heading text-[0.95rem] font-bold tracking-[0.04em] text-white sm:text-[1.05rem]">
          HOSTING
          <span className="bg-[linear-gradient(105deg,#5eb7ff,#7b4dff_55%,#b45cff)] bg-clip-text text-transparent">
            BEYOND
          </span>
        </span>
        {showTagline ? (
          <span className="mt-1 hidden text-[0.55rem] font-medium tracking-[0.14em] text-[#7f8aa3] uppercase sm:block">
            Beyond Hosting, Beyond Possibilities
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7b4dff]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
