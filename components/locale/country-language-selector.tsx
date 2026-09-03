"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draftCountry, setDraftCountry] = useState(preferences.country);
  const [draftLanguage, setDraftLanguage] = useState(preferences.language);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
    setTimeout(() => searchRef.current?.focus(), 40);
  }, [preferences.country, preferences.language]);

  const closePanel = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    const onOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        closePanel();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [open, closePanel]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const selectCountry = (option: CountryOption) => {
    setDraftCountry(option.code);
    const langs = Array.from(new Set([...option.languages, "en" as const]));
    if (!langs.includes(draftLanguage))
      setDraftLanguage(option.defaultLanguage);
  };

  const apply = (code?: string) => {
    const countryCode = code ?? draftCountry;
    const draft = getCountry(countryCode);
    const langs = Array.from(new Set([...draft.languages, "en" as const]));
    const lang = langs.includes(draftLanguage)
      ? draftLanguage
      : draft.defaultLanguage;
    applySelection({ country: countryCode, language: lang });
    closePanel();
  };

  const onSearchKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = results[activeIndex];
      if (opt) {
        selectCountry(opt);
        apply(opt.code);
      }
    }
  };

  const draft = getCountry(draftCountry);
  const languageChoices = useMemo(() => {
    const codes = Array.from(new Set<LanguageCode>([...draft.languages, "en"]));
    return codes.filter((c) => Boolean(languages[c]));
  }, [draft.languages]);

  // Trigger label
  const triggerLangCode = preferences.language.toUpperCase();

  if (!mounted) {
    // SSR placeholder — same size, no content
    return (
      <button
        type="button"
        disabled
        className={cn(
          "inline-flex items-center gap-1.5 border text-white",
          compact
            ? "h-8 rounded-[9px] border-white/[0.09] bg-white/[0.04] px-2 text-[12px] font-bold"
            : "h-[38px] rounded-[10px] border-white/[0.10] bg-white/[0.05] px-3 text-[13.5px] font-bold",
          className,
        )}
      >
        <span className="text-[15px] leading-none">🌐</span>
        <span>EN</span>
        <ChevronDown className="size-[10px] opacity-50" />
      </button>
    );
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 border text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]",
          compact
            ? "h-8 rounded-[9px] border-white/[0.09] bg-white/[0.04] px-2 text-[12px] font-bold hover:border-white/[0.20] hover:bg-white/[0.08]"
            : "h-[38px] rounded-[10px] border-white/[0.10] bg-white/[0.05] px-3 text-[13.5px] font-bold hover:border-white/[0.22] hover:bg-white/[0.09]",
          className,
        )}
      >
        <span aria-hidden className="text-[16px] leading-none">
          {countryFlagEmoji(country.code)}
        </span>
        <span className="font-bold tracking-wide">{triggerLangCode}</span>
        <ChevronDown
          className={cn(
            "size-[10px] shrink-0 opacity-50 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {/* ── Inline dropdown (Hostinger style) ── */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute z-[200] mt-2 flex flex-col overflow-hidden rounded-[16px] border border-white/[0.12] bg-[#0c1528] shadow-[0_20px_60px_rgba(0,0,0,0.60)] backdrop-blur-2xl",
              // Position: on mobile open upward if near bottom, desktop opens downward
              compact ? "right-0 w-[320px]" : "right-0 w-[360px]",
            )}
            style={{ maxHeight: "min(480px, 80dvh)" }}
          >
            {/* Title */}
            <div className="shrink-0 border-b border-white/[0.07] px-4 py-3">
              <p className="text-[13px] font-bold text-white">
                {t.locale.selectLocation}
              </p>
            </div>

            {/* Search */}
            <div className="shrink-0 border-b border-white/[0.06] px-3 py-2.5">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-[13px] -translate-y-1/2 text-white/35"
                  aria-hidden
                />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Search country or language…"
                  className="h-[36px] w-full rounded-[9px] border border-white/[0.10] bg-white/[0.05] pr-3 pl-9 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#2563eb]/50 focus:bg-white/[0.07]"
                  autoComplete="off"
                />
              </label>
            </div>

            {/* Country list */}
            <div
              ref={listRef}
              className="hb-locale-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain py-1"
              role="listbox"
            >
              {results.length === 0 ? (
                <p className="px-4 py-6 text-center text-[12px] text-white/40">
                  {t.locale.noResults}
                </p>
              ) : (
                results.map((option, index) => {
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
                      data-active={active}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        selectCountry(option);
                        apply(option.code);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-[9px] text-left transition-colors duration-100",
                        selected
                          ? "bg-[rgba(37,99,235,0.18)] text-white"
                          : active
                            ? "bg-white/[0.06] text-white"
                            : "text-white/80 hover:bg-white/[0.05] hover:text-white",
                      )}
                    >
                      {/* Real flag emoji */}
                      <span
                        aria-hidden
                        className="w-6 shrink-0 text-center text-[18px] leading-none"
                      >
                        {countryFlagEmoji(option.code)}
                      </span>

                      {/* Country name */}
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                        {option.name}
                      </span>

                      {/* Language */}
                      <span className="shrink-0 text-[11.5px] text-white/40">
                        {primaryLang?.nativeLabel ?? primaryLang?.label}
                      </span>

                      {/* Currency badge */}
                      {currencyTag ? (
                        <span className="shrink-0 rounded-[5px] border border-white/[0.10] bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-bold text-white/45">
                          {currencyTag}
                        </span>
                      ) : null}

                      {/* Selected check */}
                      {selected ? (
                        <Check
                          className="size-3.5 shrink-0 text-[#4f8ef7]"
                          aria-hidden
                        />
                      ) : (
                        <span className="size-3.5 shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Language picker (only when multiple languages for selected country) */}
            {languageChoices.length > 1 ? (
              <div className="shrink-0 border-t border-white/[0.07] px-3 py-2.5">
                <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-white/35 uppercase">
                  {t.locale.language}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {languageChoices.map((code) => {
                    const meta = languages[code];
                    const sel = draftLanguage === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setDraftLanguage(code)}
                        className={cn(
                          "rounded-[7px] border px-2.5 py-1 text-[12px] font-medium transition-colors",
                          sel
                            ? "border-[#2563eb]/50 bg-[#2563eb]/18 text-white"
                            : "border-white/[0.10] bg-white/[0.04] text-white/55 hover:text-white",
                        )}
                      >
                        {meta.nativeLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Footer: selected summary */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.07] bg-[rgba(5,8,18,0.6)] px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-[16px] leading-none" aria-hidden>
                  {countryFlagEmoji(draft.code)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-white/80">
                    {draft.name}
                  </p>
                  <p className="text-[10.5px] text-white/38">
                    {languages[draftLanguage]?.nativeLabel ??
                      draftLanguage.toUpperCase()}{" "}
                    · {draft.currency}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => apply()}
                className="inline-flex h-8 shrink-0 items-center rounded-[9px] bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-4 text-[12px] font-bold text-white shadow-[0_0_16px_rgba(37,99,235,0.28)] transition hover:brightness-110"
              >
                {t.locale.apply}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
