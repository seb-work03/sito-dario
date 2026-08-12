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
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input
          name="name"
          required
          defaultValue={author?.name}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Slug <span className="font-normal text-gray-400">(lascia vuoto per generarlo dal nome)</span>
        </label>
        <input
          name="slug"
          defaultValue={author?.slug}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          rows={3}
          defaultValue={author?.bio ?? ""}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
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
        className="self-start rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Salva
      </button>
    </form>
  );
}
