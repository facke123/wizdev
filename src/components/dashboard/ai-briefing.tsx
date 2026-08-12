"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ChevronUp, ChevronDown, Sparkles, Send } from "lucide-react";

const mockBriefing = {
  defaultGeneratedAt: "09:00 AM",
  model: "GPT-4o-mini",
};

export function AIBriefing() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [generatedAt, setGeneratedAt] = useState(mockBriefing.defaultGeneratedAt);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setGeneratedAt(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.010) 100%), #111827",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.05]">
        {/* Top row: icon + title + actions */}
        <div className="flex items-start justify-between gap-3">
          {/* Left: icon + title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,109,250,0.25) 0%, rgba(34,211,238,0.15) 100%)",
                border: "1px solid rgba(124,109,250,0.30)",
                boxShadow: "0 4px 16px rgba(124,109,250,0.20)",
              }}
            >
              🤖
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[14px] font-bold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                  AI Executive Daily Briefing
                </h2>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0"
                  style={{
                    background: "rgba(124,109,250,0.14)",
                    border: "1px solid rgba(124,109,250,0.28)",
                    color: "#c4bcff",
                  }}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  Auto Synthesized
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                Generated at{" "}
                <span className="font-mono text-[var(--text-secondary)]">
                  {generatedAt}
                </span>{" "}
                · Model:{" "}
                <span style={{ color: "var(--brand-violet)" }} className="font-semibold">
                  {mockBriefing.model}
                </span>
              </p>
            </div>
          </div>

          {/* Right: action buttons — always visible */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all disabled:opacity-50 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #7c6dfa 0%, #5b4fdf 100%)",
                boxShadow: "0 2px 8px rgba(124,109,250,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <RefreshCw
                className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">{isRefreshing ? "Generating..." : "Refresh"}</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--text-secondary)",
              }}
            >
              {isExpanded ? (
                <><span className="hidden sm:inline">Collapse</span><ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <><span className="hidden sm:inline">Expand</span><ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────── */}
      {isExpanded && (
        <div className="px-6 py-5">
          <div
            className="rounded-xl p-5 space-y-6"
            style={{
              background: "rgba(7, 11, 20, 0.55)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Critical Focus Areas */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: "rgba(251,113,133,0.12)" }}
                >
                  <span className="text-sm">🔥</span>
                </div>
                <h3
                  className="text-[11px] font-extrabold uppercase tracking-[0.12em]"
                  style={{ color: "#fb7185" }}
                >
                  Critical Focus Areas
                </h3>
              </div>

              <ul className="space-y-3">
                {[
                  {
                    color: "#7c6dfa",
                    text: (
                      <>
                        <strong className="text-white font-bold">
                          3 PRs awaiting your review
                        </strong>{" "}
                        — oldest from @alice in review queue for 2 days.
                      </>
                    ),
                  },
                  {
                    color: "#fb7185",
                    text: (
                      <>
                        <strong className="text-white font-bold">
                          CI Build Timeout Failure
                        </strong>{" "}
                        on{" "}
                        <code className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[#22d3ee] text-[11px] font-mono border border-white/[0.08]">
                          main
                        </code>{" "}
                        branch of{" "}
                        <code className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[#22d3ee] text-[11px] font-mono border border-white/[0.08]">
                          wizdev-api
                        </code>{" "}
                        — auth test suite timeout.
                      </>
                    ),
                  },
                  {
                    color: "#fbbf24",
                    text: (
                      <>
                        <strong className="text-white font-bold">
                          Release Candidate v2.3.1
                        </strong>{" "}
                        is tagged and ready for staging deployment.
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-[var(--text-secondary)]">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 6px ${item.color}80`,
                      }}
                    />
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Overnight Activity */}
            <div className="pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: "rgba(34,211,238,0.10)" }}
                >
                  <span className="text-sm">📊</span>
                </div>
                <h3
                  className="text-[11px] font-extrabold uppercase tracking-[0.12em]"
                  style={{ color: "#22d3ee" }}
                >
                  Overnight Activity Summary
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Commits Pushed", value: "7", sub: "Across 3 repos", color: "#7c6dfa" },
                  { label: "PRs Merged", value: "2", sub: "#142 Analytics, #156 Fix", color: "#10d98e" },
                  { label: "New Issues", value: "1", sub: "#203 Perf regression", color: "#fbbf24" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="p-4 rounded-xl transition-all duration-150 cursor-default group"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${card.color}35`;
                      (e.currentTarget as HTMLElement).style.background = `${card.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                    }}
                  >
                    <p className="text-[11px] text-[var(--text-tertiary)] font-medium mb-1.5">{card.label}</p>
                    <p
                      className="text-2xl font-black font-mono leading-none mb-1"
                      style={{ color: card.color }}
                    >
                      {card.value}
                    </p>
                    <p className="text-[10px] text-[var(--text-disabled)] truncate">{card.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── AI Input Bar ─────────────────────────────── */}
      <div
        className="px-5 sm:px-6 py-4 flex items-center gap-2 sm:gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI Copilot..."
            className="w-full px-4 py-2.5 rounded-xl text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none transition-all"
            style={{
              background: "rgba(7, 11, 20, 0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(124,109,250,0.45)";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,109,250,0.10)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
          />
        </div>
        <button
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-[12px] sm:text-[13px] font-semibold text-white shrink-0 transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #7c6dfa 0%, #5b4fdf 100%)",
            boxShadow: "0 2px 8px rgba(124,109,250,0.4), inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>Ask AI</span>
        </button>
      </div>
    </div>
  );
}
