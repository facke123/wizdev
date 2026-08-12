"use client";

import { GitPullRequest, Bug, Zap, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

export function StatsOverview() {
  const { t } = useLanguage();

  const stats = [
    {
      labelKey: "stats.openPRs",
      subKey: "stats.openPRs.sub",
      value: "12",
      change: "+3",
      changeType: "neutral" as const,
      icon: GitPullRequest,
      accent: "#7c6dfa",
      progress: 40,
      sparkline: "M0 15 Q 15 12, 30 18 T 60 8 T 90 12 T 120 5",
    },
    {
      labelKey: "stats.activeIssues",
      subKey: "stats.activeIssues.sub",
      value: "28",
      change: "-5",
      changeType: "positive" as const,
      icon: Bug,
      accent: "#10d98e",
      progress: 70,
      sparkline: "M0 18 Q 20 8, 40 14 T 80 6 T 120 10",
    },
    {
      labelKey: "stats.ciPassRate",
      subKey: "stats.ciPassRate.sub",
      value: "94.2%",
      change: "+9.3%",
      changeType: "positive" as const,
      icon: Zap,
      accent: "#22d3ee",
      progress: 94,
      sparkline: "M0 16 Q 25 18, 50 10 T 90 12 T 120 4",
    },
    {
      labelKey: "stats.avgReviewTime",
      subKey: "stats.avgReviewTime.sub",
      value: "4.2h",
      change: "-1.3h",
      changeType: "positive" as const,
      icon: Clock,
      accent: "#fbbf24",
      progress: 80,
      sparkline: "M0 10 Q 30 15, 60 8 T 100 14 T 120 6",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.labelKey}
            variants={itemVariants}
            className="stat-card group"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0"
                style={{
                  background: `${stat.accent}15`,
                  border: `1px solid ${stat.accent}30`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: stat.accent }} strokeWidth={2} />
              </div>

              {/* Sparkline SVG */}
              <div className="flex-1 h-7 max-w-[80px] px-1 opacity-70 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 120 24" className="w-full h-full overflow-visible">
                  <path
                    d={stat.sparkline}
                    fill="none"
                    stroke={stat.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div
                className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0"
                style={{
                  background:
                    stat.changeType === "positive"
                      ? "rgba(16,217,142,0.12)"
                      : "rgba(255,255,255,0.05)",
                  color:
                    stat.changeType === "positive"
                      ? "#10d98e"
                      : "var(--text-secondary)",
                  border:
                    stat.changeType === "positive"
                      ? "1px solid rgba(16,217,142,0.25)"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {stat.changeType === "positive" ? (
                  <TrendingUp className="w-2.5 h-2.5" />
                ) : (
                  <Minus className="w-2.5 h-2.5" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>

            {/* Main Value */}
            <div className="mb-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider truncate">
                {t(stat.labelKey)}
              </p>
            </div>

            {/* Bottom Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-white/[0.05]">
              <div className="w-full h-1 rounded-full overflow-hidden bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${stat.progress}%`,
                    background: stat.accent,
                    boxShadow: `0 0 8px ${stat.accent}80`,
                  }}
                />
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-1.5 truncate">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: stat.accent }} />
                <span>{t(stat.subKey)}</span>
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
