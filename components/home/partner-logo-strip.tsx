import { cn } from "@/lib/utils";

/** Partner strip matching light hero mockup — monochrome marks + thin dividers */
const partners = [
  {
    id: "wordpress",
    label: "WordPress",
    svg: (
      <svg
        viewBox="0 0 138 28"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <circle cx="11.5" cy="14" r="10" fill="currentColor" />
        <path
          fill="#fff"
          d="M7 8.8c.3-.1.62-.15.95-.15.9 0 1.52.36 1.75 1.02l3.05 9.05a7.9 7.9 0 0 1-2.18.43L7 8.8zm8.45.78c0 .62-.24 1.28-.66 2.05l-2.18 6.12-1.62-4.84c.36-.07.62-.24.62-.58 0-.27-.19-.43-.53-.43-.15 0-.3.02-.47.05l-3.9.19.15-.6c.33-.08.7-.15 1.1-.15 1.47 0 2.46.58 2.93 1.52.38-.79 1.11-1.52 2.31-1.52.67 0 1.15.19 1.47.53.3.32.45.77.45 1.36z"
        />
        <text
          x="27"
          y="18.5"
          fill="currentColor"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="13"
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
        viewBox="0 0 88 28"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="15.5"
          fontWeight="800"
          letterSpacing="-0.04em"
        >
          cPanel
        </text>
        <circle cx="80" cy="9" r="2.8" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "plesk",
    label: "plesk",
    svg: (
      <svg
        viewBox="0 0 68 28"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="15.5"
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
        viewBox="0 0 62 28"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="15.5"
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
      <svg
        viewBox="0 0 54 28"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <text
          x="0"
          y="19.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="15.5"
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
        viewBox="0 0 56 28"
        className="h-[19px] w-auto sm:h-[21px]"
        aria-hidden
      >
        <ellipse
          cx="28"
          cy="14"
          rx="26"
          ry="11"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="none"
        />
        <text
          x="28"
          y="18"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="10.5"
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
      <svg
        viewBox="0 0 124 28"
        className="h-[17px] w-auto sm:h-[19px]"
        aria-hidden
      >
        <text
          x="0"
          y="19"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="13"
          fontWeight="800"
          letterSpacing="0.02em"
        >
          nvme
        </text>
        <text
          x="50"
          y="19"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="0.04em"
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
        "mx-auto flex w-full max-w-[1140px] flex-wrap items-center justify-center gap-y-3.5",
        className,
      )}
    >
      {partners.map((partner, index) => (
        <div key={partner.id} className="flex items-center">
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-2.5 hidden h-[16px] w-px bg-slate-300/75 sm:mx-3.5 sm:block lg:mx-5"
            />
          ) : null}
          <span
            className="inline-flex items-center text-slate-500 transition-colors hover:text-slate-700"
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
