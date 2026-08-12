"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { useGitHubActivity } from "@/hooks/use-github";
import type { GitHubActivity } from "@/hooks/use-github";
import { Skeleton, DemoBanner } from "@/components/ui/skeleton";

const SKELETON_HEIGHTS = [
  ["45%", "65%", "35%"],
  ["55%", "75%", "40%"],
  ["35%", "50%", "60%"],
  ["70%", "40%", "75%"],
  ["60%", "85%", "50%"],
  ["40%", "60%", "70%"],
  ["80%", "50%", "65%"],
];

export function ActivityChart() {
  const { t } = useLanguage();
  const { data: activityData, loading } = useGitHubActivity();

  const data = activityData ?? [];
  const maxCommits = data.length > 0 ? Math.max(...data.map((d) => d.commits), 1) : 1;

  function getBarHeight(value: number): string {
    return `${Math.max((value / maxCommits) * 100, 4)}%`;
  }

  const series = [
    { key: "commits" as const, labelKey: "chart.commits", color: "#7c6dfa", glow: "rgba(124,109,250,0.4)" },
    { key: "prs" as const,     labelKey: "chart.prs",     color: "#22d3ee", glow: "rgba(34,211,238,0.4)"  },
    { key: "reviews" as const, labelKey: "chart.reviews", color: "#10d98e", glow: "rgba(16,217,142,0.4)"  },
  ];

  const totalCommits = data.reduce((s, d) => s + d.commits, 0);
  const totalPRs     = data.reduce((s, d) => s + d.prs, 0);
  const totalReviews = data.reduce((s, d) => s + d.reviews, 0);

  // Grade based on velocity
  const velocityGrade = totalCommits > 60 ? "A+" : totalCommits > 40 ? "A" : totalCommits > 20 ? "B" : "C";

  const isDemo = !loading && data.length > 0 && data[0].day === "Mon" && data[0].commits === 12;

  return (
    <div
      className="card p-5 sm:p-6 space-y-4"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-[15px] font-bold text-white tracking-tight">{t("chart.title")}</h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{t("chart.sub")}</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color, boxShadow: `0 0 6px ${s.glow}` }} />
              <span className="text-[11px] font-medium text-[var(--text-secondary)]">{t(s.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>

      {isDemo && <DemoBanner />}

      {/* ── Bar Chart ──────────────────────────────── */}
      {loading ? (
        <div className="h-44 flex items-end gap-2 sm:gap-4 px-1">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex-1 flex items-end justify-center gap-1" style={{ height: "100%" }}>
              {[0, 1, 2].map((j) => (
                <Skeleton
                  key={j}
                  className="flex-1 rounded-t-sm"
                  style={{ height: SKELETON_HEIGHTS[i % 7][j % 3], minWidth: "4px" }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-1 border-b border-white/[0.05]">
          {data.map((item: GitHubActivity) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full flex items-end justify-center gap-1 h-full max-w-[48px]">
                {series.map((s) => {
                  const val = item[s.key];
                  return (
                    <motion.div
                      key={s.key}
                      initial={{ height: 0 }}
                      animate={{ height: getBarHeight(val) }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t-sm relative group/bar"
                      style={{ background: s.color, boxShadow: `0 0 8px ${s.glow}`, minWidth: "4px" }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded bg-[#0b0f1e] text-[10px] font-mono text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg border border-white/10">
                        {t(s.labelKey)}: {val}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <span className="text-[11px] font-bold text-[var(--text-secondary)] font-mono group-hover:text-white transition-colors">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Summary Footer ─────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {[
          { labelKey: "chart.commits", value: loading ? "—" : String(totalCommits), color: "#7c6dfa" },
          { labelKey: "chart.prs",     value: loading ? "—" : String(totalPRs),     color: "#22d3ee" },
          { labelKey: "chart.reviews", value: loading ? "—" : String(totalReviews), color: "#10d98e" },
          { labelKey: "chart.velocity", value: loading ? "—" : velocityGrade,       color: "#7c6dfa", isGrade: true },
        ].map((item) => (
          <div
            key={item.labelKey}
            className="p-2.5 sm:p-3 rounded-xl text-center"
            style={{
              background: item.isGrade ? "rgba(124,109,250,0.10)" : "rgba(255,255,255,0.02)",
              border: item.isGrade ? "1px solid rgba(124,109,250,0.22)" : "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <p className="text-base sm:text-lg font-bold font-mono leading-none mb-1" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-[10px] text-[var(--text-tertiary)] font-semibold uppercase tracking-wider truncate">
              {t(item.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
