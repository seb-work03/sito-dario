import { signIn } from "@/auth";

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

        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="tu@esempio.it"
            className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 placeholder:text-paper-500 focus:border-celeste-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-celeste-500 px-3 py-2 font-medium text-ink-950 hover:bg-celeste-400"
          >
            Invia link di accesso
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            Accesso non consentito per questo indirizzo email.
          </p>
        )}
      </div>
    </div>
  );
}
