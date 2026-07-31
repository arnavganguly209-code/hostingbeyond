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
    <div className="relative z-20 mx-auto w-full max-w-xl lg:mx-0">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center rounded-full border border-[#6F3CFF]/35 bg-[rgba(10,16,35,0.7)] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md"
      >
        Fast • Secure • Reliable
      </motion.div>

      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="mt-4 text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem]"
      >
        Everything You Need.
        <br />
        <span className="bg-gradient-to-r from-[#0A84FF] via-[#5B6CFF] to-[#6F3CFF] bg-clip-text text-transparent">
          Beyond Expectations.
        </span>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mt-4 max-w-md text-[14px] leading-relaxed text-[#AAB2C5] sm:text-[15px]"
      >
        Premium domains, blazing-fast hosting, and secure business email —
        everything you need to build, grow, and succeed online.
      </motion.p>

      <motion.form
        onSubmit={onSearch}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="mt-7 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-white/14 bg-[rgba(10,16,35,0.8)] p-1.5 shadow-[0_12px_40px_rgb(0_0_0_/_0.35),0_0_0_1px_rgb(10_132_255_/_0.08),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl"
      >
        <label htmlFor="domain-search" className="sr-only">
          Find your perfect domain
        </label>
        <input
          id="domain-search"
          type="text"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          placeholder="Find your perfect domain"
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
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#0A84FF] to-[#6F3CFF] px-5 text-sm font-semibold text-white shadow-[0_0_22px_rgb(10_132_255_/_0.4)] transition hover:brightness-110"
        >
          <Search className="size-4" aria-hidden />
          Search
        </button>
      </motion.form>

      <motion.ul
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {trustItems.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#0A84FF]/30 bg-[#0A84FF]/10 text-[#7CC4FF]">
              <item.icon className="size-3.5" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block text-[12px] font-semibold text-white sm:text-[13px]">
                {item.title}
              </span>
              <span className="mt-0.5 block text-[11px] text-[#AAB2C5]">
                {item.subtitle}
              </span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
