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
        className="rounded-lg px-3 py-2 text-[14px] font-medium text-white/95 transition-colors hover:text-white"
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
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-medium text-white/95 transition-colors hover:text-white"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 text-white/70 transition-transform duration-200",
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
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(10,16,35,0.82)] p-2 shadow-[0_20px_60px_rgb(0_0_0_/_0.45),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-[22px]">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[#AAB2C5] transition-colors hover:bg-white/[0.06] hover:text-white"
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
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[2%] pt-5"
    >
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[76px] w-[96%] max-w-[1280px] items-center justify-between gap-4 rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,16,35,0.55)] px-4 shadow-[0_18px_50px_rgb(0_0_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.1)] backdrop-blur-[22px] sm:px-5 lg:px-6",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 xl:flex"
        >
          {mainNavigation.map((item) => (
            <NavDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={routes.login}
            className="text-[14px] font-medium text-[#AAB2C5] transition-colors hover:text-white"
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
            className="pointer-events-auto mx-auto mt-2 w-[96%] max-w-[1280px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[rgba(10,16,35,0.92)] shadow-[0_20px_60px_rgb(0_0_0_/_0.45)] backdrop-blur-[22px] xl:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
              {mainNavigation.map((item) => (
                <div key={item.label}>
                  {item.children?.length ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium text-white"
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
                                className="block rounded-lg px-3 py-2.5 text-sm text-[#AAB2C5]"
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
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-white"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href={routes.login}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#AAB2C5]"
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
