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
import { Process } from "@/components/reference-clone/Process";
import { Experience } from "@/components/reference-clone/Experience";
import { Testimonials } from "@/components/reference-clone/Testimonials";
import { Insights } from "@/components/reference-clone/Insights";
import { Faq } from "@/components/reference-clone/Faq";
import { AccentCta } from "@/components/reference-clone/AccentCta";
import { Footer } from "@/components/reference-clone/Footer";

export const metadata: Metadata = {
  title: "Dario Tana — Consulente e docente e-commerce",
  description:
    "Consulenza e formazione e-commerce indipendenti. Aiuto aziende, imprenditori e responsabili e-commerce a prendere decisioni più consapevoli. Oltre vent'anni di esperienza diretta.",
  robots: { index: false, follow: false },
};

async function getHeroPortraitUrl(): Promise<string | null> {
  try {
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

export default async function HomePage() {
  const [portraitUrl, logoUrl] = await Promise.all([getHeroPortraitUrl(), getLogoUrl()]);
  return (
    <div
      className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <Header logoUrl={logoUrl} />
      <main>
        <Hero portraitUrl={portraitUrl} />
        <TrustBar />
        <About />
        <Services />
        <Process />
        <Experience />
        <Testimonials />
        <Insights />
        <Faq />
        <AccentCta />
      </main>
      <Footer />
    </div>
  );
}
