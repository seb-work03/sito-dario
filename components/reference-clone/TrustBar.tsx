import Image from "next/image";

type Logo = { url: string; alt: string };

export function TrustBar({ logos = [] }: { logos?: Logo[] }) {
  // Duplicate for seamless marquee loop
  const doubled = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section className="bg-[#0D1218] px-5 py-14">
      <div className="mx-auto max-w-[1240px] flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <p className="text-[#94A9BE] text-[15px] shrink-0 max-w-[240px] mx-auto md:mx-0 text-center md:text-left leading-snug uppercase tracking-[0.15em]">
          Collaboro con
        </p>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0D1218] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0D1218] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center gap-14 md:gap-20 w-max animate-[refmarquee_45s_linear_infinite] hover:[animation-play-state:paused]">
            {doubled.map((logo, i) => (
              <div
                key={i}
                className="shrink-0 relative h-14 md:h-16 w-[140px] md:w-[180px] grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-500"
              >
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  fill
                  unoptimized
                  className="object-contain object-center"
                  sizes="180px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
