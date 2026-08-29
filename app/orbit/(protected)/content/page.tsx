"use client";

import { useEffect, useState } from "react";

import type { CmsHomeSections } from "@/lib/orbit/defaults";

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
            Edit live homepage sections without touching code.
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
        <Field
          label="Headline"
          value={sections.hero.headline}
          onChange={(value) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, headline: value },
            })
          }
        />
        <Field
          label="Headline accent"
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
        <Field
          label="Background image URL"
          value={sections.hero.backgroundImage}
          onChange={(value) =>
            setSections({
              ...sections,
              hero: { ...sections.hero, backgroundImage: value },
            })
          }
        />
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
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Products section</h2>
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
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              {offer.title} card
            </h3>
            <Field
              label="Title"
              value={offer.title}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = { ...offer, title: value };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
            <Field
              label="Price"
              value={offer.price}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = { ...offer, price: value };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
            <Field
              label="Price suffix"
              value={offer.priceSuffix}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = { ...offer, priceSuffix: value };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
            <Field
              label="Badge"
              value={offer.badge}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = { ...offer, badge: value };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
            <TextArea
              label="Features (one per line)"
              value={offer.features.join("\n")}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = {
                  ...offer,
                  features: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
            <Field
              label="CTA label"
              value={offer.ctaLabel}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = { ...offer, ctaLabel: value };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
            <Field
              label="CTA URL"
              value={offer.ctaHref}
              onChange={(value) => {
                const offers = [...sections.products.offers];
                offers[index] = { ...offer, ctaHref: value };
                setSections({
                  ...sections,
                  products: { ...sections.products, offers },
                });
              }}
            />
          </div>
        ))}
      </section>
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
        rows={4}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm font-normal tracking-normal text-white normal-case outline-none focus:border-[var(--hb-blue)]/40"
      />
    </label>
  );
}
