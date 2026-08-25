import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Footer } from "@/components/reference-clone/Footer";
import { Header } from "@/components/reference-clone/Header";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { TrustBar } from "@/components/reference-clone/TrustBar";
import { ServicesOverview } from "@/components/services/ServicesOverview";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Servizi e-commerce per aziende e professionisti | Dario Tana",
  description:
    "Consulenza, formazione e speech e-commerce per aziende, professionisti ed enti in tutta Italia. Dario Tana opera da Rimini con oltre vent'anni di esperienza.",
  alternates: {
    canonical: "https://dariotana.it/servizi",
  },
  openGraph: {
    title: "Servizi e-commerce | Dario Tana",
    description:
      "Consulenza, formazione e speech costruiti su progetti reali, per aziende, professionisti ed enti in tutta Italia.",
    url: "https://dariotana.it/servizi",
    siteName: "Dario Tana",
    locale: "it_IT",
    type: "website",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://dariotana.it/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Servizi",
          item: "https://dariotana.it/servizi",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Servizi e-commerce di Dario Tana",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Consulenza e-commerce",
          url: "https://dariotana.it/servizi/consulenza-ecommerce",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Formazione e-commerce",
          url: "https://dariotana.it/servizi/formazione",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Speech ed eventi e-commerce",
          url: "https://dariotana.it/servizi/speech-eventi",
        },
      ],
    },
  ],
};

export default async function ServiziPage() {
  const [logoUrl, partnerLogos] = await Promise.all([getLogoUrl(), getPartnerLogos()]);

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        <ServicesOverview />
        <TrustBar logos={partnerLogos} />
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
