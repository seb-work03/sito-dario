import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { ConsultingPage } from "@/components/services/ConsultingPage";
import { Footer } from "@/components/reference-clone/Footer";
import { Header } from "@/components/reference-clone/Header";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { TrustBar } from "@/components/reference-clone/TrustBar";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Consulenza e-commerce a Rimini e in tutta Italia | Dario Tana",
  description:
    "Consulenza e-commerce indipendente per aziende, imprenditori e team. Strategia, piattaforme, dati, CRO, marketing e processi, da Rimini in tutta Italia.",
  keywords: [
    "consulenza e-commerce",
    "consulente e-commerce",
    "consulente ecommerce Rimini",
    "strategia e-commerce",
    "CRO e-commerce",
    "audit e-commerce",
  ],
  alternates: {
    canonical: "https://dariotana.it/servizi/consulenza-ecommerce",
  },
  openGraph: {
    title: "Consulenza e-commerce | Dario Tana",
    description:
      "Un affiancamento indipendente per trasformare tecnologia, marketing, dati e organizzazione in decisioni più chiare.",
    url: "https://dariotana.it/servizi/consulenza-ecommerce",
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

async function getPortraitImageUrl(): Promise<string | null> {
  try {
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, "%dario%tana%con%sfondo%"))
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
          name: "Consulenza e-commerce",
          item: "https://dariotana.it/servizi/consulenza-ecommerce",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Consulenza e-commerce",
      description:
        "Consulenza strategica e operativa per avviare, analizzare e far crescere progetti e-commerce.",
      serviceType: "Consulenza e-commerce",
      areaServed: { "@type": "Country", name: "Italia" },
      provider: {
        "@type": "Person",
        name: "Dario Tana",
        url: "https://dariotana.it/chi-sono",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rimini",
          addressRegion: "Emilia-Romagna",
          addressCountry: "IT",
        },
      },
      url: "https://dariotana.it/servizi/consulenza-ecommerce",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Cosa fa un consulente e-commerce?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Analizza strategia, tecnologia, dati, marketing, processi e organizzazione per aiutare l’azienda a prendere decisioni più consapevoli e sostenibili.",
          },
        },
        {
          "@type": "Question",
          name: "La consulenza è utile anche prima di aprire un e-commerce?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. Intervenire prima permette di valutare mercato, modello economico, piattaforma, organizzazione e priorità prima di impegnare budget e risorse.",
          },
        },
        {
          "@type": "Question",
          name: "La consulenza e-commerce è disponibile solo a Rimini?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Dario Tana ha base a Rimini e segue aziende e team in tutta Italia, sia online sia in presenza quando il progetto lo richiede.",
          },
        },
        {
          "@type": "Question",
          name: "Puoi collaborare con il team o l’agenzia che segue già il progetto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. La consulenza può affiancare proprietà, e-commerce manager, reparto marketing, sviluppatori e agenzie, chiarendo priorità e responsabilità.",
          },
        },
      ],
    },
  ],
};

export default async function ConsulenzaEcommercePage() {
  const [logoUrl, portraitImageUrl, partnerLogos] = await Promise.all([
    getLogoUrl(),
    getPortraitImageUrl(),
    getPartnerLogos(),
  ]);

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        <ConsultingPage portraitImageUrl={portraitImageUrl} />
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
