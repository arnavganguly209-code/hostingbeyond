"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { mainNavigation, type NavItem } from "@/config/navigation";
import { routes } from "@/config/routes";
import { CountryLanguageSelector } from "@/components/locale/country-language-selector";
import { useLocale } from "@/components/locale/locale-provider";
import { GlowButton } from "@/components/shared/glow-button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

function localizeNavLabel(
  label: string,
  nav: ReturnType<typeof useLocale>["t"]["nav"],
) {
  const map: Record<string, string> = {
    Domains: nav.domains,
    "Web Hosting": nav.hosting,
    Hosting: nav.hosting,
    "Cloud & VPS": "Cloud & VPS",
    "Business Email": nav.businessEmail,
    Resources: nav.resources,
  };
  return map[label] ?? label;
}

function NavDropdown({ item, label }: { item: NavItem; label: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const scheduleClose = () => {
    clearClose();
    timeoutRef.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => () => clearClose(), []);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="rounded-lg px-1 py-2 text-[15px] font-bold tracking-[-0.01em] text-white/92 transition-colors duration-200 hover:text-white"
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg px-1 py-2 text-[15px] font-bold tracking-[-0.01em] text-white/92 transition-colors duration-200 hover:text-white"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-50 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[236px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,8,20,0.95)] p-2 shadow-[0_24px_60px_rgb(0_0_0_/_0.55)] backdrop-blur-2xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-white/80 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader({
  navigation = mainNavigation,
  loginLabel,
  loginHref = routes.login,
  getStartedLabel,
  getStartedHref = routes.getStarted,
  logoPath,
}: {
  navigation?: NavItem[];
  loginLabel?: string;
  loginHref?: string;
  getStartedLabel?: string;
  getStartedHref?: string;
  logoPath?: string;
} = {}) {
  const { t, preferences } = useLocale();
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const resolvedLogin =
    preferences.language === "en" && loginLabel ? loginLabel : t.nav.login;
  const resolvedGetStarted =
    preferences.language === "en" && getStartedLabel
      ? getStartedLabel
      : t.nav.getStarted;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-[var(--hb-bg)]/80 px-[2%] pt-3 pb-2 backdrop-blur-md sm:pt-3.5 sm:pb-2.5"
    >
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[78px] w-full max-w-[1480px] items-center justify-between gap-4 rounded-[22px] border border-[rgba(100,130,255,0.18)] px-5 shadow-[0_12px_40px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.07)] backdrop-blur-[20px] sm:h-[84px] sm:px-7 lg:h-[88px] lg:px-8",
          "bg-[rgba(5,8,20,0.82)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/30 to-transparent"
        />

        <div className="relative z-10 flex h-full min-w-0 shrink-0 items-center">
          <Logo
            src={logoPath}
            className="w-[min(260px,40vw)] max-w-none sm:w-[min(272px,38vw)]"
          />
        </div>

        <nav
          aria-label="Primary"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 xl:flex 2xl:gap-8"
        >
          {navigation.map((item) => (
            <NavDropdown
              key={item.label}
              item={item}
              label={localizeNavLabel(item.label, t.nav)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CountryLanguageSelector />
          <Link
            href={loginHref}
            className="inline-flex h-11 items-center rounded-xl border border-white/12 bg-transparent px-4 text-[14px] font-bold tracking-[-0.01em] text-white/90 transition duration-200 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
          >
            {resolvedLogin}
          </Link>
          <GlowButton
            href={getStartedHref}
            size="md"
            className="h-[48px] min-w-[150px] rounded-[15px] px-5 text-[14px] font-bold shadow-[0_0_24px_rgb(37_99_235_/_0.32)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
          >
            {resolvedGetStarted}
            <ArrowRight className="size-4" aria-hidden />
          </GlowButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CountryLanguageSelector compact />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-150 hover:bg-white/[0.08]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 w-full max-w-[1480px] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,8,22,0.96)] shadow-[0_24px_60px_rgb(0_0_0_/_0.5)] backdrop-blur-2xl xl:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
              {navigation.map((item) => {
                const label = localizeNavLabel(item.label, t.nav);
                return (
                  <div key={item.label}>
                    {item.children?.length ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-[16px] font-bold text-white"
                          onClick={() =>
                            setMobileSection((current) =>
                              current === item.label ? null : item.label,
                            )
                          }
                        >
                          {label}
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-150",
                              mobileSection === item.label && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSection === item.label ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-2"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-white/80"
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block rounded-xl px-3 py-3.5 text-[16px] font-bold text-white"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <Link
                href={loginHref}
                className="mt-2 rounded-xl border border-white/10 px-3 py-3 text-center text-[15px] font-bold text-white/85"
                onClick={() => setOpen(false)}
              >
                {resolvedLogin}
              </Link>
              <GlowButton
                href={getStartedHref}
                className="mt-1 w-full rounded-xl font-bold"
                size="lg"
              >
                {resolvedGetStarted}
                <ArrowRight className="size-4" aria-hidden />
              </GlowButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
