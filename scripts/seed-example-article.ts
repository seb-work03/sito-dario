/**
 * Seeds one example article so you can see the blog card + article page
 * render end-to-end. Safe to run more than once: it looks for an article
 * with the sample slug and skips if it exists.
 *
 * Run with:
 *   DATABASE_URL='...' npx tsx scripts/seed-example-article.ts
 */

import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { desc, eq } from "drizzle-orm";
import * as schema from "../lib/db/schema";
import { slugify } from "../lib/utils";

const SAMPLE_SLUG = "come-scegliere-la-piattaforma-e-commerce-giusta";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Pass it inline or via .env.");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  // Already there? Skip.
  const existing = await db.query.articles.findFirst({
    where: eq(schema.articles.slug, SAMPLE_SLUG),
  });
  if (existing) {
    console.log(`Article '${SAMPLE_SLUG}' already exists (id ${existing.id}), skipping.`);
    return;
  }

  // 1. Author — reuse "Dario Tana" if present, otherwise create it
  const authorName = "Dario Tana";
  const authorSlug = slugify(authorName);
  let author = await db.query.authors.findFirst({
    where: eq(schema.authors.slug, authorSlug),
  });
  if (!author) {
    [author] = await db
      .insert(schema.authors)
      .values({
        name: authorName,
        slug: authorSlug,
        bio: "Consulente e docente e-commerce. Oltre vent'anni di esperienza diretta sul canale digitale.",
      })
      .returning();
    console.log(`Created author '${authorName}' (id ${author.id}).`);
  } else {
    console.log(`Reusing author '${authorName}' (id ${author.id}).`);
  }

  // 2. Category — reuse "Strategia" if present, otherwise create it
  const categoryName = "Strategia";
  const categorySlug = slugify(categoryName);
  let category = await db.query.categories.findFirst({
    where: eq(schema.categories.slug, categorySlug),
  });
  if (!category) {
    [category] = await db
      .insert(schema.categories)
      .values({
        name: categoryName,
        slug: categorySlug,
        description: "Riflessioni e metodo per decisioni di canale.",
        parentId: null,
      })
      .returning();
    console.log(`Created category '${categoryName}' (id ${category.id}).`);
  } else {
    console.log(`Reusing category '${categoryName}' (id ${category.id}).`);
  }

  // 3. Cover media — pick the most recent image from the library so the
  //    card has something concrete to show. If the library is empty the
  //    article is created without a cover (the card degrades to a gradient).
  const anyMedia = await db.query.media.findFirst({
    orderBy: desc(schema.media.createdAt),
  });

  if (anyMedia) {
    console.log(`Using media '${anyMedia.filename}' (id ${anyMedia.id}) as cover.`);
  } else {
    console.log("No media in the library, article will be created without a cover.");
  }

  // 4. The article itself
  const content = `## Perché la scelta della piattaforma pesa più di quanto sembri

Ogni progetto e-commerce, prima o poi, si scontra con la stessa domanda: **la piattaforma su cui abbiamo costruito è ancora quella giusta?** Non è una questione di gusto, ma di margini, tempi di rilascio e capacità di reagire al mercato.

La piattaforma non è il progetto — è l'infrastruttura che permette al progetto di esistere. Sceglierla senza metodo significa pagare il conto per anni.

### I tre errori che vedo più spesso

1. **Scegliere per hype.** "Ora tutti stanno passando a Shopify" non è un criterio, è una moda. Ogni tecnologia risolve alcuni problemi e ne apre altri.
2. **Scegliere per costo iniziale.** Il TCO su tre anni conta molto più della license fee del primo anno. Migrazioni forzate, personalizzazioni impossibili e vincoli operativi costano più di qualunque licenza.
3. **Delegare la decisione al fornitore.** Il fornitore consiglia la piattaforma che sa fare meglio. È un conflitto di interessi legittimo, ma va compensato con una valutazione indipendente.

### Un metodo pragmatico

Prima di guardare le piattaforme, guarda il tuo progetto:

- Qual è il **volume attuale** e la crescita attesa nei prossimi tre anni?
- Qual è la **complessità del catalogo** — SKU, varianti, tassonomie, personalizzazioni?
- Quali sono i **flussi B2B/B2C** e i touchpoint di vendita?
- Che **stack** integrare — ERP, WMS, CRM, CDP, marketplace?
- Qual è il **team interno** e la sua autonomia tecnica?

Solo quando hai queste risposte, la valutazione delle piattaforme diventa concreta. Prima è solo un catalogo di feature.

### Cosa faccio io quando arriva questa domanda

Un audit indipendente parte sempre da qui: numeri, processi, persone, roadmap. Poi confrontiamo lo scenario "come sei" con lo scenario "come vuoi essere tra tre anni" e valutiamo le opzioni tecnologiche con criteri misurabili — non con sensazioni.

> La piattaforma giusta è quella che ti permette di eseguire la tua strategia. Punto.

Se stai valutando una migrazione o una nuova build, il primo passo è capire davvero il contesto. Da lì la scelta si fa quasi da sola.`;

  const [created] = await db
    .insert(schema.articles)
    .values({
      title: "Come scegliere la piattaforma e-commerce giusta",
      slug: SAMPLE_SLUG,
      excerpt:
        "Un metodo pragmatico per decidere su Shopify, Magento, WordPress o custom, senza farsi guidare dalla moda del momento o dal fornitore di turno.",
      content,
      coverMediaId: anyMedia?.id ?? null,
      authorId: author.id,
      status: "published",
      publishedAt: new Date(),
      seoTitle: "Come scegliere la piattaforma e-commerce giusta — Dario Tana",
      seoDescription:
        "Un metodo pragmatico per decidere su Shopify, Magento, WordPress o custom senza farsi guidare dalla moda.",
    })
    .returning();
  console.log(`Created article '${created.title}' (id ${created.id}).`);

  await db.insert(schema.articleCategories).values({
    articleId: created.id,
    categoryId: category.id,
  });
  console.log(`Linked article to category '${categoryName}'.`);

  console.log("\nDone. Visit /blog and the homepage 'Gli ultimi articoli' section.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
