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
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Libreria media</h1>
          <p className="text-sm text-gray-500 mt-0.5">{allMedia.length} file caricati</p>
        </div>
        <MediaUploadWidget />
      </div>

      {allMedia.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-10 text-center">
          <p className="text-sm text-gray-400">Nessuna immagine caricata ancora.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {allMedia.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2"
          >
            <div className="relative h-28 w-full overflow-hidden rounded-md bg-gray-100">
              <Image
                src={item.url}
                alt={item.altText ?? ""}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="px-0.5">
              <p className="truncate text-[11px] font-medium text-gray-700" title={item.filename}>
                {item.filename}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
                {formatBytes(item.size)}
              </p>
            </div>
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
