"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Image, FolderOpen, Users, Sparkles, Tag, LayoutDashboard, BarChart3, KeyRound } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

const navItems = [
  { label: "Articoli", href: "/admin", icon: FileText, exact: true },
  { label: "Media", href: "/admin/media", icon: Image, exact: false },
  { label: "Categorie", href: "/admin/categories", icon: FolderOpen, exact: false },
  { label: "Autori", href: "/admin/authors", icon: Users, exact: false },
  { label: "Auto-genera", href: "/admin/auto-generate", icon: Sparkles, exact: false },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, exact: false },
  { label: "Utenti", href: "/admin/users", icon: KeyRound, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
            <LayoutDashboard size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none">Admin</p>
            <p className="text-[11px] text-gray-400 mt-0.5">dariotana.it</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Contenuti
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Vai al sito
          </Link>
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
