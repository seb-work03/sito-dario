import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { AboutStory } from "@/components/about/AboutStory";
import { Footer } from "@/components/reference-clone/Footer";
import { Header } from "@/components/reference-clone/Header";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { TrustBar } from "@/components/reference-clone/TrustBar";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chi sono — Dario Tana | Formatore e consulente e-commerce",
  description:
    "Dario Tana è formatore, consulente e divulgatore e-commerce. Oltre vent'anni di esperienza sul campo, più di 150 corsi e percorsi costruiti per aziende e imprenditori.",
  openGraph: {
    title: "Chi sono — Dario Tana",
    description:
      "Oltre vent'anni nell'e-commerce, dal lavoro operativo alla formazione per aziende, imprenditori ed enti.",
    url: "https://dariotana.it/chi-sono",
    siteName: "Dario Tana",
    locale: "it_IT",
    type: "profile",
  },
};

type PartnerLogo = { url: string; alt: string };

const partners = [
  { pattern: "%its%turismo%marche%", alt: "ITS Turismo Marche" },
  { pattern: "%formart%", alt: "Formart" },
  { pattern: "%fondazione%aldini%valeriani%", alt: "Fondazione Aldini Valeriani" },
  { pattern: "%digital%coach%", alt: "Digital Coach" },
  { pattern: "%cescot%emilia%romagna%", alt: "Cescot Emilia Romagna" },
  { pattern: "%centro%zavatta%", alt: "Centro Zavatta" },
  { pattern: "%banca%malatestiana%", alt: "Banca Malatestiana" },
];

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

async function getAboutHeroUrl(): Promise<string | null> {
  try {
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, "%dario%tana%chi%sono%"))
      .orderBy(desc(media.createdAt))
      .limit(1);
    return rows[0]?.url ?? null;
  } catch {
    return null;
  }
}

async function getMediaUrl(filename: string): Promise<string | null> {
  try {
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, filename))
      .orderBy(desc(media.createdAt))
      .limit(1);
    return rows[0]?.url ?? null;
  } catch {
    return null;
  }
}

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
    return results.filter((item): item is PartnerLogo => item !== null);
  } catch {
    return [];
  }
}

export default async function ChiSonoPage() {
  const [logoUrl, partnerLogos, heroImageUrl, galleryLeft, galleryCenter, galleryRight] = await Promise.all([
    getLogoUrl(),
    getPartnerLogos(),
    getAboutHeroUrl(),
    getMediaUrl("dario tana con sfondo.jpg"),
    getMediaUrl("dario tana lezione.jpg"),
    getMediaUrl("dario tana lezione 2.jpg"),
  ]);

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        <AboutStory
          heroImageUrl={heroImageUrl}
          galleryImages={{
            left: galleryLeft,
            center: galleryCenter,
            right: galleryRight,
          }}
        />
        <TrustBar logos={partnerLogos} />
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
    </div>
  );
}
