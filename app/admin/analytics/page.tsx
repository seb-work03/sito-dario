export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Dashboard basata su Vercel Web Analytics (piano Hobby).
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white px-5 py-10 text-center">
        <p className="text-sm text-gray-400">
          Dashboard in arrivo nel prossimo commit — Panoramica con KPI, grafico e top 5 pagine/referrer/paesi/dispositivi/browser.
        </p>
      </div>
    </div>
  );
}
