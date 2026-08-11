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

// ---------------------------------------------------------------------------
// Public component: wraps a hidden <input name="content"> so it slots into
// the existing server action pipeline unchanged.
// ---------------------------------------------------------------------------

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
  const [showJsonDebug, setShowJsonDebug] = useState(false);

  function update(id: string, patch: Partial<Block>) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)),
    );
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
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={serialized} />

      <div className="rounded-xl border border-ink-600 bg-ink-900/60">
        {/* Top help bar */}
        <div className="flex items-center justify-between border-b border-ink-600 px-4 py-2.5">
          <div className="text-xs text-paper-400">
            {blocks.length} {blocks.length === 1 ? "blocco" : "blocchi"} · Trascina l&apos;articolo
            usando i pulsanti a destra di ogni blocco
          </div>
          <button
            type="button"
            onClick={() => setShowJsonDebug((v) => !v)}
            className="text-[11px] text-paper-500 hover:text-paper-300 transition-colors"
          >
            {showJsonDebug ? "Nascondi JSON" : "Vedi JSON"}
          </button>
        </div>

        {/* Blocks list */}
        <div className="flex flex-col p-4 md:p-6 gap-1">
          <BlockInserter onSelect={(type) => insertAfter(-1, type)} isTop />
          {blocks.map((block, i) => (
            <div key={block.id} className="flex flex-col">
              <BlockRow
                block={block}
                onChange={(patch) => update(block.id, patch)}
                onDelete={() => remove(block.id)}
                onMoveUp={i > 0 ? () => move(i, -1) : undefined}
                onMoveDown={i < blocks.length - 1 ? () => move(i, 1) : undefined}
              />
              <BlockInserter onSelect={(type) => insertAfter(i, type)} />
            </div>
          ))}
        </div>
      </div>

      {showJsonDebug && (
        <pre className="mt-1 rounded-md border border-ink-600 bg-ink-900 p-3 text-[11px] text-paper-400 overflow-x-auto max-h-40">
          {JSON.stringify(blocks, null, 2)}
        </pre>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block-type inserter: hover to reveal, click to open the type menu
// ---------------------------------------------------------------------------

const BLOCK_TYPE_LABELS: { type: BlockType; label: string; icon: string; desc: string }[] = [
  { type: "paragraph", label: "Paragrafo", icon: "¶", desc: "Testo semplice" },
  { type: "heading", label: "Titolo", icon: "H", desc: "H2 o H3" },
  { type: "list", label: "Elenco", icon: "•", desc: "Puntato o numerato" },
  { type: "image", label: "Immagine", icon: "🖼", desc: "Larghezza piena" },
  { type: "image-text", label: "Immagine + testo", icon: "◨", desc: "Affiancate" },
  { type: "quote", label: "Citazione", icon: "❝", desc: "Frase in evidenza" },
  { type: "separator", label: "Separatore", icon: "—", desc: "Linea orizzontale" },
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
        <div className="flex-1 h-px bg-ink-600" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full border border-celeste-500/50 bg-celeste-500/10 text-celeste-400 hover:bg-celeste-500 hover:text-ink-950 px-3 py-1 text-xs font-medium transition-colors"
        >
          <span className="text-sm leading-none">+</span> Aggiungi blocco
        </button>
        <div className="flex-1 h-px bg-ink-600" />
      </div>

      {open && (
        <div className="absolute z-20 left-1/2 -translate-x-1/2 mt-1 w-[520px] max-w-[92vw] rounded-lg border border-ink-500 bg-ink-800 shadow-xl p-2 grid grid-cols-2 gap-1">
          {BLOCK_TYPE_LABELS.map((b) => (
            <button
              key={b.type}
              type="button"
              onClick={() => {
                onSelect(b.type);
                setOpen(false);
              }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-ink-700 transition-colors"
            >
              <span className="w-9 h-9 rounded-md bg-ink-900 flex items-center justify-center text-celeste-400 text-base shrink-0">
                {b.icon}
              </span>
              <span className="flex flex-col">
                <span className="text-sm text-paper-50 font-medium">{b.label}</span>
                <span className="text-[11px] text-paper-400">{b.desc}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Row wrapper: block content + side controls
// ---------------------------------------------------------------------------

function BlockRow({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  block: Block;
  onChange: (patch: Partial<Block>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative group/block flex gap-2 rounded-lg border border-transparent hover:border-ink-600 hover:bg-ink-800/40 p-2 md:p-3 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <BlockBody block={block} onChange={onChange} />
      </div>

      <div
        className={`flex flex-col gap-1 shrink-0 transition-opacity ${
          hover ? "opacity-100" : "opacity-0 md:group-hover/block:opacity-100"
        }`}
      >
        <SideBtn title="Sposta su" onClick={onMoveUp} disabled={!onMoveUp}>
          ↑
        </SideBtn>
        <SideBtn title="Sposta giù" onClick={onMoveDown} disabled={!onMoveDown}>
          ↓
        </SideBtn>
        <SideBtn title="Elimina" onClick={onDelete} danger>
          ✕
        </SideBtn>
      </div>
    </div>
  );
}

function SideBtn({
  children,
  title,
  onClick,
  disabled,
  danger,
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
      className={`w-7 h-7 rounded-md flex items-center justify-center text-sm border transition-colors ${
        disabled
          ? "border-ink-700 text-paper-600 cursor-not-allowed"
          : danger
            ? "border-ink-600 text-paper-400 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10"
            : "border-ink-600 text-paper-400 hover:border-celeste-500/40 hover:text-celeste-400"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Per-block editor bodies
// ---------------------------------------------------------------------------

function BlockBody({
  block,
  onChange,
}: {
  block: Block;
  onChange: (patch: Partial<Block>) => void;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <AutoTextarea
          value={block.text}
          onChange={(text) => onChange({ text })}
          placeholder="Scrivi il paragrafo. Usa **grassetto**, *corsivo*, [link](https://…)"
          className="text-[15px] leading-relaxed text-paper-50"
        />
      );

    case "heading":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BlockLabel>Titolo</BlockLabel>
            <div className="inline-flex rounded-md border border-ink-600 overflow-hidden">
              {([2, 3] as const).map((lv) => (
                <button
                  key={lv}
                  type="button"
                  onClick={() => onChange({ level: lv })}
                  className={`px-2.5 py-0.5 text-xs transition-colors ${
                    block.level === lv
                      ? "bg-celeste-500 text-ink-950"
                      : "bg-ink-900 text-paper-300 hover:bg-ink-700"
                  }`}
                >
                  H{lv}
                </button>
              ))}
            </div>
          </div>
          <AutoTextarea
            value={block.text}
            onChange={(text) => onChange({ text })}
            placeholder={block.level === 2 ? "Titolo di sezione" : "Sottotitolo"}
            singleLine
            className={
              block.level === 2
                ? "text-[22px] font-medium tracking-tight text-paper-50"
                : "text-[18px] font-medium tracking-tight text-paper-50"
            }
          />
        </div>
      );

    case "list":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BlockLabel>Elenco</BlockLabel>
            <div className="inline-flex rounded-md border border-ink-600 overflow-hidden">
              <button
                type="button"
                onClick={() => onChange({ ordered: false })}
                className={`px-2.5 py-0.5 text-xs transition-colors ${
                  !block.ordered
                    ? "bg-celeste-500 text-ink-950"
                    : "bg-ink-900 text-paper-300 hover:bg-ink-700"
                }`}
              >
                • Puntato
              </button>
              <button
                type="button"
                onClick={() => onChange({ ordered: true })}
                className={`px-2.5 py-0.5 text-xs transition-colors ${
                  block.ordered
                    ? "bg-celeste-500 text-ink-950"
                    : "bg-ink-900 text-paper-300 hover:bg-ink-700"
                }`}
              >
                1. Numerato
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 text-paper-500 text-sm shrink-0 w-6 text-right">
                  {block.ordered ? `${i + 1}.` : "•"}
                </span>
                <div className="flex-1 min-w-0">
                  <AutoTextarea
                    value={item}
                    onChange={(text) => {
                      const items = [...block.items];
                      items[i] = text;
                      onChange({ items });
                    }}
                    placeholder="Voce dell'elenco"
                    singleLine
                    className="text-[15px] text-paper-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const items = block.items.filter((_, j) => j !== i);
                    onChange({ items: items.length ? items : [""] });
                  }}
                  className="mt-1.5 text-paper-500 hover:text-red-400 text-sm shrink-0 w-6"
                  title="Rimuovi voce"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ items: [...block.items, ""] })}
              className="self-start mt-1 text-xs text-celeste-400 hover:text-celeste-300 transition-colors"
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
            className="w-full rounded-md border border-ink-600 bg-ink-800 px-3 py-1.5 text-sm text-paper-50 focus:border-celeste-500 focus:outline-none"
          />
        </div>
      );

    case "image-text":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BlockLabel>Immagine + testo</BlockLabel>
            <div className="inline-flex rounded-md border border-ink-600 overflow-hidden">
              <button
                type="button"
                onClick={() => onChange({ align: "left" })}
                className={`px-2.5 py-0.5 text-xs transition-colors ${
                  block.align === "left"
                    ? "bg-celeste-500 text-ink-950"
                    : "bg-ink-900 text-paper-300 hover:bg-ink-700"
                }`}
              >
                ◧ Foto a sx
              </button>
              <button
                type="button"
                onClick={() => onChange({ align: "right" })}
                className={`px-2.5 py-0.5 text-xs transition-colors ${
                  block.align === "right"
                    ? "bg-celeste-500 text-ink-950"
                    : "bg-ink-900 text-paper-300 hover:bg-ink-700"
                }`}
              >
                Foto a dx ◨
              </button>
            </div>
          </div>
          <div
            className={`flex flex-col gap-3 md:flex-row${block.align === "right" ? " md:flex-row-reverse" : ""}`}
          >
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
                placeholder="Testo del paragrafo accanto all'immagine"
                className="text-[15px] leading-relaxed text-paper-50"
              />
            </div>
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="flex flex-col gap-2">
          <BlockLabel>Citazione</BlockLabel>
          <div className="border-l-[3px] border-celeste-500/60 pl-4">
            <AutoTextarea
              value={block.text}
              onChange={(text) => onChange({ text })}
              placeholder="Frase in evidenza"
              className="text-[16px] italic text-paper-50 leading-relaxed"
            />
          </div>
          <input
            type="text"
            value={block.cite ?? ""}
            onChange={(e) => onChange({ cite: e.target.value })}
            placeholder="Fonte / autore (opzionale)"
            className="w-full rounded-md border border-ink-600 bg-ink-800 px-3 py-1.5 text-sm text-paper-50 focus:border-celeste-500 focus:outline-none"
          />
        </div>
      );

    case "separator":
      return (
        <div className="flex items-center gap-3 py-2">
          <BlockLabel>Separatore</BlockLabel>
          <div className="flex-1 h-px bg-ink-500" />
        </div>
      );
  }
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-[0.14em] text-paper-500 font-medium">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Auto-growing textarea (used by paragraph, headings, list items, image-text)
// ---------------------------------------------------------------------------

function AutoTextarea({
  value,
  onChange,
  placeholder,
  className = "",
  singleLine = false,
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
      onKeyDown={(e) => {
        if (singleLine && e.key === "Enter") e.preventDefault();
      }}
      placeholder={placeholder}
      rows={1}
      className={`w-full bg-transparent border-0 focus:outline-none resize-none overflow-hidden placeholder:text-paper-500 ${className}`}
    />
  );
}

// ---------------------------------------------------------------------------
// Inline image picker (browse media library + upload)
// ---------------------------------------------------------------------------

type MediaItem = {
  id: number;
  url: string;
  filename: string;
  altText?: string | null;
};

function ImagePickerInline({
  url,
  alt,
  onSelect,
  onAltChange,
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
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then(setItems)
      .catch(() => setItems([]));
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
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-ink-600 bg-ink-900">
          <Image src={url} alt={alt} fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onSelect("", "")}
            className="absolute top-2 right-2 rounded-md bg-ink-950/80 text-paper-200 hover:text-red-400 px-2 py-1 text-xs backdrop-blur-sm"
          >
            Rimuovi
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-2 aspect-[16/10] w-full rounded-md border-2 border-dashed border-ink-500 hover:border-celeste-500 text-paper-400 hover:text-celeste-400 transition-colors"
        >
          <span className="text-2xl">🖼</span>
          <span className="text-sm">Scegli un&apos;immagine</span>
        </button>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md bg-ink-700 hover:bg-ink-600 text-paper-50 px-3 py-1 text-xs transition-colors"
        >
          {open ? "Chiudi libreria" : url ? "Cambia immagine" : "Sfoglia libreria"}
        </button>
        <input
          type="text"
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Testo alternativo (SEO)"
          className="flex-1 min-w-[140px] rounded-md border border-ink-600 bg-ink-800 px-3 py-1 text-xs text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      {open && (
        <div className="rounded-md border border-ink-600 bg-ink-900 p-3 flex flex-col gap-3">
          <label className="text-xs text-paper-300 flex items-center gap-2">
            Carica nuova:
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="text-xs text-paper-300 file:mr-2 file:rounded-md file:border-0 file:bg-ink-700 file:px-2 file:py-1 file:text-paper-50 file:cursor-pointer file:text-xs"
            />
            {uploading && <span className="text-paper-400">…</span>}
          </label>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-56 overflow-y-auto">
            {items.length === 0 && !uploading && (
              <p className="col-span-full text-xs text-paper-500 py-4 text-center">
                Nessuna immagine nella libreria. Caricane una qui sopra.
              </p>
            )}
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.url, item.altText ?? "");
                  setOpen(false);
                }}
                className="relative aspect-square overflow-hidden rounded-md border border-ink-600 hover:border-celeste-500 transition-colors"
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
