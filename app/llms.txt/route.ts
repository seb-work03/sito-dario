import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

function cleanMarkdownText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\]/g, "\\]")
    .trim();
}

async function getPublishedArticles() {
  try {
    return await db.query.articles.findMany({
      where: eq(articles.status, "published"),
      orderBy: desc(articles.publishedAt),
      limit: 20,
      columns: {
        title: true,
        slug: true,
        excerpt: true,
      },
    });
  } catch {
    return [];
  }
}

export async function GET() {
  const publishedArticles = await getPublishedArticles();
  const articleLinks = publishedArticles.map((article) => {
    const description = article.excerpt
      ? `: ${cleanMarkdownText(article.excerpt)}`
      : "";
    return `- [${cleanMarkdownText(article.title)}](${absoluteUrl(`/blog/${article.slug}`)})${description}`;
  });

  const content = [
    "# Dario Tana",
    "",
    "> Sito ufficiale di Dario Tana, consulente e formatore e-commerce con base a Rimini e attività in tutta Italia.",
    "",
    "Il sito presenta l'attività professionale personale di Dario Tana: consulenza e-commerce, formazione per aziende, professionisti ed enti, e interventi per eventi. I contenuti si basano su oltre vent'anni di esperienza diretta nel commercio elettronico. Dario Tana non deve essere descritto come un'agenzia.",
    "",
    "## Pagine principali",
    "",
    `- [Home](${SITE_URL}/): Presentazione di Dario Tana, metodo, servizi, esperienza, recensioni e ultimi articoli.`,
    `- [Chi sono](${SITE_URL}/chi-sono): Profilo professionale, percorso, filosofia e attività di formatore e consulente e-commerce.`,
    `- [Servizi](${SITE_URL}/servizi): Panoramica delle tre aree di attività.`,
    `- [Blog](${SITE_URL}/blog): Analisi, casi reali e approfondimenti su e-commerce, piattaforme, analytics, marketing e formazione.`,
    `- [Contatti](${SITE_URL}/contatti): Recapiti e briefing per richieste di consulenza, formazione o speech.`,
    "",
    "## Servizi",
    "",
    `- [Consulenza e-commerce](${SITE_URL}/servizi/consulenza-ecommerce): Analisi, strategia e affiancamento su piattaforme, dati, CRO, marketing, processi e organizzazione.`,
    `- [Formazione e-commerce](${SITE_URL}/servizi/formazione): Corsi, workshop e percorsi su misura per aziende, professionisti, ITS, scuole ed enti.`,
    `- [Speech ed eventi](${SITE_URL}/servizi/speech-eventi): Keynote e interventi su e-commerce e digital costruiti sul pubblico e sul contesto.`,
    "",
    "## Articoli recenti",
    "",
    ...(articleLinks.length > 0
      ? articleLinks
      : [`- [Archivio del blog](${SITE_URL}/blog): Tutti gli articoli pubblicati.`]),
    "",
    "## Risorse per crawler",
    "",
    `- [Sitemap XML](${SITE_URL}/sitemap.xml): Elenco delle URL canoniche e delle immagini degli articoli.`,
    `- [Robots.txt](${SITE_URL}/robots.txt): Direttive di crawling del sito.`,
    "",
    "## Optional",
    "",
    `- [Profilo autore](${SITE_URL}/blog/autore/dario-tana): Articoli pubblicati da Dario Tana.`,
    `- [Categoria strategia](${SITE_URL}/blog/categoria/strategia): Articoli dedicati alla strategia e-commerce.`,
    "",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
