"use client";

import { MediaPicker } from "@/components/admin/MediaPicker";

export function AuthorForm({
  action,
  author,
}: {
  action: (formData: FormData) => void;
  author?: {
    name: string;
    slug: string;
    bio: string | null;
    avatarMediaId: number | null;
    avatarUrl?: string | null;
  };
}) {
  return (
    <form action={action} className="flex max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Nome</label>
        <input
          name="name"
          required
          defaultValue={author?.name}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">
          Slug <span className="text-paper-500">(lascia vuoto per generarlo dal nome)</span>
        </label>
        <input
          name="slug"
          defaultValue={author?.slug}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Bio</label>
        <textarea
          name="bio"
          rows={3}
          defaultValue={author?.bio ?? ""}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <MediaPicker
        label="Avatar"
        hiddenFieldName="avatarMediaId"
        initialMediaId={author?.avatarMediaId}
        initialUrl={author?.avatarUrl}
      />

      <button
        type="submit"
        className="self-start rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
      >
        Salva
      </button>
    </form>
  );
}
