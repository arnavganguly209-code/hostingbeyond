"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { mainNavigation, type NavItem } from "@/config/navigation";
import { routes } from "@/config/routes";
import { CountryLanguageSelector } from "@/components/locale/country-language-selector";
import { useLocale } from "@/components/locale/locale-provider";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

function localizeNavLabel(
  label: string,
  nav: ReturnType<typeof useLocale>["t"]["nav"],
) {
  const map: Record<string, string> = {
    Domains: nav.domains,
    Hosting: nav.hosting,
    "Web Hosting": nav.hosting,
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
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearClose(), []);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="text-[15px] font-extrabold tracking-[0.06em] whitespace-nowrap text-white uppercase transition-colors duration-150 hover:text-white/80"
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
        className="inline-flex items-center gap-1 text-[15px] font-extrabold tracking-[0.06em] whitespace-nowrap text-white uppercase transition-colors duration-150 hover:text-white/80"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn(
            "mt-px size-[12px] shrink-0 opacity-50 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.13, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-[14px] border border-white/[0.09] bg-[rgba(5,8,20,0.98)] py-1 shadow-[0_16px_48px_rgb(0,0,0,0.55)] backdrop-blur-2xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-[10px] text-[13.5px] font-medium text-white/65 transition-colors hover:bg-white/[0.05] hover:text-white"
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

// ─── Fixed nav order ──────────────────────────────────────────────────────────
const NAV_ORDER = [
  "Domains",
  "Hosting",
  "Web Hosting",
  "Business Email",
  "Resources",
];

function sortNav(items: NavItem[]): NavItem[] {
  return [...items].sort((a, b) => {
    const ai = NAV_ORDER.indexOf(a.label);
    const bi = NAV_ORDER.indexOf(b.label);
    const aIdx = ai === -1 ? 99 : ai;
    const bIdx = bi === -1 ? 99 : bi;
    return aIdx - bIdx;
  });
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
    preferences.language === "en" ? loginLabel || "Log In" : t.nav.login;
  const resolvedGetStarted =
    preferences.language === "en"
      ? getStartedLabel || "Get Started"
      : t.nav.getStarted;

  // Remove Cloud & VPS top-level, deduplicate Hosting/Web Hosting, enforce order
  const filteredNav = (() => {
    const cleaned = navigation.filter(
      (item) => !/^cloud\s*&\s*vps$/i.test(item.label.trim()),
    );
    const hasHosting = cleaned.some(
      (item) => item.label === "Hosting" || item.label === "Web Hosting",
    );
    if (!hasHosting) return sortNav(mainNavigation);
    const seen = new Set<string>();
    const deduped = cleaned.filter((item) => {
      const key =
        item.label === "Web Hosting" || item.label === "Hosting"
          ? "hosting"
          : item.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return sortNav(deduped);
  })();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-50 w-full shrink-0 bg-transparent px-[2.5%] pt-3 pb-1.5">
      <div className="mx-auto flex h-[76px] w-full max-w-[1500px] items-center rounded-[18px] border border-white/16 bg-white/[0.10] px-5 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-2xl lg:px-7 xl:px-8">
        {/* Logo — 10% larger */}
        <div className="flex w-[220px] shrink-0 items-center xl:w-[240px]">
          <Logo src={logoPath} className="w-[206px] xl:w-[226px]" />
        </div>

        {/* Desktop nav — centered, bigger + bolder, clear gap between 4 items */}
        <nav
          aria-label="Primary navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-10 lg:flex xl:gap-12"
        >
          {filteredNav.map((item) => (
            <NavDropdown
              key={item.label}
              item={item}
              label={localizeNavLabel(item.label, t.nav)}
            />
          ))}
        </nav>

        {/* Right: language selector + login icon */}
        <div className="hidden shrink-0 items-center justify-end gap-2.5 lg:flex xl:min-w-[220px]">
          <CountryLanguageSelector />
          <Link
            href={loginHref}
            className="inline-flex h-[38px] items-center gap-2 rounded-full border border-white/16 bg-white/[0.08] px-3.5 text-[13px] font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.14]"
          >
            <User className="size-4" aria-hidden />
            {resolvedLogin}
          </Link>
        </div>

        {/* Mobile: compact controls + hamburger */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <CountryLanguageSelector compact />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.04] text-white"
            aria-expanded={open}
            aria-controls="hb-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-[18px]" />
            ) : (
              <Menu className="size-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* ─── Mobile drawer ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="hb-mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.17 }}
            className="mx-auto mt-2 w-full max-w-[1500px] overflow-hidden rounded-[16px] border border-white/[0.08] bg-[rgba(5,8,20,0.97)] shadow-[0_20px_56px_rgb(0,0,0,0.5)] backdrop-blur-2xl lg:hidden"
          >
            <nav
              className="flex flex-col gap-0.5 p-4"
              aria-label="Mobile navigation"
            >
              {filteredNav.map((item) => {
                const label = localizeNavLabel(item.label, t.nav);
                const hasChildren = Boolean(item.children?.length);
                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[16px] font-extrabold text-white"
                          onClick={() =>
                            setMobileSection((s) =>
                              s === item.label ? null : item.label,
                            )
                          }
                        >
                          {label}
                          <ChevronDown
                            className={cn(
                              "size-4 opacity-50 transition-transform duration-200",
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
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children!.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block rounded-lg px-3 py-2.5 text-[13.5px] text-white/60 hover:text-white"
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
                        className="block rounded-xl px-3 py-3 text-[16px] font-extrabold text-white"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.07] pt-3">
                <Link
                  href={loginHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.10] px-3 py-2.5 text-[14px] font-semibold text-white/75"
                  onClick={() => setOpen(false)}
                >
                  <User className="size-4" aria-hidden />
                  {resolvedLogin}
                </Link>
                <Link
                  href={getStartedHref}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-3 py-2.5 text-[14px] font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.28)]"
                  onClick={() => setOpen(false)}
                >
                  {resolvedGetStarted}
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
