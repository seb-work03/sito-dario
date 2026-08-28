import { serializeBlocks, tryParseBlocks, type Block, type ImageTextBlock } from "@/lib/blocks";

const platformBlocks: ImageTextBlock[] = [
  {
    id: "platform-shopify-2026",
    type: "image-text",
    align: "left",
    title: "Shopify",
    imageFit: "contain",
    url: "",
    alt: "Logo Shopify",
    text:
      "Shopify è spesso una scelta efficace quando servono **rapidità di avvio, stabilità e gestione semplificata**. L'infrastruttura SaaS riduce molte attività tecniche e permette al team di concentrarsi su catalogo, contenuti e marketing. Prima di sceglierlo bisogna però valutare i costi ricorrenti, la dipendenza dalle app, i limiti di personalizzazione e la compatibilità con ERP, CRM e altri sistemi centrali per l'azienda.",
  },
  {
    id: "platform-woocommerce-2026",
    type: "image-text",
    align: "right",
    title: "WooCommerce",
    imageFit: "contain",
    url: "",
    alt: "Logo WooCommerce",
    text:
      "WooCommerce è interessante quando **contenuti ed e-commerce devono convivere strettamente**, soprattutto per organizzazioni che conoscono già WordPress. Offre molta libertà nella costruzione dell'esperienza e un ingresso accessibile, ma la qualità finale dipende dall'architettura scelta. Hosting, sicurezza, aggiornamenti e compatibilità dei plugin vanno governati con attenzione: accumulare estensioni senza un progetto chiaro può generare fragilità, rallentamenti e costi nascosti.",
  },
  {
    id: "platform-prestashop-2026",
    type: "image-text",
    align: "left",
    title: "PrestaShop",
    imageFit: "contain",
    url: "",
    alt: "Logo PrestaShop",
    text:
      "PrestaShop può adattarsi bene a progetti che cercano una **piattaforma dedicata al commercio elettronico** e una buona possibilità di personalizzazione. Gestisce cataloghi e funzioni commerciali in modo più specifico rispetto a un CMS generalista. La sostenibilità del progetto dipende però dalla qualità dei moduli, dagli aggiornamenti e dalle competenze del partner: personalizzazioni poco documentate possono rendere più complessa ogni evoluzione successiva.",
  },
  {
    id: "platform-magento-2026",
    type: "image-text",
    align: "right",
    title: "Magento o Adobe Commerce",
    imageFit: "contain",
    url: "",
    alt: "Logo Magento o Adobe Commerce",
    text:
      "Magento o Adobe Commerce ha senso quando il progetto presenta **cataloghi articolati, logiche B2B, più store, listini complessi e integrazioni profonde**. La piattaforma offre possibilità estese e una notevole capacità di adattamento, ma richiede budget, governance e competenze tecniche adeguate. Non va scelta per prestigio o abitudine: se processi e organizzazione non ne giustificano la complessità, si rischia di sostenere costi elevati senza utilizzare davvero il suo potenziale.",
  },
];

export function migratePlatformLogoGridToImageText(content: string): string | null {
  const blocks = tryParseBlocks(content);
  if (!blocks) return null;

  const start = blocks.findIndex((block) => block.type === "logo-grid");
  if (start === -1) return null;

  const nextSection = blocks.findIndex(
    (block, index) => index > start && block.type === "heading" && block.level === 2,
  );
  const end = nextSection === -1 ? blocks.length : nextSection;
  const existingSection = blocks.slice(start + 1, end);
  const closingBlocks = existingSection.filter(
    (block): block is Block =>
      block.type === "quote" ||
      (block.type === "paragraph" && block.text.startsWith("Una soluzione custom")),
  );

  return serializeBlocks([
    ...blocks.slice(0, start),
    ...platformBlocks,
    ...closingBlocks,
    ...blocks.slice(end),
  ]);
}
