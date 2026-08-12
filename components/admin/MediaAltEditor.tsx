"use client";

import { useRef, useState } from "react";
import { updateMediaAltText } from "@/app/admin/actions/media";

export function MediaAltEditor({ id, initialAlt }: { id: number; initialAlt: string | null }) {
  const [value, setValue] = useState(initialAlt ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function save(val: string) {
    setSaving(true);
    await updateMediaAltText(id, val);
    setSaving(false);
    setSaved(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => save(value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); save(value); } }}
        placeholder="Alt text (SEO)"
        className="flex-1 min-w-0 rounded border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
      {saving && <span className="text-[10px] text-gray-400 shrink-0">…</span>}
      {saved && !saving && <span className="text-[10px] text-green-600 shrink-0">✓</span>}
    </div>
  );
}
