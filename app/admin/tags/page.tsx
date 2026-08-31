import { redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/admin";

export default async function TagsPage() {
  await requireAdminPage();
  redirect("/admin");
}
