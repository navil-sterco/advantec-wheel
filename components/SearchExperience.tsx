"use client";

import { useEffect, useRef, useState } from "react";
import type { SearchData } from "@/lib/types";
import Loader from "./Loader";
import ResultBlocks from "./ResultBlocks";
import TypewriterText from "./TypewriterText";

type Status = "idle" | "loading" | "streaming" | "done" | "error";

const BLOCK_STAGGER_MS = 550;
const STARTER_CHIPS = [
  "How could I buy?",
  "What wheel size fits Celerio?",
  "Kohinoor px series price list",
  "Find wheel dealers near me",
];

export default function SearchExperience() {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<SearchData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [visibleBlocks, setVisibleBlocks] = useState(0);
  const [answerDone, setAnswerDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  async function runSearch(query: string) {
    clearTimers();
    setStatus("loading");
    setData(null);
    setVisibleBlocks(0);
    setAnswerDone(false);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();

      if (!res.ok || !json.status) {
        setErrorMsg(json.error || "Something went wrong fetching results.");
        setStatus("error");
        return;
      }

      setData(json.data);
      setStatus("streaming");
    } catch (err) {
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
    setInputValue(query);
    runSearch(query.trim());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitQuery(inputValue);
  }

  const isBusy = status === "loading" || status === "streaming";
  const chips =
    status === "done" && data?.suggested_queries?.length
      ? data.suggested_queries
      : STARTER_CHIPS;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-10 sm:py-14 pb-44">
        <div className="max-w-3xl mx-auto">
          {status === "idle" && (
            <div className="text-center pt-16 sm:pt-24">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.16em] text-red border border-red/30 bg-redsoft rounded-full px-3 py-1.5">
                AI-Powered Wheel Assistant
              </span>
              <h1 className="font-display text-heading mt-4 font-semibold heading-top">
                Ask anything about alloy wheels
              </h1>
              <p className="text-muted text-sm mt-1 max-w-md mx-auto">
                Sizes, bolt patterns, pricing, finishes, or your nearest dealer — get instant
                AI-curated answers from the Advantec Wheels catalogue.
              </p>
            </div>
          )}

          {status === "loading" && (
            <div>
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber/70">
                  Searching
                </p>
                <h1 className="font-display text-2xl sm:text-3xl text-heading mt-1 font-medium">
                  &ldquo;{inputValue}&rdquo;
                </h1>
              </div>
              <Loader />
            </div>
          )}

          {status === "error" && (
            <div className="panel-card rounded-xl px-8 py-8">
              <p className="font-mono text-[12px] uppercase tracking-widest text-amber mb-2">
                Couldn&apos;t finish that search
              </p>
              <p className="text-[14px] text-body">{errorMsg}</p>
            </div>
          )}

          {data && (status === "streaming" || status === "done") && (
            <div>
              <header className="mb-8 animate-inkReveal">
                <h1 className="font-display text-3xl sm:text-4xl gradient-heading font-medium">
                  {data.title}
                </h1>
                <p className="text-amber/80 text-[13px] font-mono uppercase tracking-[0.14em] mt-2">
                  {data.subtitle}
                </p>
                <div className="mt-4 max-w-2xl">
                  <TypewriterText
                    text={data.answer}
                    onDone={handleAnswerDone}
                    className="text-[15px] leading-relaxed text-body"
                  />
                </div>
              </header>

              {answerDone && (
                <ResultBlocks blocks={data.blocks} visibleCount={visibleBlocks} />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 border-t border-rule bg-paper/95 backdrop-blur px-5 sm:px-10 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => submitQuery(chip)}
                disabled={isBusy}
                className="text-[12.5px] text-body border border-rule rounded-full px-3.5 py-1.5 hover:border-amber/60 hover:bg-amber/10 transition-colors disabled:opacity-40"
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about a wheel size, finish, price, or dealer near you…"
              disabled={isBusy}
              className="flex-1 rounded-full bg-panel border border-rule text-heading placeholder:text-muted/70 px-4 py-3 text-[14px] focus:outline-none disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={isBusy || !inputValue.trim()}
              className="shrink-0 rounded-full bg-red text-white font-medium px-6 py-3 text-[14px] hover:bg-reddeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBusy ? "Searching…" : "Search"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
