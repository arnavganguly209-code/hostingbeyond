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

  // Keyboard / scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => searchRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open, closePanel]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, draftCountry, results]);

  const selectCountry = (option: CountryOption) => {
    setDraftCountry(option.code);
    const langs = Array.from(new Set([...option.languages, "en" as const]));
    if (!langs.includes(draftLanguage))
      setDraftLanguage(option.defaultLanguage);
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

  // ─── Trigger button label ────────────────────────────────────────────────
  const languageMeta = languages[preferences.language];
  const triggerLabel =
    preferences.language === "en"
      ? "English (US)"
      : (languageMeta?.nativeLabel ??
        languageMeta?.label ??
        preferences.language.toUpperCase());

  // ─── Portal panel ────────────────────────────────────────────────────────
  const panel = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              key="locale-overlay"
              className="fixed inset-0 z-[300] flex items-end justify-center p-0 sm:items-center sm:p-4"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* backdrop */}
              <button
                type="button"
                aria-label={t.locale.close}
                className="absolute inset-0 bg-[rgba(0,0,0,0.68)] backdrop-blur-[4px]"
                onClick={closePanel}
              />

              {/* modal */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.985 }
                }
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex w-full max-w-[480px] flex-col overflow-hidden rounded-t-[20px] border border-[rgba(255,255,255,0.10)] bg-[#080e1d] shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:rounded-[20px]"
                style={{ maxHeight: "min(620px, 92dvh)" }}
              >
                {/* ── Header ── */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.07)] px-5 py-4">
                  <div>
                    <h2
                      id={titleId}
                      className="text-[14px] font-bold tracking-[-0.01em] text-white"
                    >
                      {t.locale.selectLocation}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-[rgba(255,255,255,0.42)]">
                      Choose your country and language
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closePanel}
                    className="inline-flex size-8 items-center justify-center rounded-[9px] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.55)] transition hover:bg-[rgba(255,255,255,0.07)] hover:text-white"
                    aria-label={t.locale.close}
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                {/* ── Search ── */}
                <div className="shrink-0 border-b border-[rgba(255,255,255,0.06)] px-4 py-3">
                  <label className="relative block">
                    <Search
                      className="pointer-events-none absolute top-1/2 left-3 size-[14px] -translate-y-1/2 text-[rgba(255,255,255,0.35)]"
                      aria-hidden
                    />
                    <input
                      ref={searchRef}
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={onListKeyDown}
                      placeholder={t.locale.searchPlaceholder}
                      className="h-[38px] w-full rounded-[10px] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] pr-3 pl-9 text-[13px] text-white outline-none placeholder:text-[rgba(255,255,255,0.32)] focus:border-[rgba(37,99,235,0.5)] focus:bg-[rgba(255,255,255,0.05)]"
                      autoComplete="off"
                    />
                  </label>
                </div>

                {/* ── Country list ── */}
                <div
                  ref={listRef}
                  className="hb-locale-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-1.5"
                  role="listbox"
                  aria-label={t.locale.country}
                >
                  {results.length === 0 ? (
                    <p className="px-3 py-8 text-center text-[13px] text-[rgba(255,255,255,0.4)]">
                      {t.locale.noResults}
                    </p>
                  ) : (
                    <div>
                      {results.map((option, index) => {
                        const selected = option.code === draftCountry;
                        const active = index === activeIndex;
                        const primaryLang = languages[option.defaultLanguage];
                        const currencyTag =
                          option.currency !== "USD" ? option.currency : null;
                        return (
                          <button
                            key={option.code}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => selectCountry(option)}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left transition-colors duration-100",
                              selected
                                ? "bg-[rgba(37,99,235,0.16)] ring-1 ring-[rgba(37,99,235,0.32)]"
                                : active
                                  ? "bg-[rgba(255,255,255,0.05)]"
                                  : "hover:bg-[rgba(255,255,255,0.04)]",
                            )}
                          >
                            {/* Flag */}
                            <span
                              className="w-6 shrink-0 text-center text-[16px] leading-none"
                              aria-hidden
                            >
                              {countryFlagEmoji(option.code)}
                            </span>

                            {/* Country name */}
                            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[rgba(255,255,255,0.88)]">
                              {option.name}
                            </span>

                            {/* Language */}
                            <span className="shrink-0 text-[11.5px] text-[rgba(255,255,255,0.42)]">
                              {primaryLang?.nativeLabel ?? primaryLang?.label}
                            </span>

                            {/* Currency tag (non-USD only) */}
                            {currencyTag ? (
                              <span className="hidden shrink-0 rounded-[5px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 text-[10px] font-semibold text-[rgba(255,255,255,0.38)] sm:inline">
                                {currencyTag}
                              </span>
                            ) : null}

                            {/* Check */}
                            <span className="inline-flex size-[15px] shrink-0 items-center justify-center">
                              {selected ? (
                                <Check
                                  className="size-3.5 text-[#4f8ef7]"
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

                {/* ── Language picker + apply ── */}
                <div className="shrink-0 border-t border-[rgba(255,255,255,0.07)] bg-[rgba(5,8,18,0.85)] px-4 pt-3 pb-4">
                  {languageChoices.length > 1 ? (
                    <>
                      <p className="mb-2 text-[10.5px] font-bold tracking-[0.13em] text-[rgba(255,255,255,0.38)] uppercase">
                        {t.locale.language}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {languageChoices.map((code) => {
                          const meta = languages[code];
                          const sel = draftLanguage === code;
                          return (
                            <button
                              key={code}
                              type="button"
                              onClick={() => setDraftLanguage(code)}
                              className={cn(
                                "rounded-[8px] border px-2.5 py-1 text-[12px] font-medium transition-colors duration-120",
                                sel
                                  ? "border-[rgba(37,99,235,0.5)] bg-[rgba(37,99,235,0.16)] text-white"
                                  : "border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.62)] hover:border-[rgba(255,255,255,0.18)] hover:text-white",
                              )}
                            >
                              {meta.nativeLabel}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : null}

                  <div className="flex items-center gap-3">
                    {/* Selected country summary */}
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="text-[18px] leading-none" aria-hidden>
                        {countryFlagEmoji(draft.code)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-[rgba(255,255,255,0.88)]">
                          {draft.name}
                        </p>
                        <p className="text-[11px] text-[rgba(255,255,255,0.38)]">
                          {languages[draftLanguage]?.nativeLabel ??
                            draftLanguage.toUpperCase()}
                          {" · "}
                          {draft.currency}
                        </p>
                      </div>
                    </div>
                    {/* Apply */}
                    <button
                      type="button"
                      onClick={apply}
                      className="inline-flex h-10 shrink-0 items-center rounded-[10px] bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-5 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.28)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
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

  // ─── Trigger button ──────────────────────────────────────────────────────
  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 border text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]",
          compact
            ? "h-8 rounded-[9px] border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] px-2 text-[12px] font-semibold"
            : "h-[36px] rounded-[10px] border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] px-3 text-[13px] font-semibold hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.07)]",
          className,
        )}
      >
        {compact ? (
          <span aria-hidden className="text-[15px] leading-none">
            {countryFlagEmoji(country.code)}
          </span>
        ) : (
          <>
            <Globe2 className="size-3.5 shrink-0 opacity-75" aria-hidden />
            <span className="max-w-[110px] truncate">{triggerLabel}</span>
          </>
        )}
        <ChevronDown className="size-3 shrink-0 opacity-45" aria-hidden />
      </button>
      {panel}
    </>
  );
}
