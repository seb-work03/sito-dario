"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Chi sono", href: "#about-us" },
  { label: "Servizi", href: "#service" },
  { label: "Metodo", href: "#process" },
  { label: "Testimonianze", href: "#testimon" },
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

/** Pill CTA button — electric cyan, glow + upward arrow rotation on hover */
function PillCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group hidden md:inline-flex items-center gap-2 rounded-full bg-[#00e5ff] pl-5 pr-1.5 py-1.5 text-[#0D1218] text-[15px] font-medium transition-all duration-500 hover:bg-[#33ecff] hover:shadow-[0_0_28px_rgba(0,229,255,0.55)]"
    >
      <span>{label}</span>
      <span className="flex items-center justify-center rounded-full bg-[#0D1218] w-9 h-9 shrink-0">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="2.2"
          className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const logo = logoUrl ?? FALLBACK_LOGO_URL;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 bg-[#0D1218] border-b border-white/10"
      >
        <div className="mx-auto h-full max-w-[1240px] px-5 flex items-center justify-between">
          <a href="#" className="py-3 md:py-0 transition-opacity hover:opacity-80">
            <DarioTanaLogo url={logo} />
          </a>

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

          <PillCta href="/contatti" label="Parliamone" />

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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[51] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-[82%] max-w-[360px] flex-col bg-[#0D1218] shadow-2xl lg:hidden"
            >
              <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                <DarioTanaLogo url={logo} />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Chiudi menu"
                  className="p-2 text-[#EDF2F7] transition-colors hover:text-[#00e5ff]"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col px-6 py-6 gap-1">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.05,
                      duration: 0.35,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className="text-lg font-medium text-[#EDF2F7] py-3 border-b border-white/10"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/contatti"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + navLinks.length * 0.05,
                    duration: 0.35,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#00e5ff] text-[#0D1218] font-medium py-4 transition-all duration-500 hover:bg-[#33ecff] hover:shadow-[0_0_24px_rgba(0,229,255,0.5)]"
                >
                  Parliamone
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
