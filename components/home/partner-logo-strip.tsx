"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { CmsTechPartner } from "@/lib/orbit/defaults";
import { defaultTechnologyPartners } from "@/lib/orbit/defaults";

function BuiltInMark({ id }: { id: string }) {
  switch (id) {
    case "wordpress":
      return (
        <svg viewBox="0 0 132 24" className="h-[18px] w-auto" aria-hidden>
          <circle cx="11" cy="12" r="10" fill="currentColor" />
          <path
            fill="#fff"
            d="M6.4 7.2c.3-.1.6-.15.95-.15.9 0 1.5.35 1.72 1l3 8.9a7.8 7.8 0 0 1-2.15.42L6.4 7.2zm8.2.78c0 .6-.24 1.25-.64 2l-2.14 6-1.6-4.75c.35-.07.6-.22.6-.55 0-.27-.18-.42-.52-.42-.14 0-.3.02-.45.05l-3.8.18.15-.58c.32-.08.68-.14 1.07-.14 1.45 0 2.4.55 2.86 1.48.38-.78 1.1-1.48 2.26-1.48.66 0 1.13.18 1.45.52.3.3.46.74.46 1.3z"
          />
          <text
            x="28"
            y="16.5"
            fill="currentColor"
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontSize="13"
            fontWeight="700"
          >
            WordPress
          </text>
        </svg>
      );
    case "cpanel":
      return (
        <svg viewBox="0 0 78 24" className="h-[18px] w-auto" aria-hidden>
          <text
            x="0"
            y="17"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="14"
            fontWeight="800"
            letterSpacing="-0.04em"
          >
            cPanel
          </text>
          <circle cx="72" cy="7" r="2.4" fill="currentColor" opacity="0.4" />
        </svg>
      );
    case "plesk":
      return (
        <svg viewBox="0 0 58 24" className="h-[18px] w-auto" aria-hidden>
          <text
            x="0"
            y="17"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="-0.02em"
          >
            Plesk
          </text>
        </svg>
      );
    case "intel":
      return (
        <svg viewBox="0 0 52 24" className="h-[18px] w-auto" aria-hidden>
          <text
            x="0"
            y="17"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="14"
            fontWeight="800"
            fontStyle="italic"
            letterSpacing="0.01em"
          >
            intel
          </text>
        </svg>
      );
    case "amd":
      return (
        <svg viewBox="0 0 48 24" className="h-[18px] w-auto" aria-hidden>
          <text
            x="0"
            y="17"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="14"
            fontWeight="900"
            letterSpacing="0.08em"
          >
            AMD
          </text>
        </svg>
      );
    case "dell":
      return (
        <svg viewBox="0 0 56 24" className="h-[19px] w-auto" aria-hidden>
          <ellipse
            cx="28"
            cy="12"
            rx="25"
            ry="10"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
          <text
            x="28"
            y="15.5"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.16em"
          >
            DELL
          </text>
        </svg>
      );
    case "nvme":
      return (
        <svg viewBox="0 0 56 24" className="h-[18px] w-auto" aria-hidden>
          <text
            x="0"
            y="17"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="13"
            fontWeight="800"
            letterSpacing="0.04em"
          >
            NVMe
          </text>
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 72 24" className="h-[18px] w-auto" aria-hidden>
          <text
            x="0"
            y="17"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            EXPRESS
          </text>
        </svg>
      );
    default:
      return (
        <span className="text-[13px] font-bold tracking-wide uppercase">
          {id}
        </span>
      );
  }
}

/**
 * Technology / trust strip — CMS-driven with built-in monochrome marks.
 */
export function PartnerLogoStrip({
  className,
  partners,
}: {
  className?: string;
  partners?: CmsTechPartner[];
}) {
  const items = (partners?.length ? partners : defaultTechnologyPartners())
    .filter((partner) => partner.visible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1100px] flex-nowrap items-center justify-center overflow-x-auto py-1.5",
        className,
      )}
      role="list"
      aria-label="Technology partners"
    >
      {items.map((partner, index) => (
        <div
          key={partner.id}
          role="listitem"
          className="flex shrink-0 items-center"
        >
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-3 h-3.5 w-px bg-slate-300/90 sm:mx-4 lg:mx-[18px]"
            />
          ) : null}
          <span
            className="inline-flex h-7 items-center text-slate-500/90"
            title={partner.label}
          >
            {partner.imageUrl ? (
              <Image
                src={partner.imageUrl}
                alt={partner.label}
                width={120}
                height={28}
                className="h-[18px] w-auto object-contain opacity-80 grayscale"
              />
            ) : (
              <BuiltInMark id={partner.id} />
            )}
            <span className="sr-only">{partner.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
