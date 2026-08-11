"use client";

import { motion } from "framer-motion";

const mockData = [
  { day: "Mon", commits: 12, prs: 3, reviews: 5 },
  { day: "Tue", commits: 19, prs: 5, reviews: 8 },
  { day: "Wed", commits: 8, prs: 2, reviews: 4 },
  { day: "Thu", commits: 15, prs: 4, reviews: 6 },
  { day: "Fri", commits: 22, prs: 6, reviews: 9 },
  { day: "Sat", commits: 5, prs: 1, reviews: 2 },
  { day: "Sun", commits: 3, prs: 0, reviews: 1 },
];

const maxCommits = Math.max(...mockData.map((d) => d.commits));

function getBarHeight(value: number): string {
  return `${Math.max((value / maxCommits) * 100, 2)}%`;
}

export function ActivityChart() {
  const totalCommits = mockData.reduce((s, d) => s + d.commits, 0);
  const totalPRs = mockData.reduce((s, d) => s + d.prs, 0);
  const totalReviews = mockData.reduce((s, d) => s + d.reviews, 0);

  return (
    <div className="card p-5 sm:p-6 lg:p-7 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-2 rounded-lg bg-[rgba(139,92,246,0.10)] border border-[rgba(139,92,246,0.20)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#a78bfa]"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] tracking-tight truncate">
                Engineering Velocity
              </h2>
              <p className="text-[11px] text-[var(--text-tertiary)] truncate">
                Weekly commits, PRs, and code reviews
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[11px] font-medium flex-wrap shrink-0">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-[var(--text-secondary)]">Commits</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-info)]" />
              <span className="text-[var(--text-secondary)]">PRs</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)]" />
              <span className="text-[var(--text-secondary)]">Reviews</span>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end gap-2 sm:gap-4 h-44 sm:h-48 px-1 pt-2">
          {mockData.map((day, dayIdx) => (
            <div
              key={day.day}
              className="flex-1 flex flex-col items-center gap-2.5"
            >
              <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-36 sm:h-40">
                {/* Commits */}
                <motion.div
                  className="w-[28%] rounded-t-md origin-bottom cursor-pointer"
                  style={{
                    height: getBarHeight(day.commits),
                    background:
                      "linear-gradient(to top, var(--color-accent), var(--color-accent-hover))",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: dayIdx * 3 * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ filter: "brightness(1.3)" }}
                />
                {/* PRs */}
                <motion.div
                  className="w-[28%] rounded-t-md origin-bottom cursor-pointer"
                  style={{
                    height: getBarHeight(day.prs),
                    background:
                      "linear-gradient(to top, #00b8e0, var(--color-info))",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: (dayIdx * 3 + 1) * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ filter: "brightness(1.3)" }}
                />
                {/* Reviews */}
                <motion.div
                  className="w-[28%] rounded-t-md origin-bottom cursor-pointer"
                  style={{
                    height: getBarHeight(day.reviews),
                    background:
                      "linear-gradient(to top, #00c26a, var(--color-success))",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: (dayIdx * 3 + 2) * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ filter: "brightness(1.3)" }}
                />
              </div>
              <span className="text-[11px] font-mono font-medium text-[var(--text-tertiary)]">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-white/[0.06]">
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] text-center">
          <p className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-mono">
            {totalCommits}
          </p>
          <p className="text-[10px] sm:text-[11px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider mt-0.5 truncate">
            Commits
          </p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] text-center">
          <p className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-mono">
            {totalPRs}
          </p>
          <p className="text-[10px] sm:text-[11px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider mt-0.5 truncate">
            PRs Opened
          </p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] text-center">
          <p className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-mono">
            {totalReviews}
          </p>
          <p className="text-[10px] sm:text-[11px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider mt-0.5 truncate">
            Reviewed
          </p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--color-accent-muted)] border border-[var(--color-accent-border)] text-center">
          <p className="text-lg sm:text-xl font-bold text-[var(--color-accent-hover)] font-mono">
            A+
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#a5b4fc] font-medium uppercase tracking-wider mt-0.5 truncate">
            Velocity
          </p>
        </div>
      </div>
    </div>
  );
}
