"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

const mockData = [
  { day: "Mon", commits: 12, prs: 3, reviews: 5 },
  { day: "Tue", commits: 19, prs: 5, reviews: 8 },
  { day: "Wed", commits: 8,  prs: 2, reviews: 4 },
  { day: "Thu", commits: 15, prs: 4, reviews: 6 },
  { day: "Fri", commits: 22, prs: 6, reviews: 9 },
  { day: "Sat", commits: 5,  prs: 1, reviews: 2 },
  { day: "Sun", commits: 3,  prs: 0, reviews: 1 },
];

const maxCommits = Math.max(...mockData.map((d) => d.commits));

function getBarHeight(value: number): string {
  return `${Math.max((value / maxCommits) * 100, 4)}%`;
}

export function ActivityChart() {
  const { t } = useLanguage();

  const series = [
    { key: "commits" as const,  labelKey: "chart.commits",  color: "#7c6dfa", glow: "rgba(124,109,250,0.4)" },
    { key: "prs" as const,      labelKey: "chart.prs",      color: "#22d3ee", glow: "rgba(34,211,238,0.4)"  },
    { key: "reviews" as const,  labelKey: "chart.reviews",  color: "#10d98e", glow: "rgba(16,217,142,0.4)"  },
  ];

  const totalCommits = mockData.reduce((s, d) => s + d.commits, 0);
  const totalPRs = mockData.reduce((s, d) => s + d.prs, 0);
  const totalReviews = mockData.reduce((s, d) => s + d.reviews, 0);

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
          <h2 className="text-[15px] font-bold text-white tracking-tight">
            {t("chart.title")}
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {t("chart.sub")}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: s.color, boxShadow: `0 0 6px ${s.glow}` }}
              />
              <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                {t(s.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bar Chart ──────────────────────────────── */}
      <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-1 border-b border-white/[0.05]">
        {mockData.map((item) => (
          <div
            key={item.day}
            className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
          >
            {/* Bars container */}
            <div className="w-full flex items-end justify-center gap-1 h-full max-w-[48px]">
              {series.map((s) => {
                const val = item[s.key];
                const heightPct = getBarHeight(val);

                return (
                  <motion.div
                    key={s.key}
                    initial={{ height: 0 }}
                    animate={{ height: heightPct }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 rounded-t-sm relative group/bar"
                    style={{
                      background: s.color,
                      boxShadow: `0 0 8px ${s.glow}`,
                      minWidth: "4px",
                    }}
                  >
                    {/* Tooltip on hover */}
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded bg-[#0b0f1e] text-[10px] font-mono text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg border border-white/10"
                    >
                      {t(s.labelKey)}: {val}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Day Label */}
            <span className="text-[11px] font-bold text-[var(--text-secondary)] font-mono group-hover:text-white transition-colors">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* ── Summary Footer ─────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {[
          { labelKey: "chart.commits", value: totalCommits, color: "#7c6dfa" },
          { labelKey: "chart.prs", value: totalPRs, color: "#22d3ee" },
          { labelKey: "chart.reviews", value: totalReviews, color: "#10d98e" },
          { labelKey: "chart.velocity", value: "A+", color: "#7c6dfa", isGrade: true },
        ].map((item) => (
          <div
            key={item.labelKey}
            className="p-2.5 sm:p-3 rounded-xl text-center"
            style={{
              background: item.isGrade
                ? "rgba(124,109,250,0.10)"
                : "rgba(255,255,255,0.02)",
              border: item.isGrade
                ? "1px solid rgba(124,109,250,0.22)"
                : "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <p
              className="text-base sm:text-lg font-bold font-mono leading-none mb-1"
              style={{ color: item.color }}
            >
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
