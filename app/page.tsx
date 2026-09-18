import Image from "next/image";
import SearchExperience from "@/components/SearchExperience";

export default function Home() {
  return (
    <main className="min-h-screen bg-inkdeep text-white overflow-hidden">
      <header className="relative z-20 flex items-center justify-between px-5 sm:px-10 lg:px-14 py-5 border-b border-white/10 bg-inkdeep/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-white/20 shadow-lg shadow-red/20">
            <Image src="/logo.png" alt="Advantec Wheels" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-display text-[15px] font-semibold tracking-[0.08em]">ADVANTEC <span className="text-red">WHEELS</span></div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/40 mt-0.5">Performance wheel intelligence</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-white/45">
          <span>Catalogue</span><span>Fitment</span><span>Dealers</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/65">
          <span className="w-1.5 h-1.5 rounded-full bg-red animate-glowPulse" />
          AI Assistant
        </div>
      </header>

      <section className="relative">
        <div className="hero-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute -right-32 -top-28 h-[520px] w-[520px] rounded-full border border-white/[10] wheel-orbit pointer-events-none" />
        <div className="absolute -right-8 top-0 h-[420px] w-[420px] rounded-full border border-red/[10] wheel-orbit pointer-events-none [animation-duration:18s]" />

        <div className="relative z-10 mx-auto max-w-7xl  pt-14 sm:pt-20 pb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-3.5 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-red">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Your intelligent wheel concierge
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] tracking-[-0.045em]">
              Find the right wheel.
              <span className="block text-white">Without the guesswork.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/55">
              Search Advantec&apos;s catalogue using everyday language. Explore fitment, sizes,
              finishes, pricing and trusted dealers in seconds.
            </p>
          </div>
        </div>
      </section>

      <SearchExperience />

      <footer className="relative z-10 px-5 sm:px-10 lg:px-14 py-8 border-t border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/30 flex flex-col sm:flex-row justify-between gap-3">
        <span>ADVANTEC WHEELS · AI CATALOGUE</span>
        <span>Fitment information should be verified before purchase</span>
      </footer>
    </main>
  );
}
