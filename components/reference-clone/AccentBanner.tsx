/**
 * A high-contrast accent-cyan banner. Placed between Services and Process
 * to break up the dark sections with energy.
 */
export function AccentBanner() {
  return (
    <section className="bg-[#00e5ff] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2
            className="view-reveal-heading text-[#0D1218] font-medium text-[28px] md:text-[48px] leading-[1.05] tracking-tight max-w-2xl"
          >
            L&apos;e-commerce non si improvvisa.
            <br />
            <span className="opacity-60">Si governa con metodo.</span>
          </h2>

          <div
            className="view-reveal flex flex-col gap-4 md:items-end"
          >
            <div className="flex gap-10 md:gap-14">
              {[
                { value: "20+", label: "anni di campo" },
                { value: "€2M+", label: "fatturato guidato" },
                { value: "4.9★", label: "su Google" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[#0D1218] text-3xl md:text-4xl font-semibold tabular-nums tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[#0D1218]/60 text-xs uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
