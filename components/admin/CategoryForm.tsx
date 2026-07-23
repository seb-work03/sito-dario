"use client";

type Category = { id: number; name: string; parentId: number | null };

export function CategoryForm({
  action,
  category,
  categories,
}: {
  action: (formData: FormData) => void;
  category?: { name: string; slug: string; description: string | null; parentId: number | null };
  categories: Category[];
  excludeId?: number;
}) {
  return (
    <form action={action} className="flex max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Nome</label>
        <input
          name="name"
          required
          defaultValue={category?.name}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">
          Slug <span className="text-paper-500">(lascia vuoto per generarlo dal nome)</span>
        </label>
        <input
          name="slug"
          defaultValue={category?.slug}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Descrizione</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={category?.description ?? ""}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Categoria padre</label>
        <select
          name="parentId"
          defaultValue={category?.parentId ?? ""}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        >
          <option value="">— nessuna —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="self-start rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
      >
        Salva
      </button>
    </form>
  );
}
