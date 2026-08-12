"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function MediaUploadWidget() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setProgress({ done: 0, total: files.length });

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        await fetch("/api/admin/upload", { method: "POST", body: formData });
        setProgress({ done: i + 1, total: files.length });
      }
      router.refresh();
    } finally {
      setUploading(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const label = progress
    ? `${progress.done}/${progress.total} caricati…`
    : uploading
    ? "Caricamento…"
    : "Carica immagini";

  return (
    <label className="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 select-none">
      {label}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
}
