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
    <div className="relative z-20 w-full">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="inline-flex items-center rounded-full border border-[var(--hb-purple)]/35 bg-[var(--hb-glass-strong)] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md"
      >
        Fast • Secure • Reliable
      </motion.div>

      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.5 }}
        className="mt-4 text-[2.2rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-[2.7rem] lg:text-[3.05rem] xl:text-[3.3rem]"
      >
        Everything You Need.
        <br />
        <span className="bg-gradient-to-r from-[var(--hb-blue)] via-[#5B6CFF] to-[var(--hb-purple)] bg-clip-text text-transparent">
          Beyond Expectations.
        </span>
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
        className="mt-4 max-w-md text-[14px] leading-relaxed text-[var(--hb-muted)] sm:text-[15px]"
      >
        Premium domains, blazing-fast hosting, and secure business email —
        everything you need to build, grow, and succeed online.
      </motion.p>

      <motion.form
        onSubmit={onSearch}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.45 }}
        className="mt-7 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-[var(--hb-border-blue)] bg-[var(--hb-glass-strong)] p-1.5 shadow-[0_12px_40px_rgb(0_0_0_/_0.35),0_0_28px_var(--hb-glow-blue),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl"
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
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--hb-muted)]/80"
        />
        <Link
          href={routes.domains}
          className="hidden shrink-0 px-2 text-sm font-medium text-[var(--hb-muted)] transition-colors hover:text-white sm:inline"
        >
          Bulk Search
        </Link>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-5 text-sm font-semibold text-white shadow-[0_0_22px_var(--hb-glow-blue)] transition hover:brightness-110"
        >
          <Search className="size-4" aria-hidden />
          Search
        </button>
      </motion.form>

      <motion.ul
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.45 }}
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {trustItems.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--hb-blue)]/35 bg-[var(--hb-blue)]/10 text-[#7CC4FF] shadow-[0_0_16px_rgb(10_132_255_/_0.25)]">
              <item.icon className="size-3.5" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block text-[12px] font-semibold text-white sm:text-[13px]">
                {item.title}
              </span>
              <span className="mt-0.5 block text-[11px] text-[var(--hb-muted)]">
                {item.subtitle}
              </span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
