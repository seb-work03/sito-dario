"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MediaPicker } from "@/components/admin/MediaPicker";

type Category = { id: number; name: string; parentId: number | null };
type Author = { id: number; name: string };

type Article = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverMediaId: number | null;
  coverMediaUrl?: string | null;
  authorId: number | null;
  status: "draft" | "published";
  seoTitle: string | null;
  seoDescription: string | null;
  categoryIds?: number[];
};

// ---------------------------------------------------------------------------
// Markdown editor with toolbar
// ---------------------------------------------------------------------------

function ToolbarBtn({
  label,
  title,
  onClick,
  accent,
}: {
  label: string;
  title: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-1 text-xs rounded transition-colors hover:bg-ink-600 ${
        accent ? "text-celeste-400 hover:text-celeste-300" : "text-paper-300 hover:text-paper-50"
      }`}
    >
      {label}
    </button>
  );
}

function MarkdownEditor({ defaultValue }: { defaultValue?: string }) {
  const [content, setContent] = useState(defaultValue ?? "");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [showGuide, setShowGuide] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  function wrapSelection(before: string, after = "", placeholder = "testo") {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + selected.length;
    }, 0);
  }

  function prependLine(prefix: string) {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const lineStart = content.lastIndexOf("\n", pos - 1) + 1;
    const next = content.slice(0, lineStart) + prefix + content.slice(lineStart);
    setContent(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = pos + prefix.length;
    }, 0);
  }

  function insertAt(text: string) {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const next = content.slice(0, pos) + text + content.slice(pos);
    setContent(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = pos + text.length;
    }, 0);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col border border-ink-600 rounded-lg overflow-hidden bg-ink-800">
        {/* Mode tabs */}
        <div className="flex items-center justify-between border-b border-ink-600 bg-ink-900 px-1">
          <div className="flex">
            {(["write", "preview"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${
                  mode === m
                    ? "border-celeste-500 text-paper-50"
                    : "border-transparent text-paper-400 hover:text-paper-200"
                }`}
              >
                {m === "write" ? "Scrivi" : "Anteprima"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            className="text-xs text-celeste-400 hover:text-celeste-300 px-3 py-1 transition-colors"
          >
            {showGuide ? "✕ Chiudi guida" : "📖 Guida immagini"}
          </button>
        </div>

        {/* Toolbar (write mode only) */}
        {mode === "write" && (
          <div className="flex flex-wrap items-center gap-0.5 border-b border-ink-600 bg-ink-900 px-2 py-1.5">
            <ToolbarBtn label="G" title="Grassetto" onClick={() => wrapSelection("**", "**", "testo in grassetto")} />
            <ToolbarBtn label="C" title="Corsivo" onClick={() => wrapSelection("*", "*", "testo in corsivo")} />
            <span className="w-px h-4 bg-ink-600 mx-1" />
            <ToolbarBtn label="H2" title="Titolo sezione" onClick={() => prependLine("## ")} />
            <ToolbarBtn label="H3" title="Sottotitolo" onClick={() => prependLine("### ")} />
            <span className="w-px h-4 bg-ink-600 mx-1" />
            <ToolbarBtn label="• Lista" title="Lista puntata" onClick={() => prependLine("- ")} />
            <ToolbarBtn label="1. Lista" title="Lista numerata" onClick={() => prependLine("1. ")} />
            <span className="w-px h-4 bg-ink-600 mx-1" />
            <ToolbarBtn label="🔗 Link" title='[testo](URL)' onClick={() => wrapSelection("[", "](URL)", "testo del link")} />
            <ToolbarBtn label="——" title="Separatore orizzontale" onClick={() => insertAt("\n\n---\n\n")} />
            <span className="w-px h-4 bg-ink-600 mx-1" />
            <ToolbarBtn
              accent
              label="📷 Foto"
              title="Immagine intera larghezza"
              onClick={() => insertAt("\n<!-- foto: URL_IMMAGINE | Didascalia opzionale -->\n")}
            />
            <ToolbarBtn
              accent
              label="◀ Foto sx"
              title="Immagine a sinistra, testo a destra"
              onClick={() =>
                insertAt(
                  "\n<!-- foto-sinistra: URL_IMMAGINE | Alt -->\nIl testo di questo paragrafo appare a destra dell'immagine.\n\n",
                )
              }
            />
            <ToolbarBtn
              accent
              label="Foto dx ▶"
              title="Immagine a destra, testo a sinistra"
              onClick={() =>
                insertAt(
                  "\n<!-- foto-destra: URL_IMMAGINE | Alt -->\nIl testo di questo paragrafo appare a sinistra dell'immagine.\n\n",
                )
              }
            />
          </div>
        )}

        {/* Editor or Preview */}
        <textarea
          ref={taRef}
          name="content"
          required
          rows={22}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-ink-800 px-4 py-3 font-mono text-sm text-paper-50 focus:outline-none resize-y leading-relaxed"
          style={{ display: mode === "write" ? undefined : "none" }}
        />
        {mode === "preview" && (
          <div className="min-h-64 overflow-auto px-6 py-5 rich-text" style={{ background: "var(--color-ink-800, #17222f)" }}>
            {content.trim() ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <p className="text-paper-500 italic">Nessun contenuto da visualizzare.</p>
            )}
          </div>
        )}
      </div>

      {/* Image guide */}
      {showGuide && (
        <div className="rounded-lg border border-celeste-500/30 bg-celeste-500/5 px-5 py-4 text-sm text-paper-300 flex flex-col gap-3">
          <p className="text-paper-50 font-medium">Come inserire immagini nell&apos;articolo</p>

          <div className="flex flex-col gap-1">
            <p className="text-paper-200 font-medium">📷 Foto a tutta larghezza</p>
            <code className="block bg-ink-900 rounded px-3 py-2 text-celeste-400 text-xs font-mono whitespace-pre">
              {`<!-- foto: https://url-immagine.jpg | Testo didascalia -->`}
            </code>
            <p className="text-xs text-paper-400">Il testo dopo la | è la didascalia mostrata sotto l&apos;immagine.</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-paper-200 font-medium">◀ Foto a sinistra, testo a destra</p>
            <code className="block bg-ink-900 rounded px-3 py-2 text-celeste-400 text-xs font-mono whitespace-pre">
              {`<!-- foto-sinistra: https://url-immagine.jpg | Alt -->\nIl paragrafo accanto all'immagine (fino alla riga vuota).\n`}
            </code>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-paper-200 font-medium">Foto dx ▶ — Foto a destra, testo a sinistra</p>
            <code className="block bg-ink-900 rounded px-3 py-2 text-celeste-400 text-xs font-mono whitespace-pre">
              {`<!-- foto-destra: https://url-immagine.jpg | Alt -->\nIl paragrafo accanto all'immagine (fino alla riga vuota).\n`}
            </code>
          </div>

          <p className="text-xs text-paper-400 border-t border-ink-600 pt-3">
            💡 Usa i pulsanti celesti nella barra degli strumenti per inserire il codice automaticamente — poi sostituisci <span className="text-celeste-400 font-mono">URL_IMMAGINE</span> con l&apos;URL copiato dalla libreria media.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main form
// ---------------------------------------------------------------------------

export function ArticleForm({
  action,
  article,
  categories,
  authors,
}: {
  action: (formData: FormData) => void;
  article?: Article;
  categories: Category[];
  authors: Author[];
}) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    article?.categoryIds ?? [],
  );

  function categoryLabel(cat: Category, depth = 0): string {
    return `${"— ".repeat(depth)}${cat.name}`;
  }

  function orderedCategories(): { cat: Category; depth: number }[] {
    const byParent = new Map<number | null, Category[]>();
    for (const cat of categories) {
      const list = byParent.get(cat.parentId) ?? [];
      list.push(cat);
      byParent.set(cat.parentId, list);
    }
    const result: { cat: Category; depth: number }[] = [];
    function walk(parentId: number | null, depth: number) {
      for (const cat of byParent.get(parentId) ?? []) {
        result.push({ cat, depth });
        walk(cat.id, depth + 1);
      }
    }
    walk(null, 0);
    return result;
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Titolo</label>
        <input
          name="title"
          required
          defaultValue={article?.title}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">
          Slug <span className="text-paper-500">(lascia vuoto per generarlo dal titolo)</span>
        </label>
        <input
          name="slug"
          defaultValue={article?.slug}
          className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-paper-300">Contenuto</label>
        <MarkdownEditor defaultValue={article?.content} />
      </div>

      <MediaPicker
        label="Immagine di copertina"
        hiddenFieldName="coverMediaId"
        initialMediaId={article?.coverMediaId}
        initialUrl={article?.coverMediaUrl}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-paper-300">Autore</label>
          <select
            name="authorId"
            defaultValue={article?.authorId ?? ""}
            className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
          >
            <option value="">— nessuno —</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-paper-300">Stato</label>
          <select
            name="status"
            defaultValue={article?.status ?? "draft"}
            className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
          >
            <option value="draft">Bozza</option>
            <option value="published">Pubblicato</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-paper-300">Categorie</label>
        <div className="flex flex-col gap-1 rounded-md border border-ink-600 bg-ink-800 p-3">
          {orderedCategories().length === 0 && (
            <p className="text-sm text-paper-500">
              Nessuna categoria — creane una in Admin → Categorie.
            </p>
          )}
          {orderedCategories().map(({ cat, depth }) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm text-paper-200">
              <input
                type="checkbox"
                name="categoryIds"
                value={cat.id}
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={(e) => {
                  setSelectedCategoryIds((prev) =>
                    e.target.checked
                      ? [...prev, cat.id]
                      : prev.filter((id) => id !== cat.id),
                  );
                }}
              />
              {categoryLabel(cat, depth)}
            </label>
          ))}
        </div>
      </div>

      <details className="rounded-md border border-ink-600 bg-ink-800 p-3">
        <summary className="cursor-pointer text-sm text-paper-300">SEO (opzionale)</summary>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-paper-300">Titolo SEO</label>
            <input
              name="seoTitle"
              defaultValue={article?.seoTitle ?? ""}
              className="rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-paper-300">Descrizione SEO</label>
            <textarea
              name="seoDescription"
              rows={2}
              defaultValue={article?.seoDescription ?? ""}
              className="rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="self-start rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
      >
        Salva
      </button>
    </form>
  );
}
