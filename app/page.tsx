import Image from "next/image";
import SearchExperience from "@/components/SearchExperience";

export default function Home() {
  return (
    <main className="min-h-screen bg-inkdeep text-white overflow-hidden">
      <header className="relative z-20 flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5 lg:px-14 border-b border-white/10 bg-inkdeep/90 backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="h-9 w-9 rounded-full overflow-hidden shrink-0 ring-1 ring-white/20 shadow-lg shadow-red/20 sm:h-10 sm:w-10">
            <Image src="/logo.png" alt="Advantec Wheels" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-[12px] font-semibold tracking-[0.07em] sm:text-[15px] sm:tracking-[0.08em]">ADVANTEC <span className="text-red">WHEELS</span></div>
            <div className="mt-0.5 hidden text-[9px] uppercase tracking-[0.24em] text-white/40 sm:block">Performance wheel intelligence</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-white/45">
          <span>Catalogue</span><span>Fitment</span><span>Dealers</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.1em] text-white/65 sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-[0.14em]">
          <span className="w-1.5 h-1.5 rounded-full bg-red animate-glowPulse" />
          AI Assistant
        </div>
      </header>

      <section className="relative">
        <div className="hero-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute -right-[290px] -top-20 h-[420px] w-[420px] rounded-full border border-white/[10] wheel-orbit pointer-events-none sm:-right-32 sm:-top-28 sm:h-[520px] sm:w-[520px]" />
        <div className="absolute -right-[210px] top-10 h-[340px] w-[340px] rounded-full border border-red/[10] wheel-orbit pointer-events-none [animation-duration:18s] sm:-right-8 sm:top-0 sm:h-[420px] sm:w-[420px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-8 sm:pt-20 lg:px-14">
          <div className="max-w-3xl">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-red/30 bg-red/10 px-3 py-2 text-[9px] font-mono uppercase tracking-[0.12em] text-red sm:px-3.5 sm:text-[10px] sm:tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              <span className="truncate">Your intelligent wheel concierge</span>
            </div>
            <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,12vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] sm:mt-6 sm:max-w-3xl sm:text-6xl lg:text-7xl">
              Find the right wheel.
              <span className="block text-white">Without the guesswork.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:mt-6 sm:text-lg">
              Search Advantec&apos;s catalogue using everyday language. Explore fitment, sizes,
              finishes, pricing and trusted dealers in seconds.
            </p>
          </div>
        </div>
      </section>

      <SearchExperience />

      <footer className="relative z-10 flex flex-col gap-3 border-t border-white/10 px-4 py-7 text-[9px] uppercase tracking-[0.14em] text-white/30 sm:flex-row sm:justify-between sm:px-8 sm:py-8 sm:text-[10px] sm:tracking-[0.18em] lg:px-14">
        <span>ADVANTEC WHEELS · AI CATALOGUE</span>
        <span>Fitment information should be verified before purchase</span>
      </footer>
    </main>
  );
}
