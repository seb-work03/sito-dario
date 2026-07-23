"use client";

import { useState } from "react";
import { MediaPicker } from "@/components/admin/MediaPicker";

type Category = { id: number; name: string; parentId: number | null };
type Author = { id: number; name: string };

type Article = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverMediaId: number | null;
  coverMediaUrl?: string | null;
  authorId: number | null;
  status: "draft" | "published";
  seoTitle: string | null;
  seoDescription: string | null;
  categoryIds?: number[];
  tagNames?: string;
};

export function ArticleForm({
  action,
  article,
  categories,
  authors,
}: {
  action: (formData: FormData) => void;
  article?: Article;
  categories: Category[];
  authors: Author[];
}) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    article?.categoryIds ?? [],
  );

  function categoryLabel(cat: Category, depth = 0): string {
    return `${"— ".repeat(depth)}${cat.name}`;
  }

  // Flatten categories preserving parent/child order for display indentation.
  function orderedCategories(): { cat: Category; depth: number }[] {
    const byParent = new Map<number | null, Category[]>();
    for (const cat of categories) {
      const list = byParent.get(cat.parentId) ?? [];
      list.push(cat);
      byParent.set(cat.parentId, list);
    }
    const result: { cat: Category; depth: number }[] = [];
    function walk(parentId: number | null, depth: number) {
      for (const cat of byParent.get(parentId) ?? []) {
        result.push({ cat, depth });
        walk(cat.id, depth + 1);
      }
    }
    walk(null, 0);
    return result;
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Titolo</label>
        <input
          name="title"
          required
          defaultValue={article?.title}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">
          Slug <span className="text-paper-500">(lascia vuoto per generarlo dal titolo)</span>
        </label>
        <input
          name="slug"
          defaultValue={article?.slug}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Riassunto</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={article?.excerpt ?? ""}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Contenuto (Markdown)</label>
        <textarea
          name="content"
          required
          rows={16}
          defaultValue={article?.content}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 font-mono text-sm text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <MediaPicker
        label="Immagine di copertina"
        hiddenFieldName="coverMediaId"
        initialMediaId={article?.coverMediaId}
        initialUrl={article?.coverMediaUrl}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-paper-300">Autore</label>
          <select
            name="authorId"
            defaultValue={article?.authorId ?? ""}
            className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
          >
            <option value="">— nessuno —</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-paper-300">Stato</label>
          <select
            name="status"
            defaultValue={article?.status ?? "draft"}
            className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
          >
            <option value="draft">Bozza</option>
            <option value="published">Pubblicato</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Categorie</label>
        <div className="flex flex-col gap-1 rounded-md border border-ink-600 bg-ink-800 p-3">
          {orderedCategories().length === 0 && (
            <p className="text-sm text-paper-500">
              Nessuna categoria ancora — creane una in Admin → Categorie.
            </p>
          )}
          {orderedCategories().map(({ cat, depth }) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm text-paper-200">
              <input
                type="checkbox"
                name="categoryIds"
                value={cat.id}
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={(e) => {
                  setSelectedCategoryIds((prev) =>
                    e.target.checked
                      ? [...prev, cat.id]
                      : prev.filter((id) => id !== cat.id),
                  );
                }}
              />
              {categoryLabel(cat, depth)}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">
          Tag <span className="text-paper-500">(separati da virgola)</span>
        </label>
        <input
          name="tagNames"
          defaultValue={article?.tagNames ?? ""}
          placeholder="e-commerce, marketing, strategia"
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <details className="rounded-md border border-ink-600 bg-ink-800 p-3">
        <summary className="cursor-pointer text-sm text-paper-300">SEO (opzionale)</summary>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-paper-300">Titolo SEO</label>
            <input
              name="seoTitle"
              defaultValue={article?.seoTitle ?? ""}
              className="rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-paper-300">Descrizione SEO</label>
            <textarea
              name="seoDescription"
              rows={2}
              defaultValue={article?.seoDescription ?? ""}
              className="rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="self-start rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
      >
        Salva
      </button>
    </form>
  );
}
