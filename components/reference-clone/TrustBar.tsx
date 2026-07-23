const entities = [
  "[ENTE DA INSERIRE 1]",
  "[UNIVERSITÀ DA INSERIRE]",
  "[BUSINESS SCHOOL DA INSERIRE]",
  "[MASTER DA INSERIRE]",
  "[EVENTO DA INSERIRE]",
  "[ENTE FORMATIVO DA INSERIRE]",
  "[AZIENDA CLIENTE DA INSERIRE]",
];

export function TrustBar() {
  const doubled = [...entities, ...entities];

  return (
    <section className="bg-[#0D1218] px-5 py-14 border-t border-white/5">
      <div className="mx-auto max-w-[1240px] flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <p className="text-[#94A9BE] text-[15px] shrink-0 max-w-[240px] leading-snug font-mono uppercase tracking-[0.15em]">
          Ho collaborato con
        </p>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0D1218] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0D1218] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center gap-14 w-max animate-[refmarquee_45s_linear_infinite] hover:[animation-play-state:paused]">
            {doubled.map((label, i) => (
              <span
                key={i}
                className="shrink-0 text-[#6A84A0] hover:text-[#77C0CF] transition-colors duration-500 text-lg md:text-xl font-medium tracking-tight whitespace-nowrap"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
