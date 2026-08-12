"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

// ---------------------------------------------------------------------------
// Media picker modal
// ---------------------------------------------------------------------------

type MediaItem = { id: number; url: string; filename: string; altText?: string | null };

function MediaModal({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const item: MediaItem = await res.json();
      setItems((prev) => [item, ...prev]);
      onSelect(item.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Scegli immagine</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-3 border-b border-gray-100">
          <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
            <span className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors">
              {uploading ? "Caricamento…" : "Carica nuova immagine"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {items.length === 0 && !uploading && (
            <p className="text-sm text-gray-400 text-center py-8">
              Nessuna immagine. Caricane una.
            </p>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.url)}
                className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 hover:border-gray-500 transition-colors"
                title={item.filename}
              >
                <NextImage src={item.url} alt="" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toolbar button
// ---------------------------------------------------------------------------

function Btn({
  active,
  onClick,
  title,
  children,
  disabled,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-7 h-7 rounded text-sm transition-colors ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-gray-200 mx-0.5" />;
}

// ---------------------------------------------------------------------------
// Main editor
// ---------------------------------------------------------------------------

export function RichEditor({
  name = "content",
  defaultValue = "",
  onChange,
}: {
  name?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
}) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // Convert old JSON block content to plain text on first load
  const initialHtml = (() => {
    if (!defaultValue.trim()) return "";
    if (defaultValue.trim().startsWith("[{")) {
      // Old block format — strip to empty so user re-enters
      return "";
    }
    // Check if it looks like HTML already
    if (defaultValue.trim().startsWith("<")) return defaultValue;
    // Legacy markdown — wrap as a paragraph for now
    return `<p>${defaultValue.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  })();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialHtml || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] focus:outline-none prose prose-sm max-w-none text-gray-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_a]:text-blue-600 [&_a]:underline [&_img]:rounded-lg [&_img]:my-3 [&_img]:max-w-full [&_hr]:border-gray-200 [&_hr]:my-4 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto",
      },
    },
  });

  const html = editor?.getHTML() ?? "";

  function insertImage(url: string) {
    editor?.chain().focus().setImage({ src: url }).run();
    setMediaOpen(false);
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (!url) {
      editor?.chain().focus().unsetLink().run();
    } else {
      editor?.chain().focus().setLink({ href: url }).run();
    }
    setLinkOpen(false);
    setLinkUrl("");
  }

  if (!editor) return null;

  const e = editor;

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-white overflow-hidden">
      <input type="hidden" name={name} value={html} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50">
        {/* History */}
        <Btn title="Annulla" onClick={() => e.chain().focus().undo().run()} disabled={!e.can().undo()}>
          ↩
        </Btn>
        <Btn title="Ripeti" onClick={() => e.chain().focus().redo().run()} disabled={!e.can().redo()}>
          ↪
        </Btn>

        <Sep />

        {/* Formatting */}
        <Btn title="Grassetto" active={e.isActive("bold")} onClick={() => e.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </Btn>
        <Btn title="Corsivo" active={e.isActive("italic")} onClick={() => e.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Btn>
        <Btn title="Sottolineato" active={e.isActive("underline")} onClick={() => e.chain().focus().toggleUnderline().run()}>
          <span className="underline">U</span>
        </Btn>
        <Btn title="Barrato" active={e.isActive("strike")} onClick={() => e.chain().focus().toggleStrike().run()}>
          <span className="line-through">S</span>
        </Btn>
        <Btn title="Codice inline" active={e.isActive("code")} onClick={() => e.chain().focus().toggleCode().run()}>
          {"<>"}
        </Btn>

        <Sep />

        {/* Headings */}
        <Btn title="Titolo H2" active={e.isActive("heading", { level: 2 })} onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Btn>
        <Btn title="Titolo H3" active={e.isActive("heading", { level: 3 })} onClick={() => e.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Btn>
        <Btn title="Titolo H4" active={e.isActive("heading", { level: 4 })} onClick={() => e.chain().focus().toggleHeading({ level: 4 }).run()}>
          H4
        </Btn>

        <Sep />

        {/* Lists */}
        <Btn title="Elenco puntato" active={e.isActive("bulletList")} onClick={() => e.chain().focus().toggleBulletList().run()}>
          ≡•
        </Btn>
        <Btn title="Elenco numerato" active={e.isActive("orderedList")} onClick={() => e.chain().focus().toggleOrderedList().run()}>
          1≡
        </Btn>

        <Sep />

        {/* Align */}
        <Btn title="Allinea sinistra" active={e.isActive({ textAlign: "left" })} onClick={() => e.chain().focus().setTextAlign("left").run()}>
          ⬛▬▬
        </Btn>
        <Btn title="Centra" active={e.isActive({ textAlign: "center" })} onClick={() => e.chain().focus().setTextAlign("center").run()}>
          ▬⬛▬
        </Btn>
        <Btn title="Allinea destra" active={e.isActive({ textAlign: "right" })} onClick={() => e.chain().focus().setTextAlign("right").run()}>
          ▬▬⬛
        </Btn>

        <Sep />

        {/* Block elements */}
        <Btn title="Citazione" active={e.isActive("blockquote")} onClick={() => e.chain().focus().toggleBlockquote().run()}>
          "
        </Btn>
        <Btn title="Blocco codice" active={e.isActive("codeBlock")} onClick={() => e.chain().focus().toggleCodeBlock().run()}>
          {"{ }"}
        </Btn>
        <Btn title="Separatore" onClick={() => e.chain().focus().setHorizontalRule().run()}>
          —
        </Btn>

        <Sep />

        {/* Link */}
        <Btn title="Link" active={e.isActive("link")} onClick={() => { setLinkUrl(e.getAttributes("link").href ?? ""); setLinkOpen(true); }}>
          🔗
        </Btn>

        {/* Image */}
        <Btn title="Inserisci immagine" onClick={() => setMediaOpen(true)}>
          🖼
        </Btn>
      </div>

      {/* Link popover */}
      {linkOpen && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-gray-50">
          <input
            type="url"
            autoFocus
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") applyLink(); if (e.key === "Escape") setLinkOpen(false); }}
            placeholder="https://esempio.it"
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:outline-none focus:border-gray-500"
          />
          <button
            type="button"
            onClick={applyLink}
            className="rounded bg-gray-900 text-white px-3 py-1 text-xs font-medium hover:bg-gray-700"
          >
            Applica
          </button>
          <button
            type="button"
            onClick={() => setLinkOpen(false)}
            className="text-gray-400 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Editor area */}
      <div className="px-5 py-4">
        <EditorContent editor={editor} />
      </div>

      {/* Media modal */}
      {mediaOpen && (
        <MediaModal onSelect={insertImage} onClose={() => setMediaOpen(false)} />
      )}
    </div>
  );
}
