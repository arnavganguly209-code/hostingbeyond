import { cn } from "@/lib/utils";

/**
 * Designed partner strip (not a pasted screenshot) —
 * WordPress | cPanel | plesk | intel | AMD | DELL | nvme EXPRESS
 */
const partners = [
  {
    id: "wordpress",
    label: "WordPress",
    mark: (
      <svg
        viewBox="0 0 128 24"
        className="h-[15px] w-auto sm:h-[17px]"
        aria-hidden
      >
        <circle cx="10" cy="12" r="9" fill="currentColor" />
        <path
          fill="#fff"
          d="M6.2 7.6c.26-.08.54-.13.84-.13.8 0 1.35.32 1.55.9l2.7 8a7 7 0 0 1-1.92.38L6.2 7.6zm7.4.7c0 .54-.21 1.12-.58 1.8l-1.92 5.4-1.43-4.26c.32-.06.54-.2.54-.5 0-.24-.16-.38-.46-.38-.13 0-.26.02-.4.04l-3.42.16.13-.52c.29-.07.61-.13.96-.13 1.3 0 2.16.5 2.58 1.34.34-.7.98-1.34 2.03-1.34.59 0 1.01.16 1.3.46.26.28.4.68.4 1.2z"
        />
        <text
          x="24"
          y="16.5"
          fill="currentColor"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="12"
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
    mark: (
      <svg
        viewBox="0 0 72 24"
        className="h-[15px] w-auto sm:h-[17px]"
        aria-hidden
      >
        <text
          x="0"
          y="17"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="13.5"
          fontWeight="800"
          letterSpacing="-0.04em"
        >
          cPanel
        </text>
        <circle cx="66" cy="7.5" r="2.2" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "plesk",
    label: "plesk",
    mark: (
      <svg
        viewBox="0 0 54 24"
        className="h-[15px] w-auto sm:h-[17px]"
        aria-hidden
      >
        <text
          x="0"
          y="17"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="13.5"
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
    mark: (
      <svg
        viewBox="0 0 48 24"
        className="h-[15px] w-auto sm:h-[17px]"
        aria-hidden
      >
        <text
          x="0"
          y="17"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="13.5"
          fontWeight="800"
          fontStyle="italic"
          letterSpacing="0.01em"
        >
          intel
        </text>
      </svg>
    ),
  },
  {
    id: "amd",
    label: "AMD",
    mark: (
      <svg
        viewBox="0 0 44 24"
        className="h-[15px] w-auto sm:h-[17px]"
        aria-hidden
      >
        <text
          x="0"
          y="17"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="13.5"
          fontWeight="900"
          letterSpacing="0.06em"
        >
          AMD
        </text>
      </svg>
    ),
  },
  {
    id: "dell",
    label: "DELL",
    mark: (
      <svg
        viewBox="0 0 50 24"
        className="h-[16px] w-auto sm:h-[18px]"
        aria-hidden
      >
        <ellipse
          cx="25"
          cy="12"
          rx="23"
          ry="9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <text
          x="25"
          y="15.5"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="9"
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
    label: "nvme EXPRESS",
    mark: (
      <svg
        viewBox="0 0 112 24"
        className="h-[15px] w-auto sm:h-[17px]"
        aria-hidden
      >
        <text
          x="0"
          y="16.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="12"
          fontWeight="800"
          letterSpacing="0.02em"
        >
          nvme
        </text>
        <text
          x="46"
          y="16.5"
          fill="currentColor"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="0.06em"
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
        "mx-auto flex w-full max-w-[1080px] flex-nowrap items-center justify-center overflow-x-auto",
        className,
      )}
    >
      {partners.map((partner, index) => (
        <div key={partner.id} className="flex shrink-0 items-center">
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-2.5 h-[14px] w-px bg-slate-300 sm:mx-3.5 lg:mx-4"
            />
          ) : null}
          <span
            className="inline-flex items-center text-slate-500"
            title={partner.label}
          >
            {partner.mark}
            <span className="sr-only">{partner.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
