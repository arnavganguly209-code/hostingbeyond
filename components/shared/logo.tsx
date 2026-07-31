import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  href?: string;
};

/**
 * Official HostingBeyond logo on the header left.
 * Crops the brand sheet to the HB mark + wordmark (excludes service icons).
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const content = (
    <span
      className={cn(
        "relative block h-11 w-[168px] overflow-hidden sm:h-12 sm:w-[210px]",
        className,
      )}
    >
      <Image
        src="/logo/hostingbeyond-logo.jpg"
        alt="HostingBeyond"
        width={1024}
        height={428}
        priority
        sizes="210px"
        className="absolute top-[-6%] left-0 h-[150%] w-auto max-w-none object-cover object-left"
      />
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
      aria-label="HostingBeyond home"
    >
      {content}
    </Link>
  );
}
