import Link from "next/link";
import Image from "next/image";

import { HostingBeyondLogo } from "@/components/shared/hostingbeyond-logo";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
  src?: string;
  /** `image` = official raster wordmark; `mark` = crisp SVG */
  variant?: "image" | "mark";
};

/**
 * Official HostingBeyond wordmark for the light glass header.
 */
export function Logo({
  className,
  href = "/",
  src = "/logo/hostingbeyond-logo-v3.png",
  variant = "image",
}: LogoProps) {
  const content =
    variant === "mark" ? (
      <HostingBeyondLogo
        className={cn("h-[34px] w-auto sm:h-9 xl:h-10", className)}
      />
    ) : (
      <Image
        src={src}
        alt="HostingBeyond"
        width={1100}
        height={182}
        priority
        unoptimized
        className={cn(
          "m-0 block h-[34px] w-auto max-w-[min(100%,260px)] bg-transparent object-contain object-left align-middle sm:h-9 sm:max-w-[280px] xl:h-10 xl:max-w-[300px]",
          className,
        )}
      />
    );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="relative inline-flex shrink-0 items-center justify-start leading-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--hb-purple)]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
