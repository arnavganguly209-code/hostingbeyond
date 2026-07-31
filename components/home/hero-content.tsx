"use client";

import { FormEvent, useState } from "react";
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
    const target = query
      ? `${routes.domains}?q=${encodeURIComponent(query)}`
      : routes.domains;
    window.location.href = target;
  };

  return (
    <div className="relative z-10 max-w-xl">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center rounded-md border border-[#4f6bff]/35 bg-[#1a2450]/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md"
      >
        Fast. Secure. Reliable.
      </motion.div>

      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-5 text-[2.35rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-[2.85rem] lg:text-[3.15rem]"
      >
        Everything You Need.
        <br />
        <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9] bg-clip-text text-transparent">
          Beyond Expectations.
        </span>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#A7B0C5] sm:text-base"
      >
        Premium domains, blazing-fast hosting, and secure business email —
        everything you need to build, grow, and succeed online.
      </motion.p>

      <motion.form
        onSubmit={onSearch}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="mt-7 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/15 bg-[#0b1224]/75 p-1.5 shadow-[0_0_30px_rgb(59_130_246_/_0.12)] backdrop-blur-xl"
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
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400"
        />
        <Link
          href={routes.domains}
          className="hidden shrink-0 px-2 text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline"
        >
          Bulk Search
        </Link>
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#C026D3] px-4 text-sm font-semibold text-white shadow-[0_0_20px_rgb(124_58_237_/_0.45)] transition hover:brightness-110"
        >
          <Search className="size-4" aria-hidden />
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
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
              <item.icon className="size-3.5" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-white">
                {item.title}
              </span>
              <span className="block text-[11px] text-slate-400">
                {item.subtitle}
              </span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
