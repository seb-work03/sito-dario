"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MediaUploadWidget() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await fetch("/api/admin/upload", { method: "POST", body: formData });
      router.refresh();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <label className="cursor-pointer rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400">
      {uploading ? "Caricamento…" : "Carica immagine"}
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} className="hidden" />
    </label>
  );
}
