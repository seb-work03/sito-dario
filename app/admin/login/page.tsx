import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-sm rounded-lg border border-ink-600 bg-ink-850 p-8">
        <h1 className="mb-1 text-xl font-medium text-paper-50">Accesso admin</h1>
        <p className="mb-6 text-sm text-paper-400">
          Inserisci la tua email: ti invieremo un link per accedere.
        </p>

        <LoginForm />

        {error && (
          <p className="mt-4 text-sm text-red-400">
            Accesso non consentito per questo indirizzo email.
          </p>
        )}
      </div>
    </div>
  );
}
