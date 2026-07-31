import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

/**
 * Official HostingBeyond logo — transparent PNG, 240px wide, no background.
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <Image
      src="/logo/hostingbeyond-logo.png"
      alt="HostingBeyond"
      width={240}
      height={127}
      priority
      className={cn(
        "h-auto w-[240px] bg-transparent object-contain",
        className,
      )}
    />
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
