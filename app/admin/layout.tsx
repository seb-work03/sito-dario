import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Login page renders without sidebar
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0D1218] text-paper-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] text-paper-50">
      <AdminSidebar />
      <div className="ml-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 border-b border-white/8 bg-[#0a0e14]/80 backdrop-blur-sm flex items-center px-8">
          <div className="h-px flex-1" />
        </header>
        {/* Page content */}
        <main className="mx-auto max-w-4xl px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
