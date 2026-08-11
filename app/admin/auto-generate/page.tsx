import { requireAdmin } from "@/lib/admin";
import { AutoGenerateClient } from "./AutoGenerateClient";

export default async function AutoGeneratePage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-paper-50">Generazione automatica articoli</h1>
        <p className="mt-1 text-sm text-paper-400">
          Genera articoli in bozza con Claude AI e immagine da Unsplash. Ogni bozza va revisionata e pubblicata manualmente.
        </p>
      </div>
      <AutoGenerateClient />
    </div>
  );
}
