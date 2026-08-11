/**
 * Topics and criteria for automatic article generation.
 * Edit this file to change what gets generated.
 */

export type TopicConfig = {
  topic: string;
  imageKeywords: string;
  categorySlug: string;
  seoFocus?: string;
};

export const AUTO_GENERATE_TOPICS: TopicConfig[] = [
  {
    topic: "Strategie di ecommerce B2B: come aumentare le vendite online per aziende manifatturiere italiane",
    imageKeywords: "ecommerce business warehouse italy",
    categorySlug: "ecommerce",
    seoFocus: "ecommerce B2B Italia",
  },
  {
    topic: "Come ottimizzare il checkout per ridurre l'abbandono del carrello nel 2025",
    imageKeywords: "online shopping checkout conversion",
    categorySlug: "ecommerce",
    seoFocus: "checkout ottimizzazione abbandono carrello",
  },
  {
    topic: "Marketplace vs sito proprietario: quando conviene aprire il proprio ecommerce",
    imageKeywords: "marketplace ecommerce business decision",
    categorySlug: "strategia",
    seoFocus: "marketplace vs ecommerce proprietario",
  },
  {
    topic: "Come usare i dati per aumentare il tasso di conversione nel tuo shop online",
    imageKeywords: "data analytics ecommerce dashboard",
    categorySlug: "strategia",
    seoFocus: "conversione ecommerce dati analytics",
  },
  {
    topic: "Internazionalizzazione dell'ecommerce: come vendere in Europa senza perdere margine",
    imageKeywords: "international shipping europe business",
    categorySlug: "ecommerce",
    seoFocus: "ecommerce internazionalizzazione europa",
  },
  {
    topic: "UX e design per ecommerce: gli errori più comuni che costano vendite",
    imageKeywords: "ux design website mobile interface",
    categorySlug: "strategia",
    seoFocus: "UX design ecommerce errori conversione",
  },
];

/** Returns topics in round-robin order based on the current month. */
export function pickTopicForMonth(date: Date = new Date()): TopicConfig {
  const idx = date.getMonth() % AUTO_GENERATE_TOPICS.length;
  return AUTO_GENERATE_TOPICS[idx];
}
