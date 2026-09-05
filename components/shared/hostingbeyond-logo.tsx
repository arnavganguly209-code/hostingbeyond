import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  title?: string;
};

/**
 * Crisp light-mode wordmark matching the official HostingBeyond mark:
 * cloud + bars (purple→blue gradient), Hosting (slate), Beyond (gradient).
 */
export function HostingBeyondLogo({
  className,
  title = "HostingBeyond",
}: Props) {
  return (
    <svg
      viewBox="0 0 320 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="hbLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="40%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="hbLogoGradText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Cloud mark — thick outline + three bars */}
      <g transform="translate(2,6)">
        <path
          d="M30.2 9.1c-2.05-4.85-6.85-8-12.15-8-6.2 0-11.45 4.15-13.05 9.85C2.15 11.7 0 14.85 0 18.7 0 23.55 3.9 27.5 8.7 27.5h22.4c4.45 0 8.05-3.6 8.05-8.05 0-4-2.95-7.35-6.85-7.95-.4-.95-.85-1.85-1.1-2.4z"
          stroke="url(#hbLogoGrad)"
          strokeWidth="3.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <rect
          x="12"
          y="15.2"
          width="3.8"
          height="8"
          rx="1.4"
          fill="url(#hbLogoGrad)"
        />
        <rect
          x="17.6"
          y="12.2"
          width="3.8"
          height="11"
          rx="1.4"
          fill="url(#hbLogoGrad)"
        />
        <rect
          x="23.2"
          y="14"
          width="3.8"
          height="9.2"
          rx="1.4"
          fill="url(#hbLogoGrad)"
        />
      </g>

      {/* Wordmark */}
      <text
        x="52"
        y="35"
        fontFamily="var(--font-heading), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-0.045em"
      >
        <tspan fill="#0f172a">Hosting</tspan>
        <tspan fill="url(#hbLogoGradText)">Beyond</tspan>
      </text>
    </svg>
  );
}
