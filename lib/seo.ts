export const SITE_URL = "https://dariotana.it";
export const SITE_NAME = "Dario Tana";
export const DEFAULT_DESCRIPTION =
  "Consulenza e formazione e-commerce indipendenti per aziende, imprenditori e professionisti. Oltre vent'anni di esperienza diretta nel commercio elettronico.";

export const DEFAULT_SOCIAL_IMAGE =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/media/Dario%20tana-VPnb7FSkCeuXKwy4rdEsImphyzlhbs.png";

export const PERSON_ID = `${SITE_URL}/#dario-tana`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const META_TITLE_MAX_LENGTH = 60;
export const META_DESCRIPTION_MIN_LENGTH = 140;
export const META_DESCRIPTION_MAX_LENGTH = 160;

const META_DESCRIPTION_SUPPLEMENT =
  "Approfondimenti concreti, casi reali e indicazioni utili per aziende, professionisti e team che lavorano nel commercio elettronico.";

function normalizeMetaText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function truncateAtWord(value: string, maxLength: number, suffix = ""): string {
  if (value.length <= maxLength) return value;
  const available = maxLength - suffix.length;
  const slice = value.slice(0, available + 1);
  const wordBoundary = slice.lastIndexOf(" ");
  const cutAt = wordBoundary >= Math.max(1, available - 20) ? wordBoundary : available;
  return `${slice.slice(0, cutAt).replace(/[\s,;:–—-]+$/g, "")}${suffix}`;
}

/** Keeps dynamic and editorial titles within the search-result limit. */
export function fitMetaTitle(value: string, brand = ""): string {
  const title = normalizeMetaText(value);
  const branded = brand && !title.toLowerCase().includes(brand.toLowerCase())
    ? `${title} | ${brand}`
    : title;

  if (branded.length <= META_TITLE_MAX_LENGTH) return branded;
  if (title.length <= META_TITLE_MAX_LENGTH) return title;
  return truncateAtWord(title, META_TITLE_MAX_LENGTH, "…");
}

/** Produces a readable 140–160 character description for dynamic archives and articles. */
export function fitMetaDescription(value?: string | null): string {
  let description = normalizeMetaText(value ?? "");

  if (description.length < META_DESCRIPTION_MIN_LENGTH) {
    description = normalizeMetaText(
      `${description}${description && !/[.!?]$/.test(description) ? "." : ""} ${META_DESCRIPTION_SUPPLEMENT}`,
    );
  }
  if (description.length < META_DESCRIPTION_MIN_LENGTH) {
    description = normalizeMetaText(`${description} ${DEFAULT_DESCRIPTION}`);
  }
  if (description.length <= META_DESCRIPTION_MAX_LENGTH) return description;

  const shortened = truncateAtWord(description, META_DESCRIPTION_MAX_LENGTH - 1);
  return `${shortened.replace(/[.!?]+$/g, "")}.`;
}

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/dario-tana-959062101/",
  "https://www.facebook.com/dariotanaconsulenteecommerce",
  "https://www.instagram.com/dariotana_consulenteecommerce/",
];

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Dario Tana",
      url: `${SITE_URL}/chi-sono`,
      image: DEFAULT_SOCIAL_IMAGE,
      jobTitle: "Consulente e formatore e-commerce",
      description: DEFAULT_DESCRIPTION,
      email: "info@dariotana.it",
      telephone: "+39 348 783 0571",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via dell'albero 34/c",
        addressLocality: "Rimini",
        addressRegion: "Emilia-Romagna",
        addressCountry: "IT",
      },
      sameAs: SOCIAL_PROFILES,
      knowsAbout: [
        "E-commerce",
        "Strategia e-commerce",
        "Formazione e-commerce",
        "Web analytics",
        "Conversion rate optimization",
        "Digital marketing",
        "Advertising",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "it-IT",
      publisher: { "@id": PERSON_ID },
    },
  ],
};
