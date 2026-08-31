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
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  breadcrumbJsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const aboutTitle = "Chi sono — Dario Tana | Formatore e consulente e-commerce";
const aboutDescription =
  "Scopri il percorso di Dario Tana, formatore e consulente e-commerce: oltre vent'anni sul campo, più di 150 corsi e progetti seguiti con aziende e imprenditori.";

export async function generateMetadata(): Promise<Metadata> {
  const heroImageUrl = (await getAboutHeroUrl()) ?? DEFAULT_SOCIAL_IMAGE;

  return {
    title: aboutTitle,
    description: aboutDescription,
    alternates: { canonical: `${SITE_URL}/chi-sono` },
    openGraph: {
      title: "Chi sono — Dario Tana",
      description: aboutDescription,
      url: `${SITE_URL}/chi-sono`,
      siteName: SITE_NAME,
      locale: "it_IT",
      type: "profile",
      images: [{ url: heroImageUrl, alt: "Ritratto di Dario Tana" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chi sono — Dario Tana",
      description: aboutDescription,
      images: [heroImageUrl],
    },
  };
}

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
  const profileImageUrl = heroImageUrl ?? DEFAULT_SOCIAL_IMAGE;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Chi sono", path: "/chi-sono" },
      ]),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/chi-sono#profile`,
        url: `${SITE_URL}/chi-sono`,
        name: aboutTitle,
        description: aboutDescription,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: "Dario Tana",
          url: `${SITE_URL}/chi-sono`,
          image: profileImageUrl,
          jobTitle: "Consulente e formatore e-commerce",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="h-card pt-20 md:pt-24">
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
      <JsonLd data={structuredData} />
    </div>
  );
}
