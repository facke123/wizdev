"use client";

import { useEffect, useState } from "react";

const mockBriefing = {
  defaultGeneratedAt: "09:00 AM",
  model: "GPT-4o-mini",
};

export function AIBriefing() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [generatedAt, setGeneratedAt] = useState(mockBriefing.defaultGeneratedAt);

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
    <div className="stripe-card p-6 sm:p-8 lg:p-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/25 shrink-0">
            <div className="w-full h-full bg-[#0f1322] rounded-[15px] flex items-center justify-center text-2xl">
              🤖
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                AI Executive Daily Briefing
              </h2>
              <span className="stripe-badge stripe-badge-primary shrink-0 whitespace-nowrap">
                Auto Synthesized
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate">
              Generated at <span className="font-mono text-slate-300">{generatedAt}</span> · Model:{" "}
              <span className="text-indigo-400 font-semibold">{mockBriefing.model}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="stripe-btn-primary px-4 py-2.5 text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <span className={isRefreshing ? "animate-spin" : ""}>⟳</span>
            <span>{isRefreshing ? "Generating..." : "Refresh Brief"}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>{isExpanded ? "Collapse" : "Expand"}</span>
            <span className="text-[10px] text-slate-400">{isExpanded ? "▲" : "▼"}</span>
          </button>
        </div>
      </div>

      {/* Briefing Content */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Main Brief Panel */}
          <div className="bg-[#0b0e17]/80 rounded-2xl p-6 sm:p-8 border border-white/10 space-y-7">
            {/* High Priority Section */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-lg">🔥</span>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Critical Focus Areas
                </h3>
              </div>
              <ul className="space-y-3.5 pl-1">
                <li className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-white font-semibold">3 PRs awaiting your review</strong> — oldest from @alice in review queue for 2 days.
                  </span>
                </li>
                <li className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-white font-semibold">CI Build Timeout Failure</strong> on{" "}
                    <code className="px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 text-xs font-mono border border-white/10">
                      main
                    </code>{" "}
                    branch of{" "}
                    <code className="px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 text-xs font-mono border border-white/10">
                      wizdev-api
                    </code>{" "}
                    — auth test suite timeout.
                  </span>
                </li>
                <li className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-white font-semibold">Release Candidate v2.3.1</strong> is tagged and ready for staging deployment.
                  </span>
                </li>
              </ul>
            </div>

            {/* Overnight Activity */}
            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-lg">📊</span>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Overnight Activity Summary
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">Commits Pushed</p>
                  <p className="text-lg sm:text-xl font-bold text-white">7 commits</p>
                  <p className="text-[11px] text-indigo-400">Across 3 repositories</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">PRs Merged</p>
                  <p className="text-lg sm:text-xl font-bold text-emerald-400">2 PRs</p>
                  <p className="text-[11px] text-slate-400">#142 Analytics, #156 Fix</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">New Issues</p>
                  <p className="text-lg sm:text-xl font-bold text-amber-400">1 issue</p>
                  <p className="text-[11px] text-slate-400">#203 Perf regression</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Prompt Input Bar */}
      <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ask AI Copilot... e.g. 'Summarize PR #142 changes' or 'Draft standup note'"
            className="w-full px-5 py-3 rounded-xl bg-[#0b0e17] border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <button className="stripe-btn-primary px-6 py-3 text-xs sm:text-sm font-semibold shrink-0 whitespace-nowrap text-center">
          Ask AI
        </button>
      </div>
    </div>
  );
}
