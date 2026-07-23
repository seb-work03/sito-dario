"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ImageUploader({
  label,
  initialUrl,
  onUploaded,
  hiddenFieldName,
}: {
  label: string;
  initialUrl?: string | null;
  onUploaded?: (url: string) => void;
  hiddenFieldName?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Upload fallito");
      }

      setUrl(data.url);
      onUploaded?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fallito");
    } finally {
      setUploading(false);
    }
  }

  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-paper-300">{label}</label>
      {hiddenFieldName && <input type="hidden" name={hiddenFieldName} value={url} />}

      {url && (
        <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-md border border-ink-600">
          <Image src={url} alt="" fill className="object-cover" unoptimized />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="text-sm text-paper-300 file:mr-3 file:rounded-md file:border-0 file:bg-ink-700 file:px-3 file:py-1.5 file:text-paper-50 file:cursor-pointer"
      />

      {uploading && <p className="text-sm text-paper-400">Caricamento in corso…</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {url && !uploading && (
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={url}
            className="w-full max-w-md rounded-md border border-ink-600 bg-ink-800 px-2 py-1 text-xs text-paper-300"
          />
          <button
            type="button"
            onClick={copyUrl}
            className="shrink-0 rounded-md bg-celeste-600 px-3 py-1 text-xs text-ink-950 hover:bg-celeste-500"
          >
            {copied ? "Copiato!" : "Copia URL"}
          </button>
        </div>
      )}
    </div>
  );
}
