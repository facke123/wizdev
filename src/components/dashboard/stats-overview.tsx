"use client";

import { GitPullRequest, Bug, Zap, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Open Pull Requests",
    value: "12",
    change: "+3",
    changeLabel: "this week",
    changeType: "neutral" as const,
    icon: GitPullRequest,
    accent: "#7c6dfa",
    subtext: "4 awaiting your review",
    progress: 40,
  },
  {
    label: "Active Issues",
    value: "28",
    change: "-5",
    changeLabel: "resolved",
    changeType: "positive" as const,
    icon: Bug,
    accent: "#10d98e",
    subtext: "8 critical priority",
    progress: 70,
  },
  {
    label: "CI Pass Rate",
    value: "94.2%",
    change: "+2.1%",
    changeLabel: "vs last week",
    changeType: "positive" as const,
    icon: Zap,
    accent: "#22d3ee",
    subtext: "Across 5 repositories",
    progress: 94,
  },
  {
    label: "Avg Review Time",
    value: "4.2h",
    change: "-1.3h",
    changeLabel: "faster",
    changeType: "positive" as const,
    icon: Clock,
    accent: "#fbbf24",
    subtext: "Top 10% team velocity",
    progress: 80,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function StatsOverview() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon =
          stat.changeType === "positive"
            ? TrendingUp
            : stat.changeType === "negative"
              ? TrendingDown
              : Minus;

        return (
          <motion.div key={stat.label} variants={item} className="stat-card group">
            {/* Glow accent top-right */}
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-[0.07] blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.14]"
              style={{ background: stat.accent }}
            />

            {/* Header Row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div
                className="p-2 rounded-xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: `${stat.accent}18`,
                  border: `1px solid ${stat.accent}2a`,
                }}
              >
                <Icon
                  className="w-[17px] h-[17px]"
                  style={{ color: stat.accent }}
                  strokeWidth={1.75}
                />
              </div>

              {/* Change badge */}
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{
                  background:
                    stat.changeType === "positive"
                      ? "rgba(16,217,142,0.10)"
                      : "rgba(255,255,255,0.06)",
                  color:
                    stat.changeType === "positive"
                      ? "#10d98e"
                      : "var(--text-tertiary)",
                  border:
                    stat.changeType === "positive"
                      ? "1px solid rgba(16,217,142,0.22)"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <TrendIcon className="w-3 h-3" strokeWidth={2} />
                <span>{stat.change}</span>
              </div>
            </div>

            {/* Value */}
            <div className="space-y-0.5 mb-4">
              <p className="text-[28px] font-extrabold text-[var(--text-primary)] tracking-tight font-mono leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider truncate">
                {stat.label}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="w-full h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${stat.accent}cc, ${stat.accent})`,
                    boxShadow: `0 0 8px ${stat.accent}60`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Subtext */}
            <div
              className="pt-3 border-t"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <p className="text-[11px] text-[var(--text-tertiary)] truncate flex items-center gap-1.5">
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: stat.accent }}
                />
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
