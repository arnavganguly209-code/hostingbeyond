import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

/**
 * Exact uploaded HostingBeyond logo — no redesign, transparent PNG, ~60px height.
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <Image
      src="/logo/hostingbeyond-logo.png"
      alt="HostingBeyond"
      width={220}
      height={60}
      priority
      className={cn(
        "h-[60px] w-auto max-w-[min(240px,48vw)] bg-transparent object-contain object-left",
        className,
      )}
    />
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#6F3CFF]/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
