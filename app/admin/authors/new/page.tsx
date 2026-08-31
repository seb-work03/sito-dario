import { createAuthor } from "@/app/admin/actions/authors";
import { AuthorForm } from "@/components/admin/AuthorForm";
import { requireAdminPage } from "@/lib/admin";

export default async function NewAuthorPage() {
  await requireAdminPage();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Nuovo autore</h1>
      <AuthorForm action={createAuthor} />
    </div>
  );
}
