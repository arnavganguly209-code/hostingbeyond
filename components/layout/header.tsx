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
        className="py-1.5 text-[14px] font-bold tracking-[-0.01em] whitespace-nowrap text-white/90 uppercase transition-colors hover:text-white xl:text-[15px]"
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
        className="inline-flex items-center gap-1 py-1.5 text-[14px] font-bold tracking-[-0.01em] whitespace-nowrap text-white/90 uppercase transition-colors hover:text-white xl:text-[15px]"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3 opacity-55 transition-transform duration-200",
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
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,8,20,0.96)] p-2 shadow-[0_24px_60px_rgb(0_0_0_/_0.55)] backdrop-blur-2xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-white/80 normal-case transition-colors hover:bg-white/[0.06] hover:text-white"
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

  // Safety: never render a top-level Cloud & VPS item (lives under Web Hosting)
  const navItems = navigation.filter(
    (item) =>
      item.label !== "Cloud & VPS" &&
      !/^cloud\s*&\s*vps$/i.test(item.label.trim()),
  );
  const resolvedNav = navItems.length >= 4 ? navItems : mainNavigation;

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
    <header className="relative z-50 w-full shrink-0 px-[3%] pt-3 pb-1.5 lg:pt-3.5 lg:pb-2">
      <div className="mx-auto flex h-[72px] w-full max-w-[1520px] items-center gap-5 rounded-[20px] border border-[rgba(100,130,255,0.2)] bg-[rgba(6,9,22,0.78)] px-5 shadow-[0_10px_36px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.06)] backdrop-blur-[22px] sm:h-[76px] sm:px-6 lg:h-[80px] lg:gap-7 lg:px-7 xl:gap-8 xl:px-8">
        <div className="flex shrink-0 items-center">
          <Logo
            src={logoPath}
            className="w-[210px] max-w-[210px] sm:w-[230px] sm:max-w-[230px] xl:w-[250px] xl:max-w-[250px]"
          />
        </div>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-8 lg:flex xl:gap-10 2xl:gap-11"
        >
          {resolvedNav.map((item) => (
            <NavDropdown
              key={item.label}
              item={item}
              label={localizeNavLabel(item.label, t.nav)}
            />
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-3.5 lg:ml-0 lg:flex lg:pl-8 xl:pl-10">
          <CountryLanguageSelector className="h-10 rounded-[14px] border border-white/12 bg-white/[0.04] px-3.5 text-[12.5px] font-bold" />
          <Link
            href={loginHref}
            className="inline-flex h-10 items-center px-2.5 text-[14px] font-bold text-white/90 transition hover:text-white"
          >
            {resolvedLogin}
          </Link>
          <GlowButton
            href={getStartedHref}
            size="md"
            className="h-11 min-w-[142px] rounded-[14px] px-4 text-[13px] font-bold shadow-[0_0_20px_rgb(37_99_235_/_0.28)]"
          >
            {resolvedGetStarted}
            <ArrowRight className="size-3.5" aria-hidden />
          </GlowButton>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <CountryLanguageSelector compact />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white"
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
            className="mx-auto mt-2 w-full max-w-[1520px] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,8,22,0.96)] shadow-[0_24px_60px_rgb(0_0_0_/_0.5)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
              {resolvedNav.map((item) => {
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
                              "size-4 transition-transform",
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
    </header>
  );
}
