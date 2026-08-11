"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Image,
  FolderOpen,
  Users,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
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
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0D1218] border-r border-white/8 flex flex-col z-40">
      {/* Logo / brand */}
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00e5ff]/10 text-[#00e5ff]">
            <LayoutDashboard size={16} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-paper-50 tracking-wide">Dario Tana</span>
            <span className="text-[11px] text-paper-500">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-paper-600">
          Contenuti
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all duration-150 ${
                active
                  ? "bg-[#00e5ff]/10 text-[#00e5ff]"
                  : "text-paper-400 hover:bg-white/5 hover:text-paper-100"
              }`}
            >
              <Icon
                size={16}
                className={`shrink-0 ${active ? "text-[#00e5ff]" : "text-paper-500"}`}
              />
              {item.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/8 px-5 py-4 flex items-center justify-between">
        <Link
          href="/"
          target="_blank"
          className="text-[12px] text-paper-500 hover:text-paper-300 transition-colors"
        >
          ← Vai al sito
        </Link>
        <SignOutButton />
      </div>
    </aside>
  );
}
