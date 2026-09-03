"use client";

import { useEffect, useState } from "react";

import { OrbitImageField } from "@/components/orbit/image-field";
import type {
  CmsDomainTld,
  CmsHomeSections,
  CmsProductOffer,
} from "@/lib/orbit/defaults";

export default function OrbitContentPage() {
  const [sections, setSections] = useState<CmsHomeSections | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/orbit/content/home");
      const json = await res.json();
      if (res.ok) setSections(json.sections);
      else setStatus(json.error || "Failed to load content");
    })();
  }, []);

  async function save() {
    if (!sections) return;
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/orbit/content/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections }),
    });
    const json = await res.json();
    setSaving(false);
    setStatus(res.ok ? "Saved successfully" : json.error || "Save failed");
    if (res.ok && json.sections) setSections(json.sections);
  }

  function updateOffer(index: number, patch: Partial<CmsProductOffer>) {
    if (!sections) return;
    const offers = [...sections.products.offers];
    offers[index] = { ...offers[index], ...patch };
    setSections({
      ...sections,
      products: { ...sections.products, offers },
    });
  }

  function moveOffer(index: number, direction: -1 | 1) {
    if (!sections) return;
    const target = index + direction;
    if (target < 0 || target >= sections.products.offers.length) return;
    const offers = [...sections.products.offers];
    const [item] = offers.splice(index, 1);
    offers.splice(target, 0, item);
    setSections({
      ...sections,
      products: {
        ...sections.products,
        offers: offers.map((offer, order) => ({ ...offer, order })),
      },
    });
  }

  if (!sections) {
    return <p className="text-sm text-[var(--hb-muted)]">Loading content…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Website Content</h1>
          <p className="mt-1 text-sm text-[var(--hb-muted)]">
            Full editor for homepage hero and service cards.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-[var(--hb-muted)] hover:text-white"
          >
            Preview site
          </a>
          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="rounded-xl bg-gradient-to-r from-[var(--hb-blue)] to-[var(--hb-purple)] px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {status ? <p className="text-sm text-emerald-300">{status}</p> : null}

      {/* HERO */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Hero section</h2>
          <label className="flex items-center gap-2 text-xs text-[var(--hb-muted)]">
            <input
              type="checkbox"
              checked={sections.hero.visible}
              onChange={(e) =>
                setSections({
                  ...sections,
                  hero: { ...sections.hero, visible: e.target.checked },
                })
              }
            />
            Visible
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={sections.hero.eyebrow ?? ""}
            onChange={(value) =>
              setSections({
                ...sections,
                hero: { ...sections.hero, eyebrow: value },
              })
            }
          />
          <Field
            label="Search button text"
            value={sections.hero.searchButtonLabel ?? "Search"}
            onChange={(value) =>
              setSections({
                ...sections,
                hero: { ...sections.hero, searchButtonLabel: value },
              })
            }
          />
        </div>
        <Field
          label="Main heading"
          value={sections.hero.headline}
          onChange={(value) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, headline: value },
            })
          }
        />
        <Field
          label="Highlighted heading"
          value={sections.hero.headlineAccent}
          onChange={(value) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, headlineAccent: value },
            })
          }
        />
        <TextArea
          label="Description"
          value={sections.hero.description}
          onChange={(value) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, description: value },
            })
          }
        />
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Search placeholder"
            value={sections.hero.searchPlaceholder}
            onChange={(value) =>
              setSections({
                ...sections,
                hero: { ...sections.hero, searchPlaceholder: value },
              })
            }
          />
          <Field
            label="Bulk search label"
            value={sections.hero.bulkSearchLabel}
            onChange={(value) =>
              setSections({
                ...sections,
                hero: { ...sections.hero, bulkSearchLabel: value },
              })
            }
          />
        </div>
        <OrbitImageField
          label="Hero background / visual image"
          value={sections.hero.backgroundImage}
          onChange={(url) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, backgroundImage: url },
            })
          }
        />
      </section>

      {/* DOMAIN PRICING */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div>
          <h2 className="font-semibold">Domain TLD Pricing</h2>
          <p className="mt-0.5 text-xs text-[var(--hb-muted)]">
            Edit the domain extension prices shown in the hero search bar.
          </p>
        </div>
        <DomainPricingEditor
          pricing={
            sections.hero.domainPricing ?? [
              { tld: ".com", priceLabel: "$7.99/yr", visible: true },
              { tld: ".net", priceLabel: "$6.99/yr", visible: true },
              { tld: ".org", priceLabel: "$5.99/yr", visible: true },
              { tld: ".co", priceLabel: "$4.99/yr", visible: true },
              { tld: ".dev", priceLabel: "$3.99/yr", visible: true },
            ]
          }
          onChange={(domainPricing) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, domainPricing },
            })
          }
        />
      </section>

      {/* PRODUCTS */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Service cards section</h2>
          <label className="flex items-center gap-2 text-xs text-[var(--hb-muted)]">
            <input
              type="checkbox"
              checked={sections.products.visible}
              onChange={(e) =>
                setSections({
                  ...sections,
                  products: {
                    ...sections.products,
                    visible: e.target.checked,
                  },
                })
              }
            />
            Visible
          </label>
        </div>
        <Field
          label="Eyebrow"
          value={sections.products.eyebrow}
          onChange={(value) =>
            setSections({
              ...sections,
              products: { ...sections.products, eyebrow: value },
            })
          }
        />
        <Field
          label="Title"
          value={sections.products.title}
          onChange={(value) =>
            setSections({
              ...sections,
              products: { ...sections.products, title: value },
            })
          }
        />
        <Field
          label="Title accent"
          value={sections.products.titleAccent}
          onChange={(value) =>
            setSections({
              ...sections,
              products: { ...sections.products, titleAccent: value },
            })
          }
        />
        <TextArea
          label="Description"
          value={sections.products.description}
          onChange={(value) =>
            setSections({
              ...sections,
              products: { ...sections.products, description: value },
            })
          }
        />

        {sections.products.offers.map((offer, index) => (
          <div
            key={offer.id}
            className="space-y-3 rounded-xl border border-white/10 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold tracking-wide uppercase">
                {offer.title || offer.id} card
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 text-xs text-[var(--hb-muted)]">
                  <input
                    type="checkbox"
                    checked={offer.visible !== false}
                    onChange={(e) =>
                      updateOffer(index, { visible: e.target.checked })
                    }
                  />
                  Visible
                </label>
                <button
                  type="button"
                  onClick={() => moveOffer(index, -1)}
                  className="rounded-lg border border-white/10 px-2 py-1 text-xs"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveOffer(index, 1)}
                  className="rounded-lg border border-white/10 px-2 py-1 text-xs"
                >
                  ↓
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Title"
                value={offer.title}
                onChange={(value) => updateOffer(index, { title: value })}
              />
              <Field
                label="Badge"
                value={offer.badge}
                onChange={(value) => updateOffer(index, { badge: value })}
              />
              <Field
                label="Subtitle"
                value={offer.subtitle ?? ""}
                onChange={(value) => updateOffer(index, { subtitle: value })}
              />
              <Field
                label="Accent (blue / purple / cyan)"
                value={offer.accent}
                onChange={(value) =>
                  updateOffer(index, {
                    accent:
                      value === "purple" || value === "cyan" ? value : "blue",
                  })
                }
              />
              <Field
                label="Price override (optional USD display)"
                value={offer.priceOverride ?? ""}
                onChange={(value) =>
                  updateOffer(index, { priceOverride: value })
                }
              />
              <Field
                label="Billing period / price suffix"
                value={offer.priceSuffix}
                onChange={(value) => updateOffer(index, { priceSuffix: value })}
              />
              <Field
                label="Promotional text / highlight"
                value={offer.highlight ?? ""}
                onChange={(value) => updateOffer(index, { highlight: value })}
              />
              <Field
                label="Small pricing label"
                value={offer.priceLabel ?? ""}
                onChange={(value) => updateOffer(index, { priceLabel: value })}
              />
              <Field
                label="CTA text"
                value={offer.ctaLabel}
                onChange={(value) => updateOffer(index, { ctaLabel: value })}
              />
              <Field
                label="CTA link"
                value={offer.ctaHref}
                onChange={(value) => updateOffer(index, { ctaHref: value })}
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-[var(--hb-muted)]">
              <input
                type="checkbox"
                checked={Boolean(offer.searchEnabled)}
                onChange={(e) =>
                  updateOffer(index, { searchEnabled: e.target.checked })
                }
              />
              Show domain search under CTA
            </label>

            {offer.searchEnabled ? (
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Search placeholder"
                  value={offer.searchPlaceholder ?? ""}
                  onChange={(value) =>
                    updateOffer(index, { searchPlaceholder: value })
                  }
                />
                <Field
                  label="Search button text"
                  value={offer.searchButtonLabel ?? "Search"}
                  onChange={(value) =>
                    updateOffer(index, { searchButtonLabel: value })
                  }
                />
              </div>
            ) : null}

            <FeatureEditor
              features={offer.features}
              onChange={(features) => updateOffer(index, { features })}
            />

            <div className="grid gap-3 md:grid-cols-2">
              <OrbitImageField
                label="Card icon image"
                value={offer.iconUrl ?? ""}
                onChange={(url) => updateOffer(index, { iconUrl: url })}
              />
              <OrbitImageField
                label="Card illustration image"
                value={offer.illustrationUrl ?? ""}
                onChange={(url) => updateOffer(index, { illustrationUrl: url })}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function DomainPricingEditor({
  pricing,
  onChange,
}: {
  pricing: CmsDomainTld[];
  onChange: (pricing: CmsDomainTld[]) => void;
}) {
  return (
    <div className="space-y-2">
      {pricing.map((item, index) => (
        <div
          key={`${index}-${item.tld}`}
          className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 p-3"
        >
          <label className="flex items-center gap-2 text-xs text-[var(--hb-muted)]">
            <input
              type="checkbox"
              checked={item.visible !== false}
              onChange={(e) => {
                const next = [...pricing];
                next[index] = { ...next[index], visible: e.target.checked };
                onChange(next);
              }}
            />
            Visible
          </label>
          <input
            value={item.tld}
            onChange={(e) => {
              const next = [...pricing];
              next[index] = { ...next[index], tld: e.target.value };
              onChange(next);
            }}
            placeholder=".com"
            className="w-[80px] rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-bold text-white outline-none"
          />
          <input
            value={item.priceLabel}
            onChange={(e) => {
              const next = [...pricing];
              next[index] = { ...next[index], priceLabel: e.target.value };
              onChange(next);
            }}
            placeholder="$7.99/yr"
            className="w-[110px] rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
          />
          <button
            type="button"
            onClick={() => onChange(pricing.filter((_, i) => i !== index))}
            className="ml-auto rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-red-300"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...pricing,
            { tld: ".io", priceLabel: "$12.99/yr", visible: true },
          ])
        }
        className="rounded-xl border border-white/10 px-3 py-2 text-xs text-[var(--hb-muted)] hover:text-white"
      >
        + Add TLD
      </button>
    </div>
  );
}

function FeatureEditor({
  features,
  onChange,
}: {
  features: string[];
  onChange: (features: string[]) => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-[var(--hb-muted)] uppercase">
          Features
        </p>
        <button
          type="button"
          onClick={() => onChange([...features, "New feature"])}
          className="rounded-lg border border-white/10 px-2 py-1 text-xs"
        >
          Add feature
        </button>
      </div>
      {features.map((feature, index) => (
        <div key={`${index}-${feature.slice(0, 12)}`} className="flex gap-2">
          <input
            value={feature}
            onChange={(event) => {
              const next = [...features];
              next[index] = event.target.value;
              onChange(next);
            }}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {
              const next = [...features];
              if (index > 0) {
                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                onChange(next);
              }
            }}
            className="rounded-lg border border-white/10 px-2 text-xs"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => {
              const next = [...features];
              if (index < next.length - 1) {
                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                onChange(next);
              }
            }}
            className="rounded-lg border border-white/10 px-2 text-xs"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => onChange(features.filter((_, i) => i !== index))}
            className="rounded-lg border border-white/10 px-2 text-xs text-red-300"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs font-semibold tracking-wide text-[var(--hb-muted)] uppercase">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm font-normal tracking-normal text-white normal-case outline-none focus:border-[var(--hb-blue)]/40"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs font-semibold tracking-wide text-[var(--hb-muted)] uppercase">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm font-normal tracking-normal text-white normal-case outline-none focus:border-[var(--hb-blue)]/40"
      />
    </label>
  );
}
