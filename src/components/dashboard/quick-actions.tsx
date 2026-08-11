"use client";

const actions = [
  {
    icon: "📝",
    label: "Generate Standup",
    description: "AI writes your daily standup report",
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
  },
  {
    icon: "📊",
    label: "Weekly Report",
    description: "Summarize this week's progress",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
  },
  {
    icon: "🔍",
    label: "PR Risk Analysis",
    description: "Identify high-risk pull requests",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20",
  },
  {
    icon: "🧹",
    label: "Stale Cleanup",
    description: "Find stale branches and issues",
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/20",
  },
];

export function QuickActions() {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⚡</span>
        <h2 className="font-semibold text-[var(--text-primary)]">
          Quick Actions
        </h2>
      </div>

      <div className="space-y-2.5">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`
              w-full flex items-center gap-3 p-3.5 rounded-xl
              bg-gradient-to-r ${action.gradient}
              border ${action.border}
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200 text-left group
            `}
          >
            <span className="text-xl">{action.icon}</span>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-white transition-colors">
                {action.label}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
