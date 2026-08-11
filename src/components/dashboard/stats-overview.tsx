"use client";

const stats = [
  {
    label: "Open PRs",
    value: "12",
    change: "+3",
    changeType: "up" as const,
    icon: "🔀",
    color: "var(--wiz-primary)",
  },
  {
    label: "Issues",
    value: "28",
    change: "-5",
    changeType: "down" as const,
    icon: "🐛",
    color: "var(--wiz-warning)",
  },
  {
    label: "CI Passing",
    value: "94%",
    change: "+2%",
    changeType: "up" as const,
    icon: "✅",
    color: "var(--wiz-success)",
  },
  {
    label: "Avg Review Time",
    value: "4.2h",
    change: "-1.3h",
    changeType: "down" as const,
    icon: "⏱️",
    color: "var(--wiz-accent)",
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{stat.icon}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                stat.changeType === "up"
                  ? stat.label === "Issues"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-emerald-500/10 text-emerald-400"
                  : stat.label === "Issues" || stat.label === "Avg Review Time"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="text-3xl font-bold text-[var(--text-primary)]">
            {stat.value}
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
