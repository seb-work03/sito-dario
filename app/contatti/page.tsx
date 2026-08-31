import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { StrategicBriefing } from "@/components/reference-clone/StrategicBriefing";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  breadcrumbJsonLd,
} from "@/lib/seo";

const contactDescription =
  "Contatta Dario Tana per consulenza e-commerce, formazione aziendale o speech. Compila il briefing: riceverai una risposta entro uno o due giorni lavorativi.";

export const metadata: Metadata = {
  title: "Contatti — Dario Tana",
  description: contactDescription,
  alternates: { canonical: `${SITE_URL}/contatti` },
  openGraph: {
    title: "Contatti — Dario Tana",
    description: contactDescription,
    url: `${SITE_URL}/contatti`,
    siteName: SITE_NAME,
    locale: "it_IT",
    type: "website",
    images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: "Dario Tana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti — Dario Tana",
    description: contactDescription,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contatti", path: "/contatti" },
    ]),
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contatti#contact-page`,
      url: `${SITE_URL}/contatti`,
      name: "Contatti — Dario Tana",
      description:
        "Contatti per consulenza e-commerce, formazione e speech per eventi.",
      inLanguage: "it-IT",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
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

export default async function ContattiPage() {
  const logoUrl = await getLogoUrl();

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />

      <main>
        {/* Page header spacer */}
        <div className="h-20 md:h-24" />

        {/* Briefing form (reused from homepage) */}
        <StrategicBriefing />
      </main>

      <Footer logoUrl={logoUrl} hideCta />
      <ScrollToTop />
      <JsonLd data={structuredData} />
    </div>
  );
}
