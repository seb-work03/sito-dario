import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-ink-900 text-paper-50">
      {session && (
        <header className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
          <Link href="/admin" className="font-medium">
            Dario Tana — Admin
          </Link>
          <SignOutButton />
        </header>
      )}
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
