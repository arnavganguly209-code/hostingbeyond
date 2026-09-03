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
    timeoutRef.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => () => clearClose(), []);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="py-1.5 text-[13.5px] font-semibold whitespace-nowrap text-white/85 transition-colors duration-150 hover:text-white xl:text-[14px]"
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
        className="inline-flex items-center gap-[5px] py-1.5 text-[13.5px] font-semibold whitespace-nowrap text-white/85 transition-colors duration-150 hover:text-white xl:text-[14px]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-[11px] opacity-50 transition-transform duration-200",
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
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+8px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-[16px] border border-white/[0.09] bg-[rgba(6,9,22,0.97)] py-1.5 shadow-[0_20px_56px_rgb(0_0_0_/_0.55)] backdrop-blur-2xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
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

  // Remove any legacy top-level "Cloud & VPS" — it lives under Hosting now.
  // Then drop "Web Hosting" if a "Hosting" item already exists (dedup).
  const filteredNav = (() => {
    const cleaned = navigation.filter(
      (item) => !/^cloud\s*&\s*vps$/i.test(item.label.trim()),
    );
    const hasHosting = cleaned.some(
      (item) => item.label === "Hosting" || item.label === "Web Hosting",
    );
    if (!hasHosting) return mainNavigation;
    // If both "Hosting" and "Web Hosting" exist, keep the first one found
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
    <header className="relative z-50 w-full shrink-0 bg-[#050816] px-[3%] pt-3 pb-1.5">
      {/* Glass pill nav bar */}
      <div className="mx-auto flex h-[74px] w-full max-w-[1520px] items-center rounded-[18px] border border-white/[0.10] bg-[rgba(7,10,24,0.80)] px-6 shadow-[0_8px_32px_rgb(0_0_0_/_0.30),inset_0_1px_0_rgb(255_255_255_/_0.05)] backdrop-blur-[24px] sm:h-[76px] lg:h-[78px] lg:px-7 xl:px-8">
        {/* Logo — fixed width so nav can center properly */}
        <div className="flex w-[200px] shrink-0 items-center xl:w-[220px]">
          <Logo
            src={logoPath}
            className="w-[180px] max-w-[180px] xl:w-[200px] xl:max-w-[200px]"
          />
        </div>

        {/* Nav — centered via flex-1 */}
        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex xl:gap-8 2xl:gap-9"
        >
          {filteredNav.map((item) => (
            <NavDropdown
              key={item.label}
              item={item}
              label={localizeNavLabel(item.label, t.nav)}
            />
          ))}
        </nav>

        {/* Right controls — fixed width mirrors logo for balance */}
        <div className="hidden w-[200px] shrink-0 items-center justify-end gap-2.5 lg:flex xl:w-[240px] xl:gap-3">
          <CountryLanguageSelector className="h-9 rounded-[12px] border-white/[0.09] bg-white/[0.04] px-3 text-[12px] font-semibold" />
          <Link
            href={loginHref}
            className="text-[13.5px] font-semibold whitespace-nowrap text-white/80 transition hover:text-white"
          >
            {resolvedLogin}
          </Link>
          <GlowButton
            href={getStartedHref}
            size="md"
            className="h-[38px] min-w-[120px] rounded-[12px] px-4 text-[13px] font-semibold shadow-[0_0_18px_rgb(37_99_235_/_0.22)]"
          >
            {resolvedGetStarted}
            <ArrowRight className="size-3.5" aria-hidden />
          </GlowButton>
        </div>

        {/* Mobile: logo + hamburger */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <CountryLanguageSelector compact />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 w-full max-w-[1520px] overflow-hidden rounded-[18px] border border-white/[0.09] bg-[rgba(6,9,22,0.97)] shadow-[0_20px_56px_rgb(0_0_0_/_0.5)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-0.5 p-4" aria-label="Mobile">
              {filteredNav.map((item) => {
                const label = localizeNavLabel(item.label, t.nav);
                return (
                  <div key={item.label}>
                    {item.children?.length ? (
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
                              "size-4 opacity-50 transition-transform",
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
                              className="overflow-hidden pl-3"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block rounded-lg px-3 py-2.5 text-[14px] text-white/70"
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
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3">
                <Link
                  href={loginHref}
                  className="rounded-xl border border-white/10 px-3 py-2.5 text-center text-[14px] font-semibold text-white/80"
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
