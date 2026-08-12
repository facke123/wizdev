"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ChevronUp, ChevronDown, Sparkles, Send, Bot } from "lucide-react";

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
      className="card p-0 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(17,24,39,0.98) 100%)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="px-5 sm:px-6 py-4 flex items-center justify-between gap-3 border-b border-white/[0.05]">
        {/* Left: icon + title */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(124,109,250,0.25) 0%, rgba(34,211,238,0.15) 100%)",
              border: "1px solid rgba(124,109,250,0.30)",
            }}
          >
            🤖
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[14px] font-bold text-[var(--text-primary)] tracking-tight">
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

        {/* Right: action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all disabled:opacity-50 shrink-0"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5b4fdf 100%)",
              boxShadow: "0 2px 8px rgba(124,109,250,0.4)",
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Generating..." : "Refresh"}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shrink-0 text-[var(--text-secondary)]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span>{isExpanded ? "Collapse" : "Expand"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── Main Briefing Body ────────────────────────── */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Critical Focus Areas */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🔥</span>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "#fb7185" }}>
                Critical Focus Areas
              </h3>
            </div>

            <ul className="space-y-2.5">
              {[
                {
                  color: "#7c6dfa",
                  text: (
                    <>
                      <strong className="text-white font-bold">3 PRs awaiting your review</strong> — oldest from @alice in review queue for 2 days.
                    </>
                  ),
                },
                {
                  color: "#fb7185",
                  text: (
                    <>
                      <strong className="text-white font-bold">CI Build Timeout Failure</strong> on{" "}
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
                      <strong className="text-white font-bold">Release Candidate v2.3.1</strong> is tagged and ready for staging deployment.
                    </>
                  ),
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}80` }}
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Overnight Activity */}
          <div className="pt-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">📊</span>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "#22d3ee" }}>
                Overnight Activity Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Commits Pushed", value: "7", sub: "Across 3 repos", color: "#7c6dfa" },
                { label: "PRs Merged", value: "2", sub: "#142 Analytics, #156 Fix", color: "#10d98e" },
                { label: "New Issues", value: "1", sub: "#203 Perf regression", color: "#fbbf24" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="p-3.5 rounded-xl transition-all duration-150 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="text-[11px] text-[var(--text-tertiary)] font-medium mb-1">{card.label}</p>
                  <p className="text-xl font-extrabold font-mono leading-none mb-1" style={{ color: card.color }}>
                    {card.value}
                  </p>
                  <p className="text-[10px] text-[var(--text-disabled)] truncate">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated AI Query Row */}
          <div className="pt-2">
            <div
              className="p-1.5 pl-3 rounded-xl flex items-center gap-2 transition-all"
              style={{
                background: "rgba(124,109,250,0.05)",
                border: "1px solid rgba(124,109,250,0.20)",
              }}
            >
              <Bot className="w-4 h-4 shrink-0" style={{ color: "var(--brand-violet)" }} />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI Copilot about this briefing..."
                className="flex-1 bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              />
              <button
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white shrink-0 transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
                  boxShadow: "0 2px 8px rgba(124,109,250,0.35)",
                }}
              >
                <Send className="w-3 h-3 shrink-0" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
