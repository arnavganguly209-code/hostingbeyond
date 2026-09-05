import { cn } from "@/lib/utils";

/**
 * Partner strip matching light hero mockup —
 * monochrome marks, thin vertical dividers, single clean row.
 */
const partners = [
  {
    id: "wordpress",
    label: "WordPress",
    svg: (
      <svg
        viewBox="0 0 132 26"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <circle cx="11" cy="13" r="9.5" fill="currentColor" />
        <path
          fill="#fff"
          d="M6.7 8.2c.28-.09.58-.14.9-.14.85 0 1.44.34 1.66.96l2.9 8.55a7.5 7.5 0 0 1-2.06.4L6.7 8.2zm8 .74c0 .58-.23 1.2-.63 1.93l-2.06 5.78-1.53-4.57c.34-.06.58-.22.58-.55 0-.25-.18-.4-.5-.4-.14 0-.28.02-.44.04l-3.68.18.14-.56c.31-.08.66-.14 1.04-.14 1.39 0 2.32.55 2.77 1.43.36-.74 1.05-1.43 2.18-1.43.63 0 1.09.18 1.39.5.28.3.42.72.42 1.28z"
        />
        <text
          x="26"
          y="17.5"
          fill="currentColor"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="12.5"
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
      <svg
        viewBox="0 0 78 26"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <text
          x="0"
          y="18"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="14.5"
          fontWeight="800"
          letterSpacing="-0.045em"
        >
          cPanel
        </text>
        <circle cx="72" cy="8" r="2.5" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "plesk",
    label: "plesk",
    svg: (
      <svg
        viewBox="0 0 58 26"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <text
          x="0"
          y="18"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="14.5"
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
      <svg
        viewBox="0 0 52 26"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <text
          x="0"
          y="18"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="14.5"
          fontWeight="800"
          letterSpacing="0.01em"
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
      <svg
        viewBox="0 0 48 26"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <text
          x="0"
          y="18"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="14.5"
          fontWeight="900"
          letterSpacing="0.05em"
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
        viewBox="0 0 52 26"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <ellipse
          cx="26"
          cy="13"
          rx="24"
          ry="10"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <text
          x="26"
          y="16.5"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="0.14em"
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
      <svg
        viewBox="0 0 118 26"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <text
          x="0"
          y="18"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="12.5"
          fontWeight="800"
          letterSpacing="0.02em"
        >
          nvme
        </text>
        <text
          x="48"
          y="18"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.05em"
          opacity="0.9"
        >
          EXPRESS
        </text>
      </svg>
    ),
  },
] as const;

export function PartnerLogoStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1100px] flex-nowrap items-center justify-center overflow-x-auto",
        className,
      )}
    >
      {partners.map((partner, index) => (
        <div key={partner.id} className="flex shrink-0 items-center">
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-3 h-4 w-px bg-slate-300/90 sm:mx-4 lg:mx-5"
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
