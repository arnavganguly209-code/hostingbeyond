import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  href?: string;
};

/** HB monogram matching the HostingBeyond brand mark. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-11 w-auto shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="hbLogoGrad"
          x1="2"
          y1="4"
          x2="62"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" />
          <stop offset="0.45" stopColor="#6366F1" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <filter id="hbLogoGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="4"
        y="5"
        width="3.2"
        height="3.2"
        rx="0.5"
        fill="url(#hbLogoGrad)"
      />
      <rect
        x="8.5"
        y="2.5"
        width="2.6"
        height="2.6"
        rx="0.4"
        fill="url(#hbLogoGrad)"
        opacity="0.85"
      />
      <rect
        x="1.5"
        y="9.5"
        width="2.4"
        height="2.4"
        rx="0.4"
        fill="url(#hbLogoGrad)"
        opacity="0.7"
      />
      <rect
        x="9"
        y="8"
        width="2"
        height="2"
        rx="0.35"
        fill="url(#hbLogoGrad)"
        opacity="0.55"
      />

      <path
        d="M13 8h5.6v11.5h7.2V8H31.4v28H26V25.2h-7.4V36H13V8Z"
        fill="url(#hbLogoGrad)"
        filter="url(#hbLogoGlow)"
      />
      <path
        d="M35 8h11.5c4.2 0 7 2.2 7 5.7 0 2.3-1.2 4-3.2 5 2.6.85 4.2 2.85 4.2 5.65 0 3.9-3 6.65-7.8 6.65H35V8Zm5.6 4.7v5.6h5c1.75 0 2.75-.85 2.75-2.7 0-1.9-1-2.9-2.85-2.9h-4.9Zm0 10.2v6.7h5.7c2 0 3.3-1 3.3-3.2 0-2.25-1.3-3.5-3.4-3.5h-5.6Z"
        fill="url(#hbLogoGrad)"
        filter="url(#hbLogoGlow)"
      />
      <path
        d="M6 43c9.5-7.5 22-11 35-8.2 7 1.5 14.5 4.8 20 9.2"
        stroke="url(#hbLogoGrad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className, showTagline = true, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-[1.05rem] font-extrabold tracking-[0.02em] text-white sm:text-[1.15rem]">
          HOSTING
          <span className="bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent">
            BEYOND
          </span>
        </span>
        {showTagline ? (
          <span className="mt-1.5 hidden text-[0.52rem] font-medium tracking-[0.16em] text-[#8B93A7] uppercase sm:block">
            Beyond Hosting, Beyond Possibilities
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
