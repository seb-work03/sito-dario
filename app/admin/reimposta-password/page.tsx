import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";

export const metadata: Metadata = { title: "Reimposta password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token ?? "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Scegli una nuova password</h1>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Deve contenere almeno 8 caratteri. Il link può essere utilizzato una sola volta.
          </p>
        </div>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-red-600">Il link non è valido o è incompleto.</p>
            <Link href="/admin/password-dimenticata" className="text-sm font-medium text-gray-700 hover:text-gray-950">
              Richiedi un nuovo link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
