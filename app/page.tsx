import Image from "next/image";
import SearchExperience from "@/components/SearchExperience";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-5 sm:px-10 py-3.5 border-b border-rule bg-inkdeep">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-red/60">
            <Image src="/logo.png" alt="Advantec Wheels" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-[15px] text-white tracking-tight">
            ADVANTEC <span className="text-red">WHEELS</span>
          </span>
        </div>
        <span className="hidden sm:flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.14em] text-white/70 border border-white/15 rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red glow-dot animate-glowPulse" />
          AI-Powered Wheel Assistant
        </span>
      </header>

      <SearchExperience />
    </main>
  );
}
