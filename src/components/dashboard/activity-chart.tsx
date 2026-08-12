"use client";

import { motion } from "framer-motion";

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

const series = [
  { key: "commits" as const,  label: "Commits",  color: "#7c6dfa", glow: "rgba(124,109,250,0.4)" },
  { key: "prs" as const,      label: "PRs",       color: "#22d3ee", glow: "rgba(34,211,238,0.4)"  },
  { key: "reviews" as const,  label: "Reviews",   color: "#10d98e", glow: "rgba(16,217,142,0.4)"  },
];

export function ActivityChart() {
  const totalCommits = mockData.reduce((s, d) => s + d.commits, 0);
  const totalPRs = mockData.reduce((s, d) => s + d.prs, 0);
  const totalReviews = mockData.reduce((s, d) => s + d.reviews, 0);

  return (
    <div className="card p-5 sm:p-6">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="p-2 rounded-xl"
            style={{
              background: "rgba(124,109,250,0.12)",
              border: "1px solid rgba(124,109,250,0.22)",
            }}
          >
            <svg
              width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="#9d91fc" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-[14px] font-bold text-[var(--text-primary)] tracking-tight">
              Engineering Velocity
            </h2>
            <p className="text-[11px] text-[var(--text-tertiary)]">
              Weekly commits, PRs &amp; code reviews
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-semibold shrink-0">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
              />
              <span className="text-[var(--text-secondary)]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bar Chart ──────────────────────────────── */}
      <div
        className="rounded-xl px-4 pt-5 pb-3"
        style={{
          background: "rgba(7,11,20,0.5)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-end gap-2 sm:gap-4 h-48">
          {mockData.map((day, dayIdx) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center gap-1 h-40">
                {series.map((s, si) => (
                  <motion.div
                    key={s.key}
                    className="flex-1 rounded-t-sm origin-bottom cursor-pointer min-w-0"
                    style={{
                      height: getBarHeight(day[s.key]),
                      background: `linear-gradient(to top, ${s.color}b0, ${s.color})`,
                      maxWidth: 22,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: dayIdx * 0.04 + si * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      filter: "brightness(1.3)",
                      boxShadow: `0 -4px 12px ${s.glow}`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono font-semibold text-[var(--text-secondary)]">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Summary Footer ─────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {[
          { label: "Commits", value: totalCommits, color: "#7c6dfa" },
          { label: "PRs", value: totalPRs, color: "#22d3ee" },
          { label: "Reviews", value: totalReviews, color: "#10d98e" },
          { label: "Velocity", value: "A+", color: "#7c6dfa", isGrade: true },
        ].map((item) => (
          <div
            key={item.label}
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
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
