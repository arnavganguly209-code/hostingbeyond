import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  title?: string;
};

/** Crisp light-mode wordmark — cloud mark + Hosting (dark) + Beyond (gradient). */
export function HostingBeyondLogo({
  className,
  title = "HostingBeyond",
}: Props) {
  return (
    <svg
      viewBox="0 0 280 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="hbLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="45%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Cloud mark */}
      <g transform="translate(1,4)">
        <path
          d="M28.5 8.2c-1.9-4.4-6.3-7.2-11.2-7.2-5.7 0-10.6 3.8-12.1 9.1C2.1 11 0 13.9 0 17.4 0 21.8 3.5 25.4 7.9 25.4h20.7c4.1 0 7.4-3.3 7.4-7.4 0-3.7-2.7-6.8-6.3-7.4-.4-.9-.8-1.7-1.2-2.4z"
          stroke="url(#hbLogoGrad)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          fill="none"
        />
        <rect
          x="11.2"
          y="14.2"
          width="3.4"
          height="7.2"
          rx="1.2"
          fill="url(#hbLogoGrad)"
        />
        <rect
          x="16.4"
          y="11.4"
          width="3.4"
          height="10"
          rx="1.2"
          fill="url(#hbLogoGrad)"
        />
        <rect
          x="21.6"
          y="13.2"
          width="3.4"
          height="8.2"
          rx="1.2"
          fill="url(#hbLogoGrad)"
        />
      </g>

      {/* Wordmark */}
      <text
        x="48"
        y="33"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="-0.04em"
      >
        <tspan fill="#0f172a">Hosting</tspan>
        <tspan fill="url(#hbLogoGrad)">Beyond</tspan>
      </text>
    </svg>
  );
}
