"use client";

import { GitPullRequest, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { useGitHubStats } from "@/hooks/use-github";
import { StatSkeleton, DemoBanner } from "@/components/ui/skeleton";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

const SPARKLINES = [
  "M0 15 Q 15 12, 30 18 T 60 8 T 90 12 T 120 5",
  "M0 18 Q 20 8, 40 14 T 80 6 T 120 10",
  "M0 16 Q 25 18, 50 10 T 90 12 T 120 4",
  "M0 10 Q 30 15, 60 8 T 100 14 T 120 6",
];
const ICON_COLORS = ["#7c6dfa", "#10d98e", "#22d3ee", "#fbbf24"];

import { Bug, Zap, Clock } from "lucide-react";
const ICONS = [GitPullRequest, Bug, Zap, Clock];

export function StatsOverview() {
  const { t } = useLanguage();
  const { data, loading } = useGitHubStats();

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[0, 1, 2, 3].map((i) => <StatSkeleton key={i} />)}
      </div>
    );
  }

  const avgReviewDisplay =
    data.avgReviewHours >= 24
      ? `${(data.avgReviewHours / 24).toFixed(1)}d`
      : `${data.avgReviewHours}h`;

  const ciProgress = Math.min(Math.round(data.ciPassRate), 100);
  const ciChange = `${data.ciPassRate >= 90 ? "+" : ""}${data.ciPassRate.toFixed(1)}%`;

  const stats = [
    {
      labelKey: "stats.openPRs",
      subKey: "stats.openPRs.sub",
      value: String(data.openPRs),
      change: `${data.openPRs} open`,
      changeType: "neutral" as const,
      Icon: ICONS[0],
      accent: ICON_COLORS[0],
      progress: Math.min(data.openPRs * 5, 100),
      sparkline: SPARKLINES[0],
    },
    {
      labelKey: "stats.activeIssues",
      subKey: "stats.activeIssues.sub",
      value: String(data.activeIssues),
      change: `${data.activeIssues} open`,
      changeType: data.activeIssues > 30 ? ("negative" as const) : ("positive" as const),
      Icon: ICONS[1],
      accent: ICON_COLORS[1],
      progress: Math.min(data.activeIssues * 2, 100),
      sparkline: SPARKLINES[1],
    },
    {
      labelKey: "stats.ciPassRate",
      subKey: "stats.ciPassRate.sub",
      value: `${data.ciPassRate}%`,
      change: ciChange,
      changeType: data.ciPassRate >= 80 ? ("positive" as const) : ("negative" as const),
      Icon: ICONS[2],
      accent: ICON_COLORS[2],
      progress: ciProgress,
      sparkline: SPARKLINES[2],
    },
    {
      labelKey: "stats.avgReviewTime",
      subKey: "stats.avgReviewTime.sub",
      value: avgReviewDisplay,
      change: `Avg`,
      changeType: data.avgReviewHours <= 6 ? ("positive" as const) : ("neutral" as const),
      Icon: ICONS[3],
      accent: ICON_COLORS[3],
      progress: Math.max(0, 100 - data.avgReviewHours * 4),
      sparkline: SPARKLINES[3],
    },
  ];

  return (
    <div className="space-y-2">
      {data.isDemo && <DemoBanner />}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {stats.map((stat) => {
          const Icon = stat.Icon;
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

                <div className="flex-1 h-7 max-w-[80px] px-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 120 24" className="w-full h-full overflow-visible">
                    <path d={stat.sparkline} fill="none" stroke={stat.accent} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div
                  className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0"
                  style={{
                    background: stat.changeType === "positive" ? "rgba(16,217,142,0.12)" : "rgba(255,255,255,0.05)",
                    color: stat.changeType === "positive" ? "#10d98e" : stat.changeType === "negative" ? "#fb7185" : "var(--text-secondary)",
                    border: stat.changeType === "positive" ? "1px solid rgba(16,217,142,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {stat.changeType === "positive" ? <TrendingUp className="w-2.5 h-2.5" /> : stat.changeType === "negative" ? <TrendingDown className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                  <span>{stat.change}</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider truncate">
                  {t(stat.labelKey)}
                </p>
              </div>

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
    </div>
  );
}
