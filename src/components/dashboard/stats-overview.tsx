"use client";

import { GitPullRequest, Bug, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Open Pull Requests",
    value: "12",
    change: "+3 this week",
    changeType: "neutral" as const,
    icon: GitPullRequest,
    accent: "#635bff",
    subtext: "4 awaiting your review",
  },
  {
    label: "Active Issues",
    value: "28",
    change: "-5 resolved",
    changeType: "positive" as const,
    icon: Bug,
    accent: "#00d97e",
    subtext: "8 critical priority",
  },
  {
    label: "CI Test Pass Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Zap,
    accent: "#00d4ff",
    subtext: "Across 5 repositories",
  },
  {
    label: "Avg Review Time",
    value: "4.2h",
    change: "-1.3h faster",
    changeType: "positive" as const,
    icon: Clock,
    accent: "#f5a623",
    subtext: "Top 10% team velocity",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
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
        return (
          <motion.div
            key={stat.label}
            variants={item}
            className="stat-card group"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div
                className="p-2 rounded-lg transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: `${stat.accent}14`,
                  border: `1px solid ${stat.accent}28`,
                }}
              >
                <Icon
                  className="w-[18px] h-[18px]"
                  style={{ color: stat.accent }}
                  strokeWidth={1.75}
                />
              </div>
              <span
                className={`badge ${
                  stat.changeType === "positive"
                    ? "badge--success"
                    : "badge--accent"
                }`}
              >
                {stat.change}
              </span>
            </div>

            {/* Value */}
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-[28px] font-bold text-[var(--text-primary)] tracking-tight font-mono leading-none">
                {stat.value}
              </h3>
              <p className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider truncate">
                {stat.label}
              </p>
            </div>

            {/* Subtext */}
            <div className="mt-4 pt-3 border-t border-white/[0.05]">
              <p className="text-[11px] text-[var(--text-tertiary)] truncate">
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
