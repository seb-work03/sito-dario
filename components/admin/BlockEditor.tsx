"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  type Block,
  type BlockType,
  markdownToBlocks,
  newBlock,
  serializeBlocks,
  tryParseBlocks,
} from "@/lib/blocks";
import { RichEditor } from "@/components/admin/RichEditor";

export function BlockEditor({
  name = "content",
  defaultValue = "",
}: {
  name?: string;
  defaultValue?: string;
}) {
  const initial = useMemo<Block[]>(() => {
    const parsed = tryParseBlocks(defaultValue);
    if (parsed && parsed.length > 0) return parsed;
    if (defaultValue.trim().length > 0) return markdownToBlocks(defaultValue);
    return [newBlock("paragraph")];
  }, [defaultValue]);

  const [blocks, setBlocks] = useState<Block[]>(initial);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const editingBlock = editingBlockId ? blocks.find((b) => b.id === editingBlockId) ?? null : null;

  function update(id: string, patch: Partial<Block>) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)));
  }

  function insertAfter(index: number, type: BlockType) {
    const nb = newBlock(type);
    setBlocks((prev) => [...prev.slice(0, index + 1), nb, ...prev.slice(index + 1)]);
  }

  function remove(id: string) {
    setBlocks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      return next.length > 0 ? next : [newBlock("paragraph")];
    });
  }

  function move(index: number, delta: -1 | 1) {
    setBlocks((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const serialized = serializeBlocks(blocks);

  return (
    <>
    <div className="flex flex-col gap-0">
      <input type="hidden" name={name} value={serialized} />

      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 text-xs text-gray-400">
          <span>{blocks.length} {blocks.length === 1 ? "blocco" : "blocchi"}</span>
          <span>✎ formatta · ↑ ↓ sposta · ✕ elimina</span>
        </div>

        <div className="flex flex-col p-4 gap-0.5">
          <BlockInserter onSelect={(type) => insertAfter(-1, type)} isTop />
          {blocks.map((block, i) => (
            <div key={block.id} className="flex flex-col">
              <BlockRow
                block={block}
                onChange={(patch) => update(block.id, patch)}
                onDelete={() => remove(block.id)}
                onMoveUp={i > 0 ? () => move(i, -1) : undefined}
                onMoveDown={i < blocks.length - 1 ? () => move(i, 1) : undefined}
                onEdit={
                  block.type === "paragraph" || block.type === "heading" || block.type === "quote" || block.type === "image-text"
                    ? () => setEditingBlockId(block.id)
                    : undefined
                }
              />
              <BlockInserter onSelect={(type) => insertAfter(i, type)} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Rich text modal for text blocks */}
    {editingBlock && (editingBlock.type === "paragraph" || editingBlock.type === "heading" || editingBlock.type === "quote" || editingBlock.type === "image-text") && (
      <RichTextModal
        initialContent={"text" in editingBlock ? editingBlock.text : ""}
        onSave={(html) => {
          update(editingBlockId!, { text: html } as Partial<Block>);
          setEditingBlockId(null);
        }}
        onClose={() => setEditingBlockId(null)}
      />
    )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Rich text modal
// ---------------------------------------------------------------------------

function RichTextModal({
  initialContent,
  onSave,
  onClose,
}: {
  initialContent: string;
  onSave: (html: string) => void;
  onClose: () => void;
}) {
  const [html, setHtml] = useState(initialContent);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="w-full sm:max-w-3xl rounded-t-2xl sm:rounded-xl border border-gray-200 bg-white shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900">Formattazione testo</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none"
          >✕</button>
        </div>
        <div className="overflow-y-auto flex-1 p-4">
          <RichEditor defaultValue={initialContent} onChange={setHtml} />
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-100 shrink-0 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Annulla
          </button>
          <button
            type="button"
            onClick={() => onSave(html)}
            className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block inserter
// ---------------------------------------------------------------------------

const BLOCK_TYPE_LABELS: { type: BlockType; label: string; desc: string }[] = [
  { type: "paragraph", label: "Paragrafo", desc: "Testo semplice" },
  { type: "heading", label: "Titolo", desc: "H2 o H3" },
  { type: "list", label: "Elenco", desc: "Puntato o numerato" },
  { type: "image", label: "Immagine", desc: "Larghezza piena" },
  { type: "image-text", label: "Immagine + testo", desc: "Affiancate" },
  { type: "quote", label: "Citazione", desc: "Frase in evidenza" },
  { type: "separator", label: "Separatore", desc: "Linea orizzontale" },
];

function BlockInserter({
  onSelect,
  isTop = false,
}: {
  onSelect: (type: BlockType) => void;
  isTop?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className={`relative group/insert ${isTop ? "mb-1" : "my-1"}`}>
      <div
        className={`flex items-center gap-2 ${
          open ? "opacity-100" : "opacity-0 group-hover/insert:opacity-100"
        } transition-opacity`}
      >
        <div className="flex-1 h-px bg-gray-200" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 px-2.5 py-0.5 text-xs transition-colors"
        >
          + Aggiungi blocco
        </button>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {open && (
        <div className="absolute z-20 left-1/2 -translate-x-1/2 mt-1 w-[480px] max-w-[92vw] rounded border border-gray-200 bg-white shadow-lg p-1.5 grid grid-cols-2 gap-0.5">
          {BLOCK_TYPE_LABELS.map((b) => (
            <button
              key={b.type}
              type="button"
              onClick={() => { onSelect(b.type); setOpen(false); }}
              className="flex items-center gap-2.5 rounded px-3 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              <span className="flex flex-col">
                <span className="text-sm text-gray-800 font-medium">{b.label}</span>
                <span className="text-[11px] text-gray-400">{b.desc}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block row with controls
// ---------------------------------------------------------------------------

function BlockRow({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
}: {
  block: Block;
  onChange: (patch: Partial<Block>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEdit?: () => void;
}) {
  return (
    <div className="group/block relative flex gap-2 rounded hover:bg-gray-50 p-2 transition-colors">
      <div className="flex-1 min-w-0">
        <BlockBody block={block} onChange={onChange} />
      </div>

      <div className="flex flex-col gap-0.5 shrink-0 opacity-0 group-hover/block:opacity-100 transition-opacity">
        {onEdit && (
          <SideBtn title="Modifica testo (rich)" onClick={onEdit}>✎</SideBtn>
        )}
        <SideBtn title="Sposta su" onClick={onMoveUp} disabled={!onMoveUp}>↑</SideBtn>
        <SideBtn title="Sposta giù" onClick={onMoveDown} disabled={!onMoveDown}>↓</SideBtn>
        <SideBtn title="Elimina" onClick={onDelete} danger>✕</SideBtn>
      </div>
    </div>
  );
}

function SideBtn({
  children, title, onClick, disabled, danger,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`w-6 h-6 rounded flex items-center justify-center text-xs border transition-colors ${
        disabled
          ? "border-gray-200 text-gray-300 cursor-not-allowed"
          : danger
            ? "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
            : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Per-block editor bodies
// ---------------------------------------------------------------------------

function BlockBody({ block, onChange }: { block: Block; onChange: (patch: Partial<Block>) => void }) {
  const inputCls = "w-full rounded border border-gray-200 px-2 py-1.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none";

  switch (block.type) {
    case "paragraph":
      return (
        <AutoTextarea
          value={block.text}
          onChange={(text) => onChange({ text })}
          placeholder="Scrivi il paragrafo…"
          className="text-sm leading-relaxed text-gray-900"
        />
      );

    case "heading":
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <BlockLabel>Titolo</BlockLabel>
            <ToggleGroup
              options={[{ value: 2, label: "H2" }, { value: 3, label: "H3" }]}
              value={block.level}
              onChange={(v) => onChange({ level: v as 2 | 3 })}
            />
          </div>
          <AutoTextarea
            value={block.text}
            onChange={(text) => onChange({ text })}
            placeholder={block.level === 2 ? "Titolo di sezione" : "Sottotitolo"}
            singleLine
            className={block.level === 2 ? "text-xl font-semibold text-gray-900" : "text-lg font-semibold text-gray-900"}
          />
        </div>
      );

    case "list":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BlockLabel>Elenco</BlockLabel>
            <ToggleGroup
              options={[{ value: false, label: "• Puntato" }, { value: true, label: "1. Numerato" }]}
              value={block.ordered}
              onChange={(v) => onChange({ ordered: v as boolean })}
            />
          </div>
          <div className="flex flex-col gap-1">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gray-400 text-sm w-5 text-right shrink-0">
                  {block.ordered ? `${i + 1}.` : "•"}
                </span>
                <AutoTextarea
                  value={item}
                  onChange={(text) => {
                    const items = [...block.items];
                    items[i] = text;
                    onChange({ items });
                  }}
                  placeholder="Voce dell'elenco"
                  singleLine
                  className="flex-1 text-sm text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    const items = block.items.filter((_, j) => j !== i);
                    onChange({ items: items.length ? items : [""] });
                  }}
                  className="text-gray-300 hover:text-red-500 text-xs shrink-0"
                  title="Rimuovi voce"
                >✕</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ items: [...block.items, ""] })}
              className="self-start mt-0.5 text-xs text-gray-500 hover:text-gray-800"
            >
              + Aggiungi voce
            </button>
          </div>
        </div>
      );

    case "image":
      return (
        <div className="flex flex-col gap-2">
          <BlockLabel>Immagine</BlockLabel>
          <ImagePickerInline
            url={block.url}
            alt={block.alt}
            onSelect={(url, alt) => onChange({ url, alt })}
            onAltChange={(alt) => onChange({ alt })}
          />
          <input
            type="text"
            value={block.caption ?? ""}
            onChange={(e) => onChange({ caption: e.target.value })}
            placeholder="Didascalia (opzionale)"
            className={inputCls}
          />
        </div>
      );

    case "image-text":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BlockLabel>Immagine + testo</BlockLabel>
            <ToggleGroup
              options={[{ value: "left", label: "◧ Foto sx" }, { value: "right", label: "Foto dx ◨" }]}
              value={block.align}
              onChange={(v) => onChange({ align: v as "left" | "right" })}
            />
          </div>
          <div className={`flex flex-col gap-3 md:flex-row${block.align === "right" ? " md:flex-row-reverse" : ""}`}>
            <div className="w-full md:w-2/5 shrink-0">
              <ImagePickerInline
                url={block.url}
                alt={block.alt}
                onSelect={(url, alt) => onChange({ url, alt })}
                onAltChange={(alt) => onChange({ alt })}
              />
            </div>
            <div className="flex-1">
              <AutoTextarea
                value={block.text}
                onChange={(text) => onChange({ text })}
                placeholder="Testo accanto all'immagine"
                className="text-sm leading-relaxed text-gray-900"
              />
            </div>
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="flex flex-col gap-2">
          <BlockLabel>Citazione</BlockLabel>
          <div className="border-l-2 border-gray-400 pl-3">
            <AutoTextarea
              value={block.text}
              onChange={(text) => onChange({ text })}
              placeholder="Frase in evidenza"
              className="text-sm italic text-gray-700 leading-relaxed"
            />
          </div>
          <input
            type="text"
            value={block.cite ?? ""}
            onChange={(e) => onChange({ cite: e.target.value })}
            placeholder="Fonte (opzionale)"
            className={inputCls}
          />
        </div>
      );

    case "separator":
      return (
        <div className="flex items-center gap-3 py-1">
          <BlockLabel>Separatore</BlockLabel>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
      );
  }
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
      {children}
    </span>
  );
}

function ToggleGroup<T extends string | number | boolean>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded border border-gray-300 overflow-hidden">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2 py-0.5 text-xs transition-colors ${
            value === opt.value
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Auto-growing textarea
// ---------------------------------------------------------------------------

function AutoTextarea({
  value, onChange, placeholder, className = "", singleLine = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  singleLine?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => {
        const v = singleLine ? e.target.value.replace(/\n/g, " ") : e.target.value;
        onChange(v);
      }}
      onKeyDown={(e) => { if (singleLine && e.key === "Enter") e.preventDefault(); }}
      placeholder={placeholder}
      rows={1}
      className={`w-full bg-transparent border-0 focus:outline-none resize-none overflow-hidden placeholder:text-gray-400 ${className}`}
    />
  );
}

// ---------------------------------------------------------------------------
// Inline image picker
// ---------------------------------------------------------------------------

type MediaItem = { id: number; url: string; filename: string; altText?: string | null };

function ImagePickerInline({
  url, alt, onSelect, onAltChange,
}: {
  url: string;
  alt: string;
  onSelect: (url: string, alt: string) => void;
  onAltChange: (alt: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open || items.length > 0) return;
    fetch("/api/admin/media").then((res) => res.json()).then(setItems).catch(() => setItems([]));
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
      onSelect(item.url, item.altText ?? "");
      setOpen(false);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {url ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-gray-200">
          <Image src={url} alt={alt} fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onSelect("", "")}
            className="absolute top-2 right-2 rounded bg-white/90 text-gray-700 hover:text-red-600 px-2 py-0.5 text-xs border border-gray-200"
          >
            Rimuovi
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-1 aspect-[16/9] w-full rounded border-2 border-dashed border-gray-300 hover:border-gray-500 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="text-xs">Scegli immagine</span>
        </button>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50"
        >
          {open ? "Chiudi" : url ? "Cambia" : "Sfoglia"}
        </button>
        <input
          type="text"
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Testo alternativo"
          className="flex-1 min-w-[120px] rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:border-gray-400 focus:outline-none"
        />
      </div>

      {open && (
        <div className="rounded border border-gray-200 bg-gray-50 p-3 flex flex-col gap-2">
          <label className="text-xs text-gray-600 flex items-center gap-2">
            Carica nuova:
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="text-xs text-gray-600 file:mr-2 file:rounded file:border file:border-gray-300 file:bg-white file:px-2 file:py-0.5 file:text-xs file:cursor-pointer"
            />
            {uploading && <span className="text-gray-400">…</span>}
          </label>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-1.5 max-h-48 overflow-y-auto">
            {items.length === 0 && !uploading && (
              <p className="col-span-full text-xs text-gray-400 py-4 text-center">
                Nessuna immagine. Caricane una.
              </p>
            )}
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onSelect(item.url, item.altText ?? ""); setOpen(false); }}
                className="relative aspect-square overflow-hidden rounded border border-gray-200 hover:border-gray-500 transition-colors"
                title={item.filename}
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
