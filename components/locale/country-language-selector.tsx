"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Globe2, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  countryFlagEmoji,
  getCountry,
  languages,
  searchCountries,
  type CountryOption,
  type LanguageCode,
} from "@/config/geo";
import { useLocale } from "@/components/locale/locale-provider";
import { cn } from "@/lib/utils";

type CountryLanguageSelectorProps = {
  compact?: boolean;
  className?: string;
};

export function CountryLanguageSelector({
  compact = false,
  className,
}: CountryLanguageSelectorProps) {
  const { preferences, applySelection, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draftCountry, setDraftCountry] = useState(preferences.country);
  const [draftLanguage, setDraftLanguage] = useState(preferences.language);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const country = getCountry(preferences.country);
  const results = useMemo(() => searchCountries(query), [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openPanel = useCallback(() => {
    setDraftCountry(preferences.country);
    setDraftLanguage(preferences.language);
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, [preferences.country, preferences.language]);

  const closePanel = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => searchRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open, closePanel]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const selected = listRef.current.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    selected?.scrollIntoView({ block: "nearest" });
  }, [open, draftCountry, results]);

  const selectCountry = (option: CountryOption) => {
    setDraftCountry(option.code);
    const langs = Array.from(new Set([...option.languages, "en" as const]));
    if (!langs.includes(draftLanguage)) {
      setDraftLanguage(option.defaultLanguage);
    }
  };

  const apply = () => {
    applySelection({ country: draftCountry, language: draftLanguage });
    closePanel();
  };

  const onListKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = results[activeIndex];
      if (option) selectCountry(option);
    }
  };

  const draft = getCountry(draftCountry);
  const languageChoices = useMemo(() => {
    const codes = Array.from(new Set<LanguageCode>([...draft.languages, "en"]));
    return codes.filter((code) => Boolean(languages[code]));
  }, [draft.languages]);

  const panel = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              key="locale-overlay"
              className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <button
                type="button"
                aria-label={t.locale.close}
                className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
                onClick={closePanel}
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }
                }
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex h-[min(680px,92dvh)] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[22px] border border-white/12 bg-[#0a1020] shadow-[0_28px_90px_rgb(0_0_0_/_0.65)] sm:rounded-[22px]"
              >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-4">
                  <h2
                    id={titleId}
                    className="text-[15px] font-semibold tracking-tight text-white"
                  >
                    {t.locale.selectLocation}
                  </h2>
                  <button
                    type="button"
                    onClick={closePanel}
                    className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                    aria-label={t.locale.close}
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Search */}
                <div className="shrink-0 border-b border-white/[0.08] px-4 py-3">
                  <label className="relative block">
                    <Search
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
                      aria-hidden
                    />
                    <input
                      ref={searchRef}
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={onListKeyDown}
                      placeholder={t.locale.searchPlaceholder}
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-3 pl-10 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--hb-blue)]/55"
                      autoComplete="off"
                    />
                  </label>
                </div>

                {/* Country list — fixed flex region with dark scrollbar */}
                <div
                  ref={listRef}
                  className="hb-locale-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2"
                  role="listbox"
                  aria-label={t.locale.country}
                >
                  {results.length === 0 ? (
                    <p className="px-3 py-10 text-center text-sm text-white/50">
                      {t.locale.noResults}
                    </p>
                  ) : (
                    <div className="space-y-0.5">
                      {results.map((option, index) => {
                        const selected = option.code === draftCountry;
                        const active = index === activeIndex;
                        const primaryLang = languages[option.defaultLanguage];
                        return (
                          <button
                            key={option.code}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => selectCountry(option)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150",
                              selected
                                ? "bg-[var(--hb-blue)]/18 text-white ring-1 ring-[var(--hb-blue)]/35"
                                : active
                                  ? "bg-white/[0.06] text-white"
                                  : "text-white/90 hover:bg-white/[0.05]",
                            )}
                          >
                            <span
                              className="w-7 shrink-0 text-center text-[18px] leading-none"
                              aria-hidden
                            >
                              {countryFlagEmoji(option.code)}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[14px] font-medium">
                              {option.name}
                            </span>
                            <span className="max-w-[38%] shrink-0 truncate text-right text-[12px] text-white/50">
                              {primaryLang?.nativeLabel ?? primaryLang?.label}
                            </span>
                            <span className="inline-flex size-4 shrink-0 items-center justify-center">
                              {selected ? (
                                <Check
                                  className="size-4 text-[var(--hb-blue)]"
                                  aria-hidden
                                />
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Language + apply — compact, no wasted empty frame */}
                <div className="shrink-0 border-t border-white/[0.08] bg-[#080e1c] px-4 pt-3 pb-4">
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                    {t.locale.language}
                  </p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {languageChoices.map((code) => {
                      const meta = languages[code];
                      const selected = draftLanguage === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => setDraftLanguage(code)}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
                            selected
                              ? "border-[var(--hb-blue)]/55 bg-[var(--hb-blue)]/18 text-white"
                              : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white",
                          )}
                        >
                          {meta.nativeLabel}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-white/85">
                        <span aria-hidden className="mr-1.5">
                          {countryFlagEmoji(draft.code)}
                        </span>
                        {draft.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/45">
                        {languages[draftLanguage]?.nativeLabel ??
                          draftLanguage.toUpperCase()}{" "}
                        · {draft.currency}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={apply}
                      className="inline-flex h-11 shrink-0 items-center rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-6 text-sm font-semibold text-white shadow-[0_0_22px_rgb(10_132_255_/_0.28)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)]"
                    >
                      {t.locale.apply}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null;

  const languageMeta = languages[preferences.language];
  const languageButtonLabel =
    preferences.language === "en"
      ? "English (US)"
      : (languageMeta?.nativeLabel ??
        languageMeta?.label ??
        preferences.language.toUpperCase());

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)]",
          compact
            ? "h-9 px-2.5 text-[13px] font-semibold"
            : "h-11 px-3.5 text-[13px] font-bold tracking-tight",
          className,
        )}
      >
        {compact ? (
          <span aria-hidden className="text-base leading-none">
            {countryFlagEmoji(country.code)}
          </span>
        ) : (
          <Globe2 className="size-3.5 shrink-0 opacity-80" aria-hidden />
        )}
        <span className={cn("truncate", compact && "uppercase")}>
          {compact ? preferences.language : languageButtonLabel}
        </span>
        <ChevronDown className="size-3.5 shrink-0 opacity-60" aria-hidden />
      </button>
      {panel}
    </>
  );
}
