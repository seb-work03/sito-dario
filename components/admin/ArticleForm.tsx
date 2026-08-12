"use client";

import { useState } from "react";
import { RichEditor } from "@/components/admin/RichEditor";
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

  const inputCls =
    "rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none w-full";
  const labelCls = "text-sm font-medium text-gray-700";

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className={labelCls}>Titolo</label>
        <input name="title" required defaultValue={article?.title} className={inputCls} />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelCls}>
          Slug <span className="font-normal text-gray-400">(lascia vuoto per generarlo dal titolo)</span>
        </label>
        <input name="slug" defaultValue={article?.slug} className={inputCls} />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelCls}>
          Estratto <span className="font-normal text-gray-400">(mostrato nelle anteprime)</span>
        </label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={article?.excerpt ?? ""}
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelCls}>Contenuto</label>
        <RichEditor name="content" defaultValue={article?.content ?? ""} />
      </div>

      <MediaPicker
        label="Immagine di copertina"
        hiddenFieldName="coverMediaId"
        initialMediaId={article?.coverMediaId}
        initialUrl={article?.coverMediaUrl}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Autore</label>
          <select
            name="authorId"
            defaultValue={article?.authorId ?? ""}
            className={inputCls}
          >
            <option value="">— nessuno —</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Stato</label>
          <select
            name="status"
            defaultValue={article?.status ?? "draft"}
            className={inputCls}
          >
            <option value="draft">Bozza</option>
            <option value="published">Pubblicato</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelCls}>Categorie</label>
        <div className="flex flex-col gap-1 rounded border border-gray-200 bg-gray-50 p-3">
          {orderedCategories().length === 0 && (
            <p className="text-sm text-gray-400">
              Nessuna categoria — creane una in Categorie.
            </p>
          )}
          {orderedCategories().map(({ cat, depth }) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm text-gray-700">
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

      <details className="rounded border border-gray-200 p-3">
        <summary className="cursor-pointer text-sm font-medium text-gray-600">SEO (opzionale)</summary>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Titolo SEO</label>
            <input
              name="seoTitle"
              defaultValue={article?.seoTitle ?? ""}
              className={inputCls}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelCls}>Descrizione SEO</label>
            <textarea
              name="seoDescription"
              rows={2}
              defaultValue={article?.seoDescription ?? ""}
              className={inputCls}
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="self-start rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Salva
      </button>
    </form>
  );
}
