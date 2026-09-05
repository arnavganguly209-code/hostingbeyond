import { cn } from "@/lib/utils";

const partners = [
  {
    id: "wordpress",
    label: "WordPress",
    svg: (
      <svg viewBox="0 0 132 28" className="h-5 w-auto" aria-hidden>
        <circle cx="13" cy="14" r="11" fill="currentColor" />
        <path
          fill="#fff"
          d="M7.6 9.2c.35-.12.72-.18 1.12-.18 1.05 0 1.78.42 2.05 1.18l3.55 10.55a9.2 9.2 0 0 1-2.55.5L7.6 9.2zm9.9.9c0 .72-.28 1.5-.78 2.4l-2.55 7.15-1.9-5.65c.42-.08.72-.28.72-.68 0-.32-.22-.5-.62-.5-.18 0-.35.02-.55.06l-4.55.22.18-.7c.38-.1.82-.18 1.28-.18 1.72 0 2.88.68 3.42 1.78.45-.92 1.3-1.78 2.7-1.78.78 0 1.35.22 1.72.62.35.38.53.9.53 1.58z"
        />
        <text
          x="30"
          y="19"
          fill="currentColor"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="14.5"
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
      <svg viewBox="0 0 90 28" className="h-5 w-auto" aria-hidden>
        <text
          x="0"
          y="20"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="18"
          fontWeight="800"
          letterSpacing="-0.03em"
        >
          cPanel
        </text>
        <circle cx="82" cy="9" r="3.2" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "plesk",
    label: "plesk",
    svg: (
      <svg viewBox="0 0 78 28" className="h-5 w-auto" aria-hidden>
        <text
          x="0"
          y="20"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="-0.02em"
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
      <svg viewBox="0 0 70 28" className="h-5 w-auto" aria-hidden>
        <text
          x="0"
          y="20"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="18"
          fontWeight="800"
          letterSpacing="0.04em"
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
      <svg viewBox="0 0 64 28" className="h-5 w-auto" aria-hidden>
        <text
          x="0"
          y="20"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="18"
          fontWeight="900"
          letterSpacing="0.02em"
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
      <svg viewBox="0 0 56 28" className="h-6 w-auto" aria-hidden>
        <ellipse
          cx="28"
          cy="14"
          rx="26"
          ry="12"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="28"
          y="18.5"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="12"
          fontWeight="800"
          letterSpacing="0.08em"
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
      <svg viewBox="0 0 120 28" className="h-5 w-auto" aria-hidden>
        <text
          x="0"
          y="19"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="0.02em"
        >
          NVMe
        </text>
        <text
          x="52"
          y="19"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.01em"
          opacity="0.85"
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
        "mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-y-3",
        className,
      )}
    >
      {partners.map((partner, index) => (
        <div key={partner.id} className="flex items-center">
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-3 hidden h-5 w-px bg-slate-300/80 sm:mx-4 sm:block lg:mx-5"
            />
          ) : null}
          <span
            className="inline-flex items-center text-slate-500"
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
