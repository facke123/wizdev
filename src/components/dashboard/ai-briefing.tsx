"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ChevronUp, ChevronDown, Sparkles, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useOvernightSummary } from "@/hooks/use-github";
import { DemoBanner } from "@/components/ui/skeleton";

const mockBriefing = {
  defaultGeneratedAt: "09:00 AM",
  model: "GPT-4o-mini",
};

export function AIBriefing() {
  const { t } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [generatedAt, setGeneratedAt] = useState(mockBriefing.defaultGeneratedAt);
  const [inputValue, setInputValue] = useState("");
  const { data: overnight, refresh: refreshOvernight } = useOvernightSummary();

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshOvernight();
    setTimeout(() => {
      setGeneratedAt(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div
      className="card p-0 overflow-hidden w-full max-w-full"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-white/[0.06] min-w-0">
        {/* Left: icon + title */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(124,109,250,0.25) 0%, rgba(34,211,238,0.15) 100%)",
              border: "1px solid rgba(124,109,250,0.30)",
            }}
          >
            🤖
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h2 className="text-[14px] font-bold text-white tracking-tight truncate">
                {t("briefing.title")}
              </h2>
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0"
                style={{
                  background: "rgba(124,109,250,0.14)",
                  border: "1px solid rgba(124,109,250,0.28)",
                  color: "#c4bcff",
                }}
              >
                <Sparkles className="w-2.5 h-2.5 shrink-0" />
                <span className="whitespace-nowrap">{t("briefing.auto")}</span>
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">
              {t("briefing.generatedAt")}{" "}
              <span className="font-mono text-[var(--text-secondary)]">
                {generatedAt}
              </span>{" "}
              · {t("briefing.model")}:{" "}
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
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all disabled:opacity-50 shrink-0 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5b4fdf 100%)",
              boxShadow: "0 2px 8px rgba(124,109,250,0.4)",
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="whitespace-nowrap">{isRefreshing ? t("briefing.generating") : t("briefing.refresh")}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shrink-0 text-[var(--text-secondary)] hover:text-white whitespace-nowrap"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="whitespace-nowrap">{isExpanded ? t("briefing.collapse") : t("briefing.expand")}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
          </button>
        </div>
      </div>

      {/* ── Main Briefing Body ────────────────────────── */}
      {isExpanded && (
        <div className="p-4 sm:p-5 lg:p-6 space-y-5 min-w-0">
          {/* Critical Focus Areas */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-sm">🔥</span>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "#fb7185" }}>
                Critical Focus Areas
              </h3>
            </div>

            <ul className="space-y-2 min-w-0">
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
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[var(--text-secondary)] leading-relaxed min-w-0">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}80` }}
                  />
                  <span className="min-w-0 break-words flex-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Overnight Activity Summary */}
          <div className="pt-4 border-t border-white/[0.05] min-w-0">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-sm">📊</span>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: "#22d3ee" }}>
                {t("briefing.overnightSummary")}
              </h3>
              {overnight?.isDemo && <DemoBanner />}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
              {[
                {
                  labelKey: "briefing.commitsPushed",
                  value: overnight ? String(overnight.commits) : "—",
                  sub: "Last 24h across repos",
                  color: "#7c6dfa",
                },
                {
                  labelKey: "briefing.prsMerged",
                  value: overnight ? String(overnight.prsMerged) : "—",
                  sub: "Merged pull requests",
                  color: "#10d98e",
                },
                {
                  labelKey: "briefing.newIssues",
                  value: overnight ? String(overnight.newIssues) : "—",
                  sub: "New issues opened",
                  color: "#fbbf24",
                },
              ].map((card) => (
                <div
                  key={card.labelKey}
                  className="p-3 rounded-xl transition-all duration-150 min-w-0"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-[11px] text-[var(--text-tertiary)] font-medium mb-1 truncate">{t(card.labelKey)}</p>
                  <p className="text-xl font-extrabold font-mono leading-none mb-1" style={{ color: card.color }}>
                    {card.value}
                  </p>
                  <p className="text-[10px] text-[var(--text-disabled)] truncate">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated AI Query Row */}
          <div className="pt-1 min-w-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue.trim()) {
                  window.location.href = `/chat?q=${encodeURIComponent(inputValue.trim())}`;
                }
              }}
              className="p-2 pl-3 rounded-xl flex items-center gap-2 sm:gap-3 transition-all min-w-0"
              style={{
                background: "rgba(7, 11, 20, 0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("briefing.askPlaceholder")}
                className="flex-1 min-w-0 bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shrink-0 whitespace-nowrap transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
                  boxShadow: "0 2px 8px rgba(124,109,250,0.35)",
                }}
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap font-bold">{t("briefing.askBtn")}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
