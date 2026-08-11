"use client";

const stats = [
  {
    label: "Open Pull Requests",
    value: "12",
    change: "+3 this week",
    changeType: "neutral" as const,
    icon: "🔀",
    subtext: "4 awaiting your review",
  },
  {
    label: "Active Issues",
    value: "28",
    change: "-5 resolved",
    changeType: "positive" as const,
    icon: "🐛",
    subtext: "8 critical priority",
  },
  {
    label: "CI Test Pass Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: "⚡",
    subtext: "Across 5 main repositories",
  },
  {
    label: "Avg Code Review Time",
    value: "4.2h",
    change: "-1.3h faster",
    changeType: "positive" as const,
    icon: "⏱️",
    subtext: "Top 10% team velocity",
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="stripe-stat-card group">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xl group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300">
              {stat.icon}
            </div>
            <span
              className={`stripe-badge ${
                stat.changeType === "positive"
                  ? "stripe-badge-success"
                  : "stripe-badge-primary"
              }`}
            >
              {stat.change}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-black text-white tracking-tight font-mono">
              {stat.value}
            </h3>
            <p className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
              {stat.label}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
            {stat.subtext}
          </div>
        </div>
      ))}
    </div>
  );
}
