"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Image, FolderOpen, Users, Sparkles } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

const navItems = [
  { label: "Articoli", href: "/admin", icon: FileText, exact: true },
  { label: "Media", href: "/admin/media", icon: Image, exact: false },
  { label: "Categorie", href: "/admin/categories", icon: FolderOpen, exact: false },
  { label: "Autori", href: "/admin/authors", icon: Users, exact: false },
  { label: "Auto-genera", href: "/admin/auto-generate", icon: Sparkles, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-52 bg-white border-r border-gray-200 flex flex-col z-40">
      <div className="px-4 py-4 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-900">Admin</span>
      </div>

      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={15} className="shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" target="_blank" className="text-xs text-gray-400 hover:text-gray-700">
          ← Sito
        </Link>
        <SignOutButton />
      </div>
    </aside>
  );
}
