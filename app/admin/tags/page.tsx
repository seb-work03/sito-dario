import { createTag, deleteTag } from "@/app/admin/actions/tags";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { db } from "@/lib/db";
import { tags } from "@/lib/db/schema";

export default async function TagsPage() {
  const allTags = await db.select().from(tags);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Tag</h1>

      <form action={createTag} className="flex max-w-md gap-2">
        <input
          name="name"
          required
          placeholder="Nome tag"
          className="flex-1 rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
        >
          Aggiungi
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {allTags.length === 0 && <p className="text-sm text-paper-400">Nessun tag ancora.</p>}
        {allTags.map((tag) => (
          <span
            key={tag.id}
            className="flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800 px-3 py-1 text-sm text-paper-200"
          >
            {tag.name}
            <DeleteEntityButton
              id={tag.id}
              action={deleteTag}
              confirmMessage={`Eliminare il tag "${tag.name}"?`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
