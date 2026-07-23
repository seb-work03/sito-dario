"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

type Article = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  published: boolean;
};

export function ArticleForm({
  action,
  article,
}: {
  action: (formData: FormData) => void;
  article?: Article;
}) {
  const [coverImageUrl, setCoverImageUrl] = useState(article?.coverImageUrl ?? "");

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

      <ImageUploader
        label="Immagine di copertina"
        initialUrl={coverImageUrl}
        hiddenFieldName="coverImageUrl"
        onUploaded={setCoverImageUrl}
      />

      <label className="flex items-center gap-2 text-sm text-paper-300">
        <input type="checkbox" name="published" defaultChecked={article?.published} />
        Pubblicato
      </label>

      <button
        type="submit"
        className="self-start rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
      >
        Salva
      </button>
    </form>
  );
}
