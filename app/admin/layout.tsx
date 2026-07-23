import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/admin/SignOutButton";

const sections = [
  { label: "Articoli", href: "/admin" },
  { label: "Media", href: "/admin/media" },
  { label: "Categorie", href: "/admin/categories" },
  { label: "Tag", href: "/admin/tags" },
  { label: "Autori", href: "/admin/authors" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-ink-900 text-paper-50">
      {session && (
        <header className="border-b border-ink-700">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/admin" className="font-medium">
              Dario Tana — Admin
            </Link>
            <SignOutButton />
          </div>
          <nav className="flex gap-5 px-6 pb-3 text-sm text-paper-300">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="hover:text-celeste-400">
                {s.label}
              </Link>
            ))}
          </nav>
        </header>
      )}
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
