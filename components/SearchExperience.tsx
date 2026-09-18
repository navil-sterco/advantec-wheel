"use client";

import { useEffect, useRef, useState } from "react";
import type { SearchData } from "@/lib/types";
import Loader from "./Loader";
import ResultBlocks from "./ResultBlocks";
import TypewriterText from "./TypewriterText";

type Status = "idle" | "loading" | "streaming" | "done" | "error";

const BLOCK_STAGGER_MS = 420;
const STARTER_CHIPS = [
  "Find a wheel for my car",
  "What size fits Celerio?",
  "Show Kohinoor PX pricing",
  "Find dealers near me",
];

const DISCOVER = [
  ["FITMENT", "Find wheels for your car"],
  ["SIZES", "Explore sizes & bolt patterns"],
  ["PRICING", "Check catalogue pricing"],
  ["DEALERS", "Locate a trusted dealer"],
];

export default function SearchExperience() {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<SearchData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [visibleBlocks, setVisibleBlocks] = useState(0);
  const [answerDone, setAnswerDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  async function runSearch(query: string) {
    clearTimers();
    setStatus("loading"); setData(null); setVisibleBlocks(0); setAnswerDone(false); setErrorMsg("");
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (!res.ok || !json.status) {
        setErrorMsg(json.error || "Something went wrong fetching results.");
        setStatus("error"); return;
      }
      setData(json.data); setStatus("streaming");
    } catch {
      setErrorMsg("Could not reach the search service. Please try again.");
      setStatus("error");
    }
  }

  function handleAnswerDone() {
    setAnswerDone(true);
    if (!data) return;
    data.blocks.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleBlocks((v) => Math.max(v, i + 1));
        if (i === data.blocks.length - 1) setStatus("done");
      }, i * BLOCK_STAGGER_MS);
      timers.current.push(t);
    });
  }

  function submitQuery(query: string) {
    if (!query.trim() || status === "loading" || status === "streaming") return;
    setInputValue(query); runSearch(query.trim());
  }
  function handleSubmit(e: React.FormEvent) { e.preventDefault(); submitQuery(inputValue); }

  const isBusy = status === "loading" || status === "streaming";
  const chips = status === "done" && data?.suggested_queries?.length ? data.suggested_queries : STARTER_CHIPS;

  return (
    <section className="relative z-10 px-5 sm:px-10 lg:px-14 pb-14">
      <div className="mx-auto max-w-7xl">
        {status === "idle" && (
          <div className="mb-8">
            <div className="search-shell max-w-4xl">
              <form onSubmit={handleSubmit} className="flex items-center gap-3 p-2.5">
                <div className="pl-4 text-white/35 text-[32px] font-[300]" aria-hidden="true">⌕</div>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about wheels, fitment, price or dealers…"
                  disabled={isBusy}
                  className="min-w-0 flex-1 bg-transparent px-1 py-4 text-[15px] sm:text-base text-white placeholder:text-white/30 focus:outline-none"
                />
                <button type="submit" disabled={!inputValue.trim()} className="search-button">
                  <span className="hidden sm:inline">Search catalogue</span><span className="sm:hidden">Search</span>
                  <span>↗</span>
                </button>
              </form>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button key={chip} onClick={() => submitQuery(chip)} disabled={isBusy} className="prompt-chip">{chip}</button>
              ))}
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="max-w-4xl">
            <div className="mb-5">
              <p className="eyebrow">Searching catalogue</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-white">“{inputValue}”</h2>
            </div>
            <Loader />
          </div>
        )}

        {status === "error" && (
          <div className="result-card max-w-4xl p-7">
            <p className="eyebrow text-red">Search interrupted</p>
            <p className="mt-2 text-sm text-white/60">{errorMsg}</p>
            <button onClick={() => runSearch(inputValue)} className="mt-5 rounded-full bg-red px-5 py-2.5 text-sm font-medium text-white">Try again</button>
          </div>
        )}

        {status === "idle" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
            {DISCOVER.map(([label, text], i) => (
              <button key={label} onClick={() => submitQuery(text)} className="discover-card text-left group">
                <span className="text-[16px]  tracking-[0.2em] text-red">{String(i + 1).padStart(2, "0")} / {label}</span>
                <span className="mt-5 block text-sm text-white/75 group-hover:text-white">{text}</span>
                <span className="mt-4 block text-white/20 group-hover:text-red transition-colors">↗</span>
              </button>
            ))}
          </div>
        )}

        {data && (status === "streaming" || status === "done") && (
          <div className="max-w-5xl">
            <div className="result-hero animate-inkReveal">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="eyebrow">Catalogue intelligence</p>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-white">{data.title}</h2>
                  <p className="mt-3 text-xs font-mono uppercase tracking-[0.16em] text-red">{data.subtitle}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.16em] text-white/40">AI curated</span>
              </div>
              <div className="mt-6 max-w-3xl">
                <TypewriterText text={data.answer} onDone={handleAnswerDone} className="text-[15px] sm:text-base leading-7 text-white/65" />
              </div>
            </div>
            {answerDone && <div className="mt-8"><ResultBlocks blocks={data.blocks} visibleCount={visibleBlocks} /></div>}
            <div className="mt-10 max-w-4xl">
              <div className="search-shell">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
                  <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask a follow-up…" disabled={isBusy} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none" />
                  <button type="submit" disabled={isBusy || !inputValue.trim()} className="search-button">Ask <span>↗</span></button>
                </form>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {chips.map((chip) => <button key={chip} onClick={() => submitQuery(chip)} disabled={isBusy} className="prompt-chip">{chip}</button>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
