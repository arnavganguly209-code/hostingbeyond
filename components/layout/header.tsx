"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { mainNavigation, type NavItem } from "@/config/navigation";
import { routes } from "@/config/routes";
import { GlowButton } from "@/components/shared/glow-button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

function NavDropdown({ item }: { item: NavItem }) {
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
        className="rounded-lg px-3.5 py-2 text-[17px] font-semibold tracking-tight text-white transition-colors duration-200 hover:text-[var(--hb-blue)]"
      >
        {item.label}
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
        className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[17px] font-semibold tracking-tight text-white transition-colors duration-200 hover:text-[var(--hb-blue)]"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-200",
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
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--hb-border)] bg-[var(--hb-glass-strong)] p-2 shadow-[0_20px_60px_rgb(0_0_0_/_0.45)] backdrop-blur-[var(--hb-header-blur)]">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[var(--hb-muted)] transition-colors hover:bg-white/[0.06] hover:text-white"
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[2%] pt-4"
    >
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[92px] w-[96%] max-w-[1280px] items-center justify-between gap-4 rounded-[var(--hb-header-radius)] border border-[var(--hb-border-blue)] bg-[var(--hb-glass)] px-5 shadow-[0_18px_50px_rgb(0_0_0_/_0.4),0_0_0_1px_rgb(10_132_255_/_0.12),0_0_40px_rgb(10_132_255_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-[var(--hb-header-blur)] lg:px-7",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hb-blue)]/50 to-transparent"
        />

        <div className="relative z-10 flex h-full items-center overflow-visible">
          <Logo />
        </div>

        <nav
          aria-label="Primary"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 xl:flex"
        >
          {mainNavigation.map((item) => (
            <NavDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={routes.login}
            className="inline-flex h-10 items-center text-[17px] font-semibold tracking-tight text-white transition-colors hover:text-[var(--hb-blue)]"
          >
            Login
          </Link>
          <GlowButton
            href={routes.getStarted}
            size="md"
            className="rounded-xl px-5"
          >
            Get Started
          </GlowButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto mx-auto mt-2 w-[96%] max-w-[1280px] overflow-hidden rounded-[var(--hb-header-radius)] border border-[var(--hb-border)] bg-[var(--hb-glass-strong)] shadow-[0_20px_60px_rgb(0_0_0_/_0.45)] backdrop-blur-[var(--hb-header-blur)] xl:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
              {mainNavigation.map((item) => (
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
                        {item.label}
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
                                className="block rounded-lg px-3 py-2.5 text-sm text-[var(--hb-muted)]"
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
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href={routes.login}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[var(--hb-muted)]"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <GlowButton
                href={routes.getStarted}
                className="mt-2 w-full rounded-xl"
                size="lg"
              >
                Get Started
              </GlowButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
