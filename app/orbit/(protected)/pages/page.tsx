"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PageRow = {
  id: string;
  slug: string;
  title: string;
  isPublished: boolean;
  isVisible: boolean;
  updatedAt: string;
};

export default function OrbitPagesPage() {
  const [pages, setPages] = useState<PageRow[]>([]);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/orbit/content/home");
      const json = await res.json();
      if (res.ok) setPages(json.pages);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pages</h1>
        <p className="mt-1 text-sm text-[var(--hb-muted)]">
          Manage HostingBeyond pages and section visibility.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-[var(--hb-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-t border-white/10">
                <td className="px-4 py-3">{page.title}</td>
                <td className="px-4 py-3 text-[var(--hb-muted)]">
                  /{page.slug === "home" ? "" : page.slug}
                </td>
                <td className="px-4 py-3">
                  {page.isPublished && page.isVisible ? "Published" : "Hidden"}
                </td>
                <td className="px-4 py-3 text-[var(--hb-muted)]">
                  {new Date(page.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href="/orbit/content"
                      className="text-[var(--hb-blue)]"
                    >
                      Edit
                    </Link>
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--hb-muted)]"
                    >
                      Preview
                    </a>
                    <Link href="/orbit/seo" className="text-[var(--hb-muted)]">
                      SEO
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
