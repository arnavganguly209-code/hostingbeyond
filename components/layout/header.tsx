"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
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
    "Business Email": nav.businessEmail,
    Hosting: nav.hosting,
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
        className="rounded-lg px-3 py-2 text-[15px] font-medium tracking-[-0.01em] text-white/90 transition-colors duration-150 hover:text-white"
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
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium tracking-[-0.01em] text-white/90 transition-colors duration-150 hover:text-white"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-60 transition-transform duration-150",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+8px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[rgba(8,12,28,0.92)] p-1.5 shadow-[0_18px_50px_rgb(0_0_0_/_0.5)] backdrop-blur-xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-white/70 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
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
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[2%] pt-3 sm:pt-4"
    >
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[76px] w-[96%] max-w-[1280px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(8,12,28,0.78)] px-4 shadow-[0_12px_40px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl sm:h-[84px] sm:px-5 lg:px-6",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        <div className="relative z-10 flex h-full min-w-0 items-center overflow-visible">
          <Logo src={logoPath} />
        </div>

        <nav
          aria-label="Primary"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 xl:flex"
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
            className="inline-flex h-10 items-center rounded-lg px-2 text-[15px] font-medium tracking-[-0.01em] text-white/85 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)]"
          >
            {resolvedLogin}
          </Link>
          <GlowButton
            href={getStartedHref}
            size="md"
            className="rounded-xl px-5 transition duration-150 hover:brightness-110"
          >
            {resolvedGetStarted}
          </GlowButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CountryLanguageSelector compact />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)]"
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
            className="pointer-events-auto mx-auto mt-2 w-[96%] max-w-[1280px] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(8,12,28,0.94)] shadow-[0_20px_60px_rgb(0_0_0_/_0.45)] backdrop-blur-xl xl:hidden"
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
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-white"
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
                                  className="block rounded-lg px-3 py-2.5 text-sm text-white/65"
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
                        className="block rounded-xl px-3 py-3 text-sm font-semibold text-white"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="mt-2 border-t border-white/8 pt-3 lg:hidden">
                <p className="mb-2 px-3 text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
                  {t.locale.country}
                </p>
                <div className="px-3">
                  <CountryLanguageSelector className="w-full justify-center" />
                </div>
              </div>
              <Link
                href={loginHref}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-white/70"
                onClick={() => setOpen(false)}
              >
                {resolvedLogin}
              </Link>
              <GlowButton
                href={getStartedHref}
                className="mt-1 w-full rounded-xl"
                size="lg"
              >
                {resolvedGetStarted}
              </GlowButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
