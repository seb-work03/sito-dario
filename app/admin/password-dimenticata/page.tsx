import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";

export const metadata: Metadata = { title: "Password dimenticata" };

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Password dimenticata</h1>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Riceverai un collegamento monouso all’email associata all’account.
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
