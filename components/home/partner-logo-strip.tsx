import { cn } from "@/lib/utils";

const partners = [
  {
    id: "wordpress",
    label: "WordPress",
    svg: (
      <svg viewBox="0 0 140 28" className="h-[18px] w-auto sm:h-5" aria-hidden>
        <circle cx="12" cy="14" r="10.5" fill="currentColor" />
        <path
          fill="#fff"
          d="M7.2 8.6c.32-.1.66-.16 1.02-.16.96 0 1.62.38 1.87 1.08l3.24 9.62a8.4 8.4 0 0 1-2.32.46L7.2 8.6zm9.02.82c0 .66-.26 1.37-.71 2.19l-2.32 6.52-1.73-5.15c.38-.07.66-.25.66-.62 0-.29-.2-.46-.57-.46-.16 0-.32.02-.5.05l-4.15.2.16-.64c.35-.09.75-.16 1.17-.16 1.57 0 2.62.62 3.12 1.62.41-.84 1.18-1.62 2.46-1.62.71 0 1.23.2 1.57.57.32.35.48.82.48 1.44z"
        />
        <text
          x="28"
          y="18.5"
          fill="currentColor"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="13.5"
          fontWeight="700"
        >
          WordPress
        </text>
      </svg>
    ),
  },
  {
    id: "cpanel",
    label: "cPanel",
    svg: (
      <svg viewBox="0 0 92 28" className="h-[18px] w-auto sm:h-5" aria-hidden>
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="16"
          fontWeight="800"
          letterSpacing="-0.04em"
        >
          cPanel
        </text>
        <circle cx="84" cy="9" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "plesk",
    label: "plesk",
    svg: (
      <svg viewBox="0 0 72 28" className="h-[18px] w-auto sm:h-5" aria-hidden>
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="-0.03em"
        >
          plesk
        </text>
      </svg>
    ),
  },
  {
    id: "intel",
    label: "intel",
    svg: (
      <svg viewBox="0 0 64 28" className="h-[18px] w-auto sm:h-5" aria-hidden>
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="16"
          fontWeight="800"
          letterSpacing="0.02em"
          fontStyle="italic"
        >
          intel
        </text>
      </svg>
    ),
  },
  {
    id: "amd",
    label: "AMD",
    svg: (
      <svg viewBox="0 0 58 28" className="h-[18px] w-auto sm:h-5" aria-hidden>
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="16"
          fontWeight="900"
          letterSpacing="0.04em"
        >
          AMD
        </text>
      </svg>
    ),
  },
  {
    id: "dell",
    label: "DELL",
    svg: (
      <svg
        viewBox="0 0 58 28"
        className="h-[20px] w-auto sm:h-[22px]"
        aria-hidden
      >
        <ellipse
          cx="29"
          cy="14"
          rx="27"
          ry="11.5"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
        <text
          x="29"
          y="18"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="0.12em"
        >
          DELL
        </text>
      </svg>
    ),
  },
  {
    id: "nvme",
    label: "NVMe Express",
    svg: (
      <svg viewBox="0 0 128 28" className="h-[18px] w-auto sm:h-5" aria-hidden>
        <text
          x="0"
          y="19"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="13.5"
          fontWeight="800"
          letterSpacing="0.01em"
        >
          NVMe
        </text>
        <text
          x="52"
          y="19"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.01em"
          opacity="0.88"
        >
          Express
        </text>
      </svg>
    ),
  },
] as const;

export function PartnerLogoStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1120px] flex-wrap items-center justify-center gap-y-3.5",
        className,
      )}
    >
      {partners.map((partner, index) => (
        <div key={partner.id} className="flex items-center">
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-2.5 hidden h-[18px] w-px bg-slate-300/70 sm:mx-3.5 sm:block lg:mx-5"
            />
          ) : null}
          <span
            className="inline-flex items-center text-slate-500/90 transition-colors hover:text-slate-700"
            title={partner.label}
          >
            {partner.svg}
            <span className="sr-only">{partner.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
