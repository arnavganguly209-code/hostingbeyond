import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Partner strip — exact crop from hero mockup when available,
 * with SVG fallback row (WordPress … DELL … nvme EXPRESS).
 */
const fallbackPartners = [
  { id: "wordpress", label: "WordPress" },
  { id: "cpanel", label: "cPanel" },
  { id: "plesk", label: "plesk" },
  { id: "intel", label: "intel" },
  { id: "amd", label: "AMD" },
  { id: "dell", label: "DELL" },
  { id: "nvme", label: "nvme EXPRESS" },
] as const;

export function PartnerLogoStrip({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1080px]", className)}>
      {/* Exact mockup strip */}
      <div className="relative mx-auto hidden h-[44px] w-full max-w-[980px] sm:block sm:h-[48px]">
        <Image
          src="/images/partner-logo-strip.png"
          alt="WordPress, cPanel, plesk, intel, AMD, nvme EXPRESS"
          fill
          unoptimized
          className="object-contain object-center"
          sizes="980px"
        />
      </div>

      {/* Mobile / accessibility fallback labels */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:hidden">
        {fallbackPartners.map((p, i) => (
          <span key={p.id} className="flex items-center gap-3">
            {i > 0 ? (
              <span aria-hidden className="h-3.5 w-px bg-slate-300" />
            ) : null}
            <span className="text-[12px] font-semibold tracking-tight text-slate-500">
              {p.label}
            </span>
          </span>
        ))}
      </div>

      <p className="sr-only">
        Technology partners: WordPress, cPanel, plesk, intel, AMD, DELL, nvme
        EXPRESS
      </p>
    </div>
  );
}
