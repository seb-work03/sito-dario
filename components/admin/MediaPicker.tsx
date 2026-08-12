"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MediaItem = {
  id: number;
  url: string;
  filename: string;
  width: number | null;
  height: number | null;
};

export function MediaPicker({
  label,
  initialMediaId,
  initialUrl,
  hiddenFieldName,
}: {
  label: string;
  initialMediaId?: number | null;
  initialUrl?: string | null;
  hiddenFieldName: string;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(initialMediaId ?? null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(initialUrl ?? null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open || items.length > 0) return;
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then(setItems);
  }, [open, items.length]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const item: MediaItem = await res.json();
      setItems((prev) => [item, ...prev]);
      setSelectedId(item.id);
      setSelectedUrl(item.url);
      setOpen(false);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input type="hidden" name={hiddenFieldName} value={selectedId ?? ""} />

      {selectedUrl && (
        <div className="relative h-36 w-full max-w-xs overflow-hidden rounded border border-gray-200">
          <Image src={selectedUrl} alt="" fill className="object-cover" unoptimized />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          {open ? "Chiudi" : "Scegli immagine"}
        </button>
        {selectedId && (
          <button
            type="button"
            onClick={() => { setSelectedId(null); setSelectedUrl(null); }}
            className="text-sm text-gray-400 hover:text-gray-700"
          >
            Rimuovi
          </button>
        )}
      </div>

      {open && (
        <div className="flex flex-col gap-3 rounded border border-gray-200 bg-gray-50 p-3">
          <label className="text-sm text-gray-600">
            Carica nuova immagine
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="mt-1 block text-sm text-gray-600 file:mr-3 file:rounded file:border file:border-gray-300 file:bg-white file:px-3 file:py-1 file:text-sm file:text-gray-700 file:cursor-pointer"
            />
          </label>
          {uploading && <p className="text-sm text-gray-400">Caricamento…</p>}

          <div className="grid grid-cols-4 gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setSelectedId(item.id); setSelectedUrl(item.url); setOpen(false); }}
                className={`relative h-20 overflow-hidden rounded border-2 transition-colors ${
                  selectedId === item.id ? "border-gray-900" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image src={item.url} alt="" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
