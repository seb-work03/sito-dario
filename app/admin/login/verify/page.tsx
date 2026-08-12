export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center mx-auto mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">Controlla la tua email</h1>
        <p className="mt-2 text-sm text-gray-500">
          Ti abbiamo inviato un link per accedere al pannello admin. Controlla anche la cartella spam.
        </p>
      </div>
    </div>
  );
}
