import { desc } from "drizzle-orm";
import Image from "next/image";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { deleteMedia } from "@/app/admin/actions/media";
import { MediaUploadWidget } from "@/components/admin/MediaUploadWidget";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function MediaLibraryPage() {
  const allMedia = await db.select().from(media).orderBy(desc(media.createdAt));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Libreria media</h1>
        <MediaUploadWidget />
      </div>

      {allMedia.length === 0 && (
        <p className="text-sm text-paper-400">Nessuna immagine caricata ancora.</p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allMedia.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 rounded-md border border-ink-700 p-2">
            <div className="relative h-32 w-full overflow-hidden rounded-md bg-ink-800">
              <Image
                src={item.url}
                alt={item.altText ?? ""}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="truncate text-xs text-paper-300" title={item.filename}>
              {item.filename}
            </p>
            <p className="text-xs text-paper-500">
              {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
              {formatBytes(item.size)}
            </p>
            <DeleteEntityButton
              id={item.id}
              action={deleteMedia}
              confirmMessage="Eliminare questa immagine? Se usata altrove il riferimento verrà rimosso."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
