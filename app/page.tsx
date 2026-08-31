import type { Metadata } from "next";
import { and, desc, ilike, notIlike, or } from "drizzle-orm";
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
import { Footer } from "@/components/reference-clone/Footer";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const homeTitle =
  "Dario Tana — Consulenza e-commerce a Rimini | Consulente e docente e-commerce";
const homeDescription =
  "Consulenza e-commerce indipendente a Rimini per aziende, imprenditori e e-commerce manager. Oltre vent'anni di esperienza diretta in strategia, piattaforme e formazione.";

export async function generateMetadata(): Promise<Metadata> {
  const portraitUrl = (await getHeroPortraitUrl()) ?? DEFAULT_SOCIAL_IMAGE;

  return {
    title: homeTitle,
    description: homeDescription,
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
    alternates: { canonical: SITE_URL },
    authors: [{ name: "Dario Tana", url: `${SITE_URL}/chi-sono` }],
    openGraph: {
      title: "Dario Tana — Consulenza e-commerce a Rimini",
      description: homeDescription,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "it_IT",
      type: "website",
      images: [{ url: portraitUrl, alt: "Dario Tana, consulente e formatore e-commerce" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dario Tana — Consulenza e-commerce a Rimini",
      description: homeDescription,
      images: [portraitUrl],
    },
  };
}

async function getHeroPortraitUrl(): Promise<string | null> {
  try {
    // Exclude sfondo/selfie so we don't pick up the About images by accident.
    const excludeAbout = and(
      notIlike(media.filename, "%sfondo%"),
      notIlike(media.filename, "%selfie%"),
    );
    // Prefer the webp version
    const webp = await db
      .select({ url: media.url })
      .from(media)
      .where(and(ilike(media.filename, "%dario%tana%.webp"), excludeAbout))
      .orderBy(desc(media.createdAt))
      .limit(1);
    if (webp[0]?.url) return webp[0].url;
    // Fallback to any dario tana image
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(and(ilike(media.filename, "%dario%tana%"), excludeAbout))
      .orderBy(desc(media.createdAt))
      .limit(1);
    return rows[0]?.url ?? null;
  } catch {
    return null;
  }
}

async function getMediaByPattern(pattern: string): Promise<string | null> {
  try {
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, pattern))
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
  const [
    portraitUrl,
    logoUrl,
    partnerLogos,
    aboutBackgroundUrl,
    aboutSelfieUrl,
    consulenteUrl,
    formazioneUrl,
    speechUrl,
  ] = await Promise.all([
    getHeroPortraitUrl(),
    getLogoUrl(),
    getPartnerLogos(),
    getMediaByPattern("%dario%tana%sfondo%"),
    getMediaByPattern("%dario%tana%selfie%"),
    getMediaByPattern("%consulente%"),
    getMediaByPattern("%formazione%"),
    getMediaByPattern("%speech%"),
  ]);
  const socialPortraitUrl = portraitUrl ?? DEFAULT_SOCIAL_IMAGE;
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#home`,
    url: SITE_URL,
    name: homeTitle,
    description: homeDescription,
    inLanguage: "it-IT",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: socialPortraitUrl,
      caption: "Dario Tana, consulente e formatore e-commerce",
    },
  };

  return (
    <div
      className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <Header logoUrl={logoUrl} />
      <main>
        <Hero portraitUrl={portraitUrl} />
        <TrustBar logos={partnerLogos} />
        <About backgroundUrl={aboutBackgroundUrl} selfieUrl={aboutSelfieUrl} />
        <Services
          consulenteUrl={consulenteUrl}
          formazioneUrl={formazioneUrl}
          speechUrl={speechUrl}
        />
        <Fit />
        <Process />
        <Experience />
        <Insights />
        <Testimonials />
        <LatestArticles />
        <Faq />
        <StrategicBriefing />
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
      <JsonLd data={homeStructuredData} />
    </div>
  );
}
