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
        className="text-[14px] font-semibold whitespace-nowrap text-[rgba(255,255,255,0.82)] transition-colors duration-150 hover:text-white"
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
        className="inline-flex items-center gap-1 text-[14px] font-semibold whitespace-nowrap text-[rgba(255,255,255,0.82)] transition-colors duration-150 hover:text-white"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn(
            "mt-px size-[10px] shrink-0 opacity-45 transition-transform duration-200",
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
            className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[210px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[rgba(5,8,20,0.98)] py-1 shadow-[0_16px_48px_rgb(0,0,0,0.55)] backdrop-blur-2xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-[10px] text-[13px] font-medium text-[rgba(255,255,255,0.68)] transition-colors hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
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
    preferences.language === "en" ? loginLabel || "Log In" : t.nav.login;
  const resolvedGetStarted =
    preferences.language === "en"
      ? getStartedLabel || "Get Started"
      : t.nav.getStarted;

  // Remove any legacy top-level "Cloud & VPS" — it lives under Hosting dropdown now.
  const filteredNav = (() => {
    const cleaned = navigation.filter(
      (item) => !/^cloud\s*&\s*vps$/i.test(item.label.trim()),
    );
    const hasHosting = cleaned.some(
      (item) => item.label === "Hosting" || item.label === "Web Hosting",
    );
    if (!hasHosting) return mainNavigation;
    const seen = new Set<string>();
    return cleaned.filter((item) => {
      const key =
        item.label === "Web Hosting" || item.label === "Hosting"
          ? "hosting"
          : item.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
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
    <header className="relative z-50 w-full shrink-0 bg-[#050816] px-[2.5%] pt-3 pb-1.5">
      {/* ─── Glass nav bar ─────────────────────────────────── */}
      <div className="mx-auto flex h-[72px] w-full max-w-[1500px] items-center rounded-[16px] border border-[rgba(255,255,255,0.09)] bg-[rgba(6,9,22,0.82)] px-5 shadow-[0_6px_28px_rgb(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[20px] lg:px-7 xl:px-8">
        {/* Logo */}
        <div className="flex w-[190px] shrink-0 items-center xl:w-[210px]">
          <Logo src={logoPath} className="w-[170px] xl:w-[190px]" />
        </div>

        {/* Desktop nav — centered */}
        <nav
          aria-label="Primary navigation"
          className="hidden min-w-0 flex-1 items-center justify-center gap-8 lg:flex xl:gap-9"
        >
          {filteredNav.map((item) => (
            <NavDropdown
              key={item.label}
              item={item}
              label={localizeNavLabel(item.label, t.nav)}
            />
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden w-[210px] shrink-0 items-center justify-end gap-2 lg:flex xl:w-[240px]">
          <CountryLanguageSelector className="h-[36px] rounded-[10px] border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] px-3 text-[13px] font-semibold hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.07)]" />
          <Link
            href={loginHref}
            className="px-1 text-[13.5px] font-semibold whitespace-nowrap text-[rgba(255,255,255,0.78)] transition-colors duration-150 hover:text-white"
          >
            {resolvedLogin}
          </Link>
          <GlowButton
            href={getStartedHref}
            size="md"
            className="h-[36px] min-w-[118px] shrink-0 rounded-[10px] px-4 text-[13px] font-semibold"
          >
            {resolvedGetStarted}
            <ArrowRight className="size-3.5" aria-hidden />
          </GlowButton>
        </div>

        {/* Mobile: compact controls + hamburger */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <CountryLanguageSelector compact />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-white"
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

      {/* ─── Mobile drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="hb-mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.17 }}
            className="mx-auto mt-2 w-full max-w-[1500px] overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(5,8,20,0.97)] shadow-[0_20px_56px_rgb(0,0,0,0.5)] backdrop-blur-2xl lg:hidden"
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
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-white"
                          onClick={() =>
                            setMobileSection((s) =>
                              s === item.label ? null : item.label,
                            )
                          }
                        >
                          {label}
                          <ChevronDown
                            className={cn(
                              "size-4 opacity-45 transition-transform duration-200",
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
                                  className="block rounded-lg px-3 py-2.5 text-[13.5px] text-[rgba(255,255,255,0.65)] hover:text-white"
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
                        className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-white"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="mt-3 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.07)] pt-3">
                <Link
                  href={loginHref}
                  className="rounded-xl border border-[rgba(255,255,255,0.10)] px-3 py-2.5 text-center text-[14px] font-semibold text-[rgba(255,255,255,0.78)]"
                  onClick={() => setOpen(false)}
                >
                  {resolvedLogin}
                </Link>
                <GlowButton
                  href={getStartedHref}
                  className="w-full rounded-xl font-semibold"
                  size="lg"
                >
                  {resolvedGetStarted}
                  <ArrowRight className="size-4" aria-hidden />
                </GlowButton>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
