import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { UsersManager } from "@/components/admin/UsersManager";
import { requireAdminPage } from "@/lib/admin";

export default async function UsersPage() {
  const session = await requireAdminPage();
  const rows = await db
    .select({
      id: adminUsers.id,
      username: adminUsers.username,
      email: adminUsers.email,
      createdAt: adminUsers.createdAt,
    })
    .from(adminUsers)
    .orderBy(desc(adminUsers.createdAt));

  const currentUsername = session?.user?.name ?? "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Utenti admin</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Gestisci gli account che possono accedere al pannello.
        </p>
      </div>

      <UsersManager users={rows} currentUsername={currentUsername} />
    </div>
  );
}
