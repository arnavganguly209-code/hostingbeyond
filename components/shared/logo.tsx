import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

/**
 * Official HostingBeyond logo — 264px wide.
 * Strong upward optical shift so HB + wordmark sit on the header midline
 * (asset includes tagline/padding that otherwise pulls the mark downward).
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <Image
      src="/logo/hostingbeyond-logo-wordmark.png"
      alt="HostingBeyond"
      width={264}
      height={92}
      priority
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
      className="relative inline-flex shrink-0 -translate-y-[18px] items-center justify-center leading-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--hb-purple)]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
