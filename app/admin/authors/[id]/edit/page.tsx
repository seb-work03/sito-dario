import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateAuthor } from "@/app/admin/actions/authors";
import { AuthorForm } from "@/components/admin/AuthorForm";
import { db } from "@/lib/db";
import { authors } from "@/lib/db/schema";

export default async function EditAuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const author = await db.query.authors.findFirst({
    where: eq(authors.id, Number(id)),
    with: { avatar: true },
  });

  if (!author) {
    notFound();
  }

  const updateWithId = updateAuthor.bind(null, author.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Modifica autore</h1>
      <AuthorForm
        action={updateWithId}
        author={{
          name: author.name,
          slug: author.slug,
          bio: author.bio,
          avatarMediaId: author.avatarMediaId,
          avatarUrl: author.avatar?.url,
        }}
      />
    </div>
  );
}
