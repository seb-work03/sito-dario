import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Accesso admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Inserisci la tua email per ricevere il link di accesso.
          </p>
        </div>

        <LoginForm />

        {error && (
          <p className="mt-4 text-sm text-red-500">
            Accesso non consentito per questo indirizzo email.
          </p>
        )}
      </div>
    </div>
  );
}
