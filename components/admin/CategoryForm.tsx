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
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input
          name="name"
          required
          defaultValue={category?.name}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Slug <span className="font-normal text-gray-400">(lascia vuoto per generarlo dal nome)</span>
        </label>
        <input
          name="slug"
          defaultValue={category?.slug}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Descrizione</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={category?.description ?? ""}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Categoria padre</label>
        <select
          name="parentId"
          defaultValue={category?.parentId ?? ""}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
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
        className="self-start rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Salva
      </button>
    </form>
  );
}
