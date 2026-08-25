"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { Reveal } from "./Reveal";

const FALLBACK_LOGO_URL =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/articoli/Marchio-Dario-Tana-eCommerce-DJJ83TmbpH4zhP3TO7culMfqCSbEPU.png";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z"/>
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.55-.79.31-1.46.72-2.13 1.38C1.34 2.68.93 3.35.62 4.14.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.55 2.91.31.79.72 1.46 1.38 2.13.66.66 1.34 1.07 2.13 1.38.76.29 1.63.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.55a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.29-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.55-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.62C19.1.33 18.23.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/>
    </svg>
  );
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dario-tana-959062101/", icon: <LinkedinIcon size={16} /> },
  { label: "Facebook", href: "https://www.facebook.com/dariotanaconsulenteecommerce", icon: <FacebookIcon size={16} /> },
  { label: "Instagram", href: "https://www.instagram.com/dariotana_consulenteecommerce/", icon: <InstagramIcon size={16} /> },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/#service" },
  { label: "Chi sono", href: "/chi-sono" },
  { label: "Blog", href: "/blog" },
];

const contacts = [
  { label: "Email", value: "info@dariotana.it", href: "mailto:info@dariotana.it", icon: <Mail size={16} strokeWidth={1.75} /> },
  { label: "Telefono", value: "+39 348 783 0571", href: "tel:+393487830571", icon: <Phone size={16} strokeWidth={1.75} /> },
  { label: "Indirizzo", value: "Via dell'albero 34/c — Rimini (RN)", href: "https://maps.google.com/?q=Via+dell%27albero+34%2Fc+Rimini+RN", icon: <MapPin size={16} strokeWidth={1.75} /> },
];

/**
 * Site-wide footer.
 *
 * Structure:
 *   1. Cyan "AccentCta" band on top — same styling as the standalone
 *      AccentCta section but now permanently attached to the footer, so every
 *      frontend page ends with the same CTA + footer combo.
 *   2. Dark bottom band with logo, socials, menu, contacts and legal row.
 *
 * `logoUrl` is optional — falls back to the same public blob URL as the
 * Header, so the footer keeps working on pages that don't fetch media.
 */
export function Footer({ logoUrl, hideCta = false }: { logoUrl?: string | null; hideCta?: boolean } = {}) {
  const logo = logoUrl ?? FALLBACK_LOGO_URL;

  return (
    <footer className="overflow-hidden">
      {/* Cyan CTA band */}
      {!hideCta && (
      <section
        className="px-5 py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #00e5ff 0%, #008a99 100%)" }}
      >
        <div className="mx-auto max-w-[1240px] text-center flex flex-col items-center gap-8">
          <AnimatedHeadline
            delay={0.1}
            className="text-[#0D1218] font-medium text-[32px] md:text-[56px] leading-[1.05] tracking-tight max-w-3xl text-balance"
          >
            Pronto a costruire qualcosa che funziona davvero?
          </AnimatedHeadline>

          <Reveal y={14} delay={0.25} duration={0.7}>
            <a
              href="/contatti"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0D1218] text-[#00e5ff] font-medium pl-6 pr-2 py-2 text-[16px] transition-all duration-500 hover:shadow-[0_0_32px_rgba(13,18,24,0.4)]"
            >
              Contatti
              <span className="flex items-center justify-center rounded-full bg-[#00e5ff] text-[#0D1218] w-10 h-10 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
      )}

      {/* Dark bottom band */}
      <div className="bg-[#17222F] px-5 pt-20 pb-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-14">
            <div className="flex flex-col gap-8">
              <Link href="/" aria-label="Dario Tana — home" className="inline-flex transition-opacity hover:opacity-80">
                <Image
                  src={logo}
                  alt="Dario Tana"
                  width={199}
                  height={106}
                  unoptimized
                  className="h-14 md:h-16 w-auto"
                />
              </Link>

              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#00e5ff]/15 border border-white/10 hover:border-[#00e5ff]/40 flex items-center justify-center text-[#dddddd] hover:text-[#00e5ff] transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-64 shrink-0">
              <ul className="flex flex-col gap-3">
                <li className="text-xs uppercase tracking-[0.15em] text-white font-medium mb-2">Menu</li>
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white hover:text-[#00e5ff] transition-colors duration-300 text-sm">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-4">
                <li className="text-xs uppercase tracking-[0.15em] text-white font-medium mb-1">Contatti</li>
                {contacts.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-2.5 text-sm"
                    >
                      <span className="text-[#00e5ff] mt-0.5 shrink-0">{c.icon}</span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-[#dddddd] text-[11px] uppercase tracking-[0.12em]">{c.label}</span>
                        <span className="text-white group-hover:text-[#00e5ff] transition-colors duration-300 mt-0.5">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#dddddd] text-xs">
            <span>
              2026 ©{" "}
              <a href="https://dariotana.it/" className="text-white hover:text-[#00e5ff] transition-colors">Dario Tana</a>
              , Tutti i diritti sono riservati. P.Iva: 04018390403
            </span>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-[#00e5ff] transition-colors">Privacy</a>
              <a href="/cookie" className="hover:text-[#00e5ff] transition-colors">Cookie</a>
              <a href="/note-legali" className="hover:text-[#00e5ff] transition-colors">Note legali</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
