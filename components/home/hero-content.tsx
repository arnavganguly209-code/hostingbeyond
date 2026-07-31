"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { Headphones, Lock, Search, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { routes } from "@/config/routes";

const trustItems = [
  {
    title: "99.99% Uptime",
    subtitle: "Network Guarantee",
    icon: ShieldCheck,
  },
  {
    title: "Secure & Trusted",
    subtitle: "Your data is safe",
    icon: Lock,
  },
  {
    title: "24/7 Expert Support",
    subtitle: "We're here for you",
    icon: Headphones,
  },
] as const;

export function HeroContent() {
  const reduceMotion = useReducedMotion();
  const [domain, setDomain] = useState("");

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = domain.trim();
    window.location.href = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
  };

  return (
    <div className="relative z-20 max-w-xl xl:max-w-[560px]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center rounded-full border border-[#6F3CFF]/35 bg-[rgba(10,16,35,0.65)] px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-md"
      >
        Fast • Secure • Reliable
      </motion.div>

      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-5 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight text-white sm:text-[3.1rem] lg:text-[3.45rem]"
      >
        Everything You Need.
        <br />
        <span className="bg-gradient-to-r from-[#0A84FF] via-[#5B6CFF] to-[#6F3CFF] bg-clip-text text-transparent">
          Beyond Expectations.
        </span>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#AAB2C5] sm:text-base"
      >
        Premium domains, lightning-fast hosting, secure business email,
        enterprise cloud hosting, VPS, reseller hosting, SSL protection, and
        everything you need to build, manage, and grow your online business with
        confidence.
      </motion.p>

      <motion.form
        onSubmit={onSearch}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border border-white/12 bg-[rgba(10,16,35,0.72)] p-1.5 shadow-[0_0_40px_rgb(10_132_255_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl"
      >
        <label htmlFor="domain-search" className="sr-only">
          Find your perfect domain
        </label>
        <input
          id="domain-search"
          type="text"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          placeholder="Find your perfect domain..."
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-[#AAB2C5]/80"
        />
        <Link
          href={routes.domains}
          className="hidden shrink-0 px-2 text-sm font-medium text-[#AAB2C5] transition-colors hover:text-white sm:inline"
        >
          Bulk Search
        </Link>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#0A84FF] to-[#6F3CFF] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgb(10_132_255_/_0.45)] transition hover:brightness-110"
        >
          <Search
            className="size-4 drop-shadow-[0_0_8px_rgb(10_132_255)]"
            aria-hidden
          />
          Search
        </button>
      </motion.form>

      <motion.ul
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="mt-8 grid gap-4 sm:grid-cols-3"
      >
        {trustItems.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#0A84FF]/30 bg-[#0A84FF]/10 text-[#7CC4FF]">
              <item.icon className="size-3.5" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-white">
                {item.title}
              </span>
              <span className="block text-[11px] text-[#AAB2C5]">
                {item.subtitle}
              </span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
