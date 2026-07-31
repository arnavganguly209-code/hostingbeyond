import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

/**
 * Exact HostingBeyond logo — 240px, vertically centered in the header frame.
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <span
      className={cn(
        "relative flex h-[52px] w-[240px] items-center overflow-hidden",
        className,
      )}
    >
      <Image
        src="/logo/hostingbeyond-logo-header.png"
        alt="HostingBeyond"
        width={240}
        height={84}
        priority
        className="h-[52px] w-[240px] -translate-y-[2px] bg-transparent object-contain object-left"
      />
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center self-center bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#6F3CFF]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
