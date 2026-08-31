import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Footer } from "@/components/reference-clone/Footer";
import { Header } from "@/components/reference-clone/Header";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { SpeechEventsPage } from "@/components/services/SpeechEventsPage";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_SOCIAL_IMAGE, PERSON_ID } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Speech e conferenze su e-commerce e digital | Dario Tana",
  description:
    "Keynote, speech e confronti su e-commerce, piattaforme, analytics, marketing e advertising per eventi e aziende. Dario Tana, da Rimini in tutta Italia.",
  keywords: [
    "speech e-commerce",
    "speaker e-commerce",
    "relatore eventi digitali",
    "conferenze e-commerce",
    "keynote digital marketing",
    "speaker eventi Rimini",
    "eventi e-commerce",
  ],
  alternates: {
    canonical: "https://dariotana.it/servizi/speech-eventi",
  },
  openGraph: {
    title: "Speech ed eventi su e-commerce e digital | Dario Tana",
    description:
      "Interventi costruiti sul pubblico: esperienza, casi concreti e un linguaggio comprensibile per eventi, confronti e convention aziendali.",
    url: "https://dariotana.it/servizi/speech-eventi",
    siteName: "Dario Tana",
    locale: "it_IT",
    type: "website",
    images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: "Dario Tana durante uno speech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speech ed eventi su e-commerce e digital | Dario Tana",
    description: "Keynote e interventi su e-commerce, dati, piattaforme e marketing.",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

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

const faqEntities = [
  {
    question: "Per quali eventi è possibile richiedere uno speech?",
    answer:
      "Keynote, conferenze, fiere, convention aziendali, dialoghi ed eventi organizzati da associazioni o community.",
  },
  {
    question: "Lo speech viene personalizzato per l’evento?",
    answer:
      "Sì. Tema, esempi, linguaggio, durata e livello di approfondimento vengono costruiti sul pubblico e sugli obiettivi dell’organizzatore.",
  },
  {
    question: "Quali argomenti possono essere trattati?",
    answer:
      "E-commerce, piattaforme, analytics, CRO, marketing, advertising, organizzazione e trasformazione digitale.",
  },
  {
    question: "Gli interventi sono disponibili anche fuori Rimini?",
    answer:
      "Sì. Dario Tana ha base a Rimini e partecipa a eventi in tutta Italia, con possibilità di collegamento da remoto quando il formato lo consente.",
  },
];

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
          name: "Speech ed eventi",
          item: "https://dariotana.it/servizi/speech-eventi",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Speech e interventi per eventi su e-commerce e digital",
      serviceType: "Keynote, speech, dialoghi e interventi per eventi",
      description:
        "Interventi per eventi, conferenze e convention su e-commerce, piattaforme, analytics, CRO, marketing e advertising.",
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
      url: "https://dariotana.it/servizi/speech-eventi",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqEntities.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default async function SpeechEventiPage() {
  const logoUrl = await getLogoUrl();

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        <SpeechEventsPage />
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
      <JsonLd data={structuredData} />
    </div>
  );
}
