import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { auth } from "@/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If unauthenticated (e.g. rendering /admin/login), skip the sidebar chrome
  if (!session?.user) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />
      <main className="ml-52 px-8 py-8 max-w-4xl">{children}</main>
    </div>
  );
}
