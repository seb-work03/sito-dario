import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { Header } from "@/components/reference-clone/Header";
import { Hero } from "@/components/reference-clone/Hero";
import { TrustBar } from "@/components/reference-clone/TrustBar";
import { About } from "@/components/reference-clone/About";
import { Services } from "@/components/reference-clone/Services";
import { Fit } from "@/components/reference-clone/Fit";
import { Process } from "@/components/reference-clone/Process";
import { Experience } from "@/components/reference-clone/Experience";
import { Testimonials } from "@/components/reference-clone/Testimonials";
import { Insights } from "@/components/reference-clone/Insights";
import { LatestArticles } from "@/components/reference-clone/LatestArticles";
import { Faq } from "@/components/reference-clone/Faq";
import { StrategicBriefing } from "@/components/reference-clone/StrategicBriefing";
import { AccentCta } from "@/components/reference-clone/AccentCta";
import { Footer } from "@/components/reference-clone/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dario Tana — Consulenza e-commerce a Rimini | Consulente e docente e-commerce",
  description:
    "Consulenza e-commerce indipendente a Rimini per aziende, imprenditori e e-commerce manager. Oltre vent'anni di esperienza diretta in strategia, piattaforme e formazione. Consulenza e-commerce Rimini, docenza e formazione su misura.",
  keywords: [
    "consulenza e-commerce",
    "consulenza e-commerce Rimini",
    "consulente e-commerce Rimini",
    "e-commerce manager",
    "e-commerce Rimini",
    "formazione e-commerce",
    "docente e-commerce",
    "Dario Tana",
  ],
  authors: [{ name: "Dario Tana", url: "https://dariotana.it" }],
  openGraph: {
    title: "Dario Tana — Consulenza e-commerce a Rimini",
    description:
      "Consulenza e-commerce indipendente per imprenditori e e-commerce manager. Rimini. Oltre vent'anni di esperienza sul campo.",
    url: "https://dariotana.it",
    siteName: "Dario Tana",
    locale: "it_IT",
    type: "website",
  },
  robots: { index: true, follow: true },
};

async function getHeroPortraitUrl(): Promise<string | null> {
  try {
    // Prefer the webp version
    const webp = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, "%dario%tana%.webp"))
      .orderBy(desc(media.createdAt))
      .limit(1);
    if (webp[0]?.url) return webp[0].url;
    // Fallback to any dario tana image
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, "%dario%tana%"))
      .orderBy(desc(media.createdAt))
      .limit(1);
    return rows[0]?.url ?? null;
  } catch {
    return null;
  }
}

async function getLogoUrl(): Promise<string | null> {
  try {
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(or(ilike(media.filename, "%marchio%dario%"), ilike(media.filename, "%marchio%tana%")))
      .orderBy(desc(media.createdAt))
      .limit(1);
    return rows[0]?.url ?? null;
  } catch {
    return null;
  }
}

type PartnerLogo = { url: string; alt: string };

const partners: { pattern: string; alt: string }[] = [
  { pattern: "%its%turismo%marche%", alt: "ITS Turismo Marche" },
  { pattern: "%formart%", alt: "Formart" },
  { pattern: "%fondazione%aldini%valeriani%", alt: "Fondazione Aldini Valeriani" },
  { pattern: "%digital%coach%", alt: "Digital Coach" },
  { pattern: "%cescot%emilia%romagna%", alt: "Cescot Emilia Romagna" },
  { pattern: "%centro%zavatta%", alt: "Centro Zavatta" },
  { pattern: "%banca%malatestiana%", alt: "Banca Malatestiana" },
];

async function getPartnerLogos(): Promise<PartnerLogo[]> {
  try {
    const results = await Promise.all(
      partners.map(async ({ pattern, alt }) => {
        const rows = await db
          .select({ url: media.url })
          .from(media)
          .where(ilike(media.filename, pattern))
          .orderBy(desc(media.createdAt))
          .limit(1);
        return rows[0]?.url ? { url: rows[0].url, alt } : null;
      }),
    );
    return results.filter((r): r is PartnerLogo => r !== null);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [portraitUrl, logoUrl, partnerLogos] = await Promise.all([
    getHeroPortraitUrl(),
    getLogoUrl(),
    getPartnerLogos(),
  ]);
  return (
    <div
      className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <Header logoUrl={logoUrl} />
      <main>
        <Hero portraitUrl={portraitUrl} />
        <TrustBar logos={partnerLogos} />
        <About />
        <Services />
        <Fit />
        <Process />
        <Experience />
        <Insights />
        <Testimonials />
        <LatestArticles />
        <Faq />
        <StrategicBriefing />
        <AccentCta />
      </main>
      <Footer />
    </div>
  );
}
