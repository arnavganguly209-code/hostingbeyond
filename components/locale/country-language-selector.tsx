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
import { Check, ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  countryFlagEmoji,
  getCountry,
  languages,
  searchCountries,
  type CountryOption,
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
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draftCountry, setDraftCountry] = useState(preferences.country);
  const [draftLanguage, setDraftLanguage] = useState(preferences.language);
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const country = getCountry(preferences.country);
  const results = useMemo(() => searchCountries(query), [query]);

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
    const timer = window.setTimeout(() => searchRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open, closePanel]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectCountry = (option: CountryOption) => {
    setDraftCountry(option.code);
    if (!option.languages.includes(draftLanguage)) {
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
  const availableLanguages = draft.languages;

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
            : "h-10 px-3 text-[14px] font-semibold tracking-tight",
          className,
        )}
      >
        <span aria-hidden className="text-base leading-none">
          {countryFlagEmoji(country.code)}
        </span>
        <span className="uppercase">{preferences.language}</span>
        <ChevronDown className="size-3.5 opacity-60" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              aria-label={t.locale.close}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
              onClick={closePanel}
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }
              }
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-white/12 bg-[#0b1224] shadow-[0_24px_80px_rgb(0_0_0_/_0.55)] sm:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <h2
                  id={titleId}
                  className="text-[15px] font-semibold tracking-tight text-white"
                >
                  {t.locale.selectLocation}
                </h2>
                <button
                  type="button"
                  onClick={closePanel}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/8 hover:text-white"
                  aria-label={t.locale.close}
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="border-b border-white/8 px-5 py-3">
                <label className="relative block">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40"
                    aria-hidden
                  />
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={onListKeyDown}
                    placeholder={t.locale.searchPlaceholder}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-3 pl-10 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--hb-blue)]/50"
                    autoComplete="off"
                  />
                </label>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
                role="listbox"
                aria-label={t.locale.country}
              >
                {results.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-white/50">
                    {t.locale.noResults}
                  </p>
                ) : (
                  results.map((option, index) => {
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
                            ? "bg-[var(--hb-blue)]/15 text-white"
                            : active
                              ? "bg-white/[0.06] text-white"
                              : "text-white/90 hover:bg-white/[0.05]",
                        )}
                      >
                        <span className="text-lg leading-none" aria-hidden>
                          {countryFlagEmoji(option.code)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-medium">
                            {option.name}
                          </span>
                        </span>
                        <span className="shrink-0 text-[13px] text-white/55">
                          {primaryLang?.nativeLabel ?? primaryLang?.label}
                        </span>
                        {selected ? (
                          <Check
                            className="size-4 shrink-0 text-[var(--hb-blue)]"
                            aria-hidden
                          />
                        ) : (
                          <span className="size-4 shrink-0" aria-hidden />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="border-t border-white/8 px-5 py-4">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                  {t.locale.language}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {availableLanguages.map((code) => {
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
                            ? "border-[var(--hb-blue)]/50 bg-[var(--hb-blue)]/15 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white",
                        )}
                      >
                        {meta.nativeLabel}
                      </button>
                    );
                  })}
                  {!availableLanguages.includes("en") ? (
                    <button
                      type="button"
                      onClick={() => setDraftLanguage("en")}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
                        draftLanguage === "en"
                          ? "border-[var(--hb-blue)]/50 bg-[var(--hb-blue)]/15 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white",
                      )}
                    >
                      English
                    </button>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12px] text-white/45">
                    {countryFlagEmoji(draft.code)} {draft.name} ·{" "}
                    {draft.currency}
                  </p>
                  <button
                    type="button"
                    onClick={apply}
                    className="inline-flex h-10 items-center rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hb-blue)]"
                  >
                    {t.locale.apply}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
