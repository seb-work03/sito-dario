import type { Metadata } from "next";
import { desc, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { StrategicBriefing } from "@/components/reference-clone/StrategicBriefing";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Contatti — Dario Tana",
  description: "Raccontami il tuo progetto: e-commerce, formazione o speech. Compila il briefing e ti ricontatto in 1-2 giorni lavorativi.",
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
    </div>
  );
}
