"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/#service" },
  { label: "Chi sono", href: "/chi-sono" },
  { label: "Blog", href: "/blog" },
];

const FALLBACK_LOGO_URL =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/articoli/Marchio-Dario-Tana-eCommerce-DJJ83TmbpH4zhP3TO7culMfqCSbEPU.png";

function DarioTanaLogo({ url }: { url: string }) {
  return (
    <Image
      src={url}
      alt="Dario Tana"
      width={199}
      height={106}
      className="h-11 md:h-14 w-auto"
      unoptimized
      priority
    />
  );
}

/** Pill CTA button — electric cyan with contact icon. */
function PillCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group hidden md:inline-flex items-center gap-2 rounded-full bg-[#00e5ff] pl-5 pr-1.5 py-1.5 text-[#0D1218] text-[15px] font-medium transition-all duration-500 hover:bg-[#33ecff] hover:shadow-[0_0_28px_rgba(0,229,255,0.55)]"
    >
      <span>{label}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff]">
        <Mail size={15} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
      </span>
    </a>
  );
}

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const logo = logoUrl ?? FALLBACK_LOGO_URL;

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 bg-[#0D1218] border-b border-white/10"
      >
        <div className="mx-auto h-full max-w-[1240px] px-5 flex items-center justify-between">
          <Link href="/" className="py-3 md:py-0 transition-opacity hover:opacity-80">
            <DarioTanaLogo url={logo} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[15px] text-[#EDF2F7] transition-colors duration-300 hover:text-[#00e5ff] group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#00e5ff] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <PillCta href="/contatti" label="Contatti" />

          <button
            className="lg:hidden p-2 text-[#EDF2F7]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] flex min-h-[100dvh] flex-col bg-[#0D1218] lg:hidden"
          >
              <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 md:h-24 md:px-8">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <DarioTanaLogo url={logo} />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Chiudi menu"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00e5ff]/70 text-[#EDF2F7] transition-colors hover:bg-[#00e5ff]/10 hover:text-[#00e5ff]"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center px-7 pb-20 pt-10">
                <nav className="flex w-full max-w-[440px] flex-col">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.12 + i * 0.07, ease: [0.19, 1, 0.22, 1] }}
                    className="border-b border-[#00e5ff]/20 py-4 text-center text-[22px] font-medium text-[#EDF2F7] transition-colors hover:text-[#00e5ff]"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/contatti"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.44, ease: [0.19, 1, 0.22, 1] }}
                  className="group mt-8 inline-flex w-fit self-center items-center justify-center gap-2 rounded-full bg-[#00e5ff] py-2 pl-6 pr-2 text-base font-medium text-[#0D1218] transition-[background-color,box-shadow] duration-500 hover:bg-[#33ecff] hover:shadow-[0_0_24px_rgba(0,229,255,0.5)]"
                >
                  Contatti
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff]">
                    <Mail size={17} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
                  </span>
                </motion.a>
                </nav>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
