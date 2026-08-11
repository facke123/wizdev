"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ChevronUp, ChevronDown, Bot, Send } from "lucide-react";

export function AIBriefing() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [generatedAt, setGeneratedAt] = useState("");

  useEffect(() => {
    setGeneratedAt(
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setGeneratedAt(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="card p-5 sm:p-6 lg:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center shadow-md shadow-[var(--color-accent)]/20 shrink-0">
            <Bot className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] tracking-tight truncate">
                Daily Executive Briefing
              </h2>
              <span className="badge badge--accent">Auto Generated</span>
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">
              Updated at{" "}
              <span className="font-mono text-[var(--text-secondary)]">
                {generatedAt}
              </span>{" "}
              &middot; Model:{" "}
              <span className="text-[var(--color-accent-hover)] font-semibold">
                GPT-4o
              </span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn btn--primary text-xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              strokeWidth={2}
            />
            {isRefreshing ? "Generating..." : "Refresh"}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn--ghost px-2.5 text-xs"
          >
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" strokeWidth={2} />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
            )}
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="space-y-5">
          {/* Main Panel */}
          <div className="bg-[var(--surface-base)]/60 rounded-2xl p-4 sm:p-5 border border-white/[0.05] space-y-5">
            {/* Critical Focus */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-md bg-[rgba(255,71,87,0.12)] flex items-center justify-center">
                  <span className="text-[11px]">!</span>
                </div>
                <h3 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                  Critical Focus Areas
                </h3>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3 text-xs sm:text-[13px] text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-[var(--text-primary)] font-semibold">
                      3 PRs awaiting your review
                    </strong>{" "}
                    &mdash; oldest from @alice in queue for 2 days.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-[13px] text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-danger)] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-[var(--text-primary)] font-semibold">
                      CI Build Timeout
                    </strong>{" "}
                    on{" "}
                    <code className="px-1.5 py-0.5 rounded text-[11px] bg-white/[0.06] text-[var(--color-info)] font-mono border border-white/[0.08]">
                      main
                    </code>{" "}
                    branch of{" "}
                    <code className="px-1.5 py-0.5 rounded text-[11px] bg-white/[0.06] text-[var(--color-info)] font-mono border border-white/[0.08]">
                      wizdev-api
                    </code>{" "}
                    &mdash; auth test suite timeout.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-[13px] text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-[var(--text-primary)] font-semibold">
                      Release v2.3.1
                    </strong>{" "}
                    tagged and ready for staging deployment.
                  </span>
                </li>
              </ul>
            </div>

            {/* Overnight Activity */}
            <div className="pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-md bg-[rgba(0,212,255,0.12)] flex items-center justify-center">
                  <span className="text-[11px]">&rarr;</span>
                </div>
                <h3 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                  Overnight Activity
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[11px] text-[var(--text-tertiary)]">
                    Commits Pushed
                  </p>
                  <p className="text-lg font-bold text-[var(--text-primary)] mt-1 font-mono">
                    7
                  </p>
                  <p className="text-[10px] text-[var(--color-accent-hover)] mt-0.5">
                    Across 3 repositories
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[11px] text-[var(--text-tertiary)]">
                    PRs Merged
                  </p>
                  <p className="text-lg font-bold text-[var(--color-success)] mt-1 font-mono">
                    2
                  </p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                    #142 Analytics, #156 Fix
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[11px] text-[var(--text-tertiary)]">
                    New Issues
                  </p>
                  <p className="text-lg font-bold text-[var(--color-warning)] mt-1 font-mono">
                    1
                  </p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                    #203 Perf regression
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Prompt Bar */}
      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ask AI Copilot... e.g. 'Summarize PR #142 changes'"
            className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-base)] border border-white/[0.08] text-xs sm:text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--color-accent-border)] focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all"
          />
        </div>
        <button className="btn btn--primary text-xs sm:text-[13px]">
          <Send className="w-3.5 h-3.5" strokeWidth={2} />
          Ask AI
        </button>
      </div>
    </div>
  );
}
