"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Globe, Mail, ShieldCheck } from "lucide-react";

import { routes } from "@/config/routes";

const features = [
  {
    key: "cpanel",
    title: "One Click",
    subtitle: "cPanel Access",
    icon: (
      <Image
        src="/images/partners/cpanel.svg"
        alt=""
        width={36}
        height={22}
        className="h-[18px] w-auto object-contain sm:h-[20px]"
      />
    ),
  },
  {
    key: "wordpress",
    title: "One Click",
    subtitle: "WordPress Install",
    icon: (
      <Image
        src="/images/partners/wordpress.svg"
        alt=""
        width={28}
        height={28}
        className="h-[22px] w-[22px] object-contain sm:h-6 sm:w-6"
      />
    ),
  },
  {
    key: "builder",
    title: "One Click",
    subtitle: "Website Create",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d6e8f8] text-[#3b82f6] sm:h-9 sm:w-9">
        <Globe className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
      </span>
    ),
  },
  {
    key: "email",
    title: "Business Email",
    subtitle: "Professional Mail",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d6e8f8] text-[#3b82f6] sm:h-9 sm:w-9">
        <Mail className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
      </span>
    ),
  },
  {
    key: "ssl",
    title: "Free SSL",
    subtitle: "With All Plans",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d8f3e4] text-[#16a34a] sm:h-9 sm:w-9">
        <ShieldCheck
          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
          strokeWidth={2}
        />
      </span>
    ),
  },
] as const;

export function HeroFeatureBar() {
  return (
    <div className="relative flex [scrollbar-width:none] items-center gap-2 overflow-x-auto px-3 py-1.5 sm:gap-0 sm:overflow-visible sm:px-3.5 sm:py-1.5 lg:justify-between [&::-webkit-scrollbar]:hidden">
      {/* Special offer */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#7c3aed]/15 to-[#2563eb]/20 text-[#4f46e5] sm:h-9 sm:w-9">
          <Gift className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[9px] font-bold tracking-[0.14em] text-slate-500 uppercase sm:text-[10px]">
            Special Offer
          </p>
          <p className="text-[12px] font-bold text-slate-900 sm:text-[13px]">
            Save Up to{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent">
              70%
            </span>
          </p>
        </div>
      </div>

      {features.map((item) => (
        <div key={item.key} className="flex shrink-0 items-center">
          <div
            aria-hidden
            className="mx-2 hidden h-7 w-px bg-[#8eb8de]/50 sm:mx-2.5 sm:block lg:mx-3"
          />
          <div className="flex items-center gap-2">
            <span className="flex shrink-0 items-center justify-center">
              {item.icon}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="text-[12px] font-bold text-slate-900 sm:text-[13px]">
                {item.title}
              </p>
              <p className="text-[10px] font-medium text-slate-500 sm:text-[11px]">
                {item.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="ml-auto flex shrink-0 items-center lg:ml-0">
        <div
          aria-hidden
          className="mr-2.5 hidden h-7 w-px bg-[#8eb8de]/50 sm:block lg:mr-3"
        />
        <Link
          href={routes.hosting}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-3.5 text-[12px] font-semibold whitespace-nowrap text-white shadow-[0_8px_18px_rgba(37,99,235,0.28)] transition hover:brightness-105 sm:h-9 sm:px-4 sm:text-[13px]"
        >
          View Plans
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
        </Link>
      </div>
    </div>
  );
}
