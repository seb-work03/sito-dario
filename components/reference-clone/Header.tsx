"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Chi sono", href: "#about-us" },
  { label: "Servizi", href: "#service" },
  { label: "Metodo", href: "#process" },
  { label: "Testimonianze", href: "#testimon" },
];

/** Dario Tana wordmark — teal "D" accent, clean geometric letterforms */
function DarioTanaLogo() {
  return (
    <svg
      width="148"
      height="32"
      viewBox="0 0 148 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dario Tana"
    >
      {/* D */}
      <text
        x="0"
        y="25"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="400"
        fill="#77C0CF"
        letterSpacing="-0.5"
      >
        D
      </text>
      {/* ario Tana */}
      <text
        x="19"
        y="25"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="400"
        fill="#EDF2F7"
        letterSpacing="-0.5"
      >
        ario Tana
      </text>
    </svg>
  );
}

/** Pill CTA button — teal background, dark arrow circle, arrow slides on hover */
function PillCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group hidden md:inline-flex items-center gap-2 rounded-full bg-[#77C0CF] pl-5 pr-1.5 py-1.5 text-[#0D1218] text-[15px] font-medium transition-all duration-500 hover:bg-[#5BAAB9] hover:pl-7"
    >
      <span>{label}</span>
      <span className="relative flex items-center justify-center rounded-full bg-[#0D1218] w-9 h-9 overflow-hidden shrink-0">
        {/* Arrow exits top-right on hover */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#77C0CF"
          strokeWidth="2.2"
          className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8 group-hover:-translate-y-8"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
        {/* Arrow enters from bottom-left on hover */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#77C0CF"
          strokeWidth="2.2"
          className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0D1218] transition-shadow duration-300"
        style={{ height: 80, boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none" }}
      >
        <div className="mx-auto h-full max-w-[1240px] px-5 flex items-center justify-between">
          <a href="#" className="transition-opacity hover:opacity-80">
            <DarioTanaLogo />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[15px] text-[#EDF2F7] transition-colors duration-300 hover:text-[#77C0CF] group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#77C0CF] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <PillCta href="/contatti" label="Parliamone" />

          <button
            className="lg:hidden p-2 text-[#EDF2F7]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0D1218] lg:hidden pt-[80px]"
          >
            <nav className="flex flex-col px-6 py-8 gap-2">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-medium text-[#EDF2F7] py-3 border-b border-white/10"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="/contatti"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#77C0CF] text-[#0D1218] font-medium py-4"
              >
                Parliamone
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
