import Image from "next/image";

const FALLBACK_PORTRAIT_URL =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/media/Dario%20tana-VPnb7FSkCeuXKwy4rdEsImphyzlhbs.png";

export function Hero({ portraitUrl }: { portraitUrl?: string | null } = {}) {
  const portrait = portraitUrl ?? FALLBACK_PORTRAIT_URL;

  return (
    <section className="relative bg-[#0D1218] pt-[92px] md:pt-[108px] overflow-x-clip">
      <div className="mx-auto max-w-[1240px] px-5 relative">
        <h1 className="hero-title-enter relative z-0 text-center font-bold text-[#EDF2F7] whitespace-nowrap select-none overflow-hidden mb-6 md:mb-8">
          <span
            className="inline-block"
            style={{
              fontSize: "clamp(3rem, min(14.5vw, 20vh), 14rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.07em",
            }}
          >
            Dario Tana
          </span>
        </h1>
      </div>

      <div className="relative mx-2 md:mx-4">
        <div className="hero-card-enter relative z-10 rounded-2xl md:rounded-3xl overflow-hidden h-[350px] max-h-[350px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(256deg, rgba(0, 229, 255, 0.92) 0%, rgba(0, 138, 153, 0.88) 35%, rgba(13, 18, 24, 0.96) 100%)",
            }}
          />
          <div
            aria-hidden
            className="hero-ambient-glow absolute -top-1/2 -right-1/4 w-[60%] h-[200%] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(0,229,255,0.35), transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-[1240px] grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4 h-full px-5 sm:px-6 md:px-10">
            <div className="hero-copy-enter flex flex-col gap-2 md:gap-3 w-[120px] md:w-auto">
              <h2 className="text-white font-bold text-[18px] sm:text-[22px] md:text-[36px] leading-[1.15] tracking-tight">
                Consulente<br />
                <span className="whitespace-nowrap">e&#8209;commerce</span>
              </h2>
              <p
                className="text-white/80 text-[12px] sm:text-[14px] md:text-[16px] leading-[1.45] max-w-[180px] sm:max-w-[260px] md:max-w-[360px]"
                style={{ textWrap: "pretty" }}
              >
                Consulenza e-commerce a Rimini per PMI, imprenditori ed e-commerce manager.<br /><br />
                Docenza e interventi a eventi di settore.
              </p>
            </div>

            <div className="w-[270px] md:w-[clamp(230px,22vw,350px)] shrink-0" aria-hidden="true" />

            <p className="hero-copy-enter hero-copy-enter-late hidden md:block text-[#EDF2F7] text-[15px] md:text-[20px] leading-[1.3] max-w-[320px] justify-self-end text-right font-medium">
              Non costruisco siti.<br />
              <br />
              Guido la crescita di <span className="whitespace-nowrap">e&#8209;commerce</span> che fanno la differenza.
            </p>
          </div>
        </div>

        <div className="hero-portrait-enter absolute z-20 left-[65%] -translate-x-1/2 md:left-1/2 bottom-0 w-[270px] md:w-[clamp(230px,22vw,350px)] aspect-[650/1080] pointer-events-none">
          <Image
            src={portrait}
            alt="Ritratto di Dario Tana"
            fill
            priority
            unoptimized
            className="object-cover object-top"
            sizes="(max-width: 768px) 300px, 520px"
          />
        </div>
      </div>
    </section>
  );
}
