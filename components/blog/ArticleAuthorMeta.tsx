import { PERSON_ID, SITE_URL } from "@/lib/seo";

type ArticleAuthorMetaProps = {
  name?: string | null;
  slug?: string | null;
};

/** Complete, non-visual Schema.org author data for compact BlogPosting cards. */
export function ArticleAuthorMeta({ name, slug }: ArticleAuthorMetaProps) {
  const authorName = name?.trim() || "Dario Tana";
  const authorUrl = slug
    ? `${SITE_URL}/blog/autore/${slug}`
    : `${SITE_URL}/chi-sono`;

  return (
    <span
      className="sr-only"
      itemProp="author"
      itemScope
      itemID={authorName === "Dario Tana" ? PERSON_ID : `${authorUrl}#author`}
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content={authorName} />
      <link itemProp="url" href={authorUrl} />
    </span>
  );
}
