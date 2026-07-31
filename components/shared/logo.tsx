import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

/**
 * Official HostingBeyond logo — exactly 240px wide, aspect ratio preserved.
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <Image
      src="/logo/hostingbeyond-logo-header.png"
      alt="HostingBeyond"
      width={240}
      height={84}
      priority
      className={cn(
        "h-auto w-[240px] max-w-[240px] bg-transparent object-contain object-left",
        className,
      )}
    />
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#6F3CFF]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
