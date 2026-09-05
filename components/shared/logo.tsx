import Link from "next/link";

import { HostingBeyondLogo } from "@/components/shared/hostingbeyond-logo";
import { cn } from "@/lib/utils";
import { isRuntimeMediaSrc } from "@/lib/orbit/media-url";
import Image from "next/image";

type LogoProps = {
  className?: string;
  href?: string;
  src?: string;
  /** Prefer crisp SVG wordmark for light glass header */
  variant?: "image" | "mark";
};

/**
 * Official HostingBeyond wordmark —
 * light header uses SVG mark; otherwise raster `src`.
 */
export function Logo({
  className,
  href = "/",
  src = "/logo/hostingbeyond-logo-light.png",
  variant = "mark",
}: LogoProps) {
  const useMark =
    variant === "mark" ||
    !src ||
    src.includes("hostingbeyond-logo-light") ||
    src.includes("hostingbeyond-logo-transparent") ||
    src.includes("hostingbeyond-logo-wordmark") ||
    src.includes("hostingbeyond-logo-header");

  const content = useMark ? (
    <HostingBeyondLogo className={cn("w-[200px] sm:w-[220px]", className)} />
  ) : (
    <Image
      src={src}
      alt="HostingBeyond"
      width={264}
      height={92}
      priority
      unoptimized={isRuntimeMediaSrc(src)}
      className={cn(
        "m-0 block h-auto w-[var(--hb-logo-width)] max-w-[var(--hb-logo-width)] bg-transparent object-contain object-left align-middle",
        className,
      )}
    />
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="relative inline-flex shrink-0 items-center justify-center leading-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--hb-purple)]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
