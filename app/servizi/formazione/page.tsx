import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Footer } from "@/components/reference-clone/Footer";
import { Header } from "@/components/reference-clone/Header";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { TrustBar } from "@/components/reference-clone/TrustBar";
import { FormationPage } from "@/components/services/FormationPage";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_SOCIAL_IMAGE, PERSON_ID } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Formazione e corsi e-commerce a Rimini e in Italia | Dario Tana",
  description:
    "Corsi e formazione e-commerce per aziende, professionisti, ITS ed enti. Percorsi su misura su strategia, piattaforme, analytics, marketing e gestione, da Rimini in tutta Italia.",
  keywords: [
    "formazione e-commerce",
    "corsi e-commerce",
    "formatore e-commerce",
    "corso ecommerce Rimini",
    "formazione ecommerce aziende",
    "docente e-commerce",
    "corso Google Analytics 4 ecommerce",
  ],
  alternates: {
    canonical: "https://dariotana.it/servizi/formazione",
  },
  openGraph: {
    title: "Formazione e corsi e-commerce | Dario Tana",
    description:
      "Formazione concreta e su misura per aziende, professionisti, team ed enti: dalle basi dell’e-commerce ai problemi reali del lavoro.",
    url: "https://dariotana.it/servizi/formazione",
    siteName: "Dario Tana",
    locale: "it_IT",
    type: "website",
    images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: "Dario Tana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione e corsi e-commerce | Dario Tana",
    description: "Corsi e percorsi e-commerce su misura per aziende, professionisti ed enti.",
    images: [DEFAULT_SOCIAL_IMAGE],
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dariotana.it/" },
        { "@type": "ListItem", position: 2, name: "Servizi", item: "https://dariotana.it/servizi" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Formazione e-commerce",
          item: "https://dariotana.it/servizi/formazione",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Formazione e corsi e-commerce",
      serviceType: "Formazione e-commerce per aziende, professionisti ed enti",
      description:
        "Corsi, workshop e percorsi di formazione su strategia e-commerce, piattaforme, analytics, CRO, marketing, advertising, logistica e gestione.",
      areaServed: { "@type": "Country", name: "Italia" },
      provider: {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Dario Tana",
        url: "https://dariotana.it/chi-sono",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rimini",
          addressRegion: "Emilia-Romagna",
          addressCountry: "IT",
        },
      },
      url: "https://dariotana.it/servizi/formazione",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "I corsi sono adatti anche a chi parte da zero?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. Ogni percorso parte dalla verifica delle competenze iniziali e costruisce una base comune, senza richiedere conoscenze tecniche pregresse.",
          },
        },
        {
          "@type": "Question",
          name: "È possibile organizzare un corso e-commerce su misura?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. Programma, durata, livello ed esercitazioni vengono definiti in base agli obiettivi dell’azienda o dell’ente di formazione.",
          },
        },
        {
          "@type": "Question",
          name: "La formazione può svolgersi direttamente in azienda?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. I corsi possono essere svolti in azienda, in aula, online oppure in modalità ibrida.",
          },
        },
        {
          "@type": "Question",
          name: "Collabori anche con ITS, scuole ed enti di formazione?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. Dario Tana collabora con enti, academy, ITS e organizzazioni nella docenza e nella progettazione dei contenuti.",
          },
        },
      ],
    },
  ],
};

export default async function FormazionePage() {
  const [logoUrl, lessonImageUrl, lessonSecondImageUrl, partnerLogos] = await Promise.all([
    getLogoUrl(),
    getMediaUrl("dario tana lezione.jpg"),
    getMediaUrl("dario tana lezione 2.jpg"),
    getPartnerLogos(),
  ]);

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        <FormationPage lessonImageUrl={lessonImageUrl} lessonSecondImageUrl={lessonSecondImageUrl} />
        <TrustBar logos={partnerLogos} />
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
      <JsonLd data={structuredData} />
    </div>
  );
}
