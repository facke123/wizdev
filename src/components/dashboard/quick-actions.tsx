"use client";

const actions = [
  {
    icon: "📝",
    label: "Generate Standup Report",
    description: "AI compiles your daily standup notes",
  },
  {
    icon: "📊",
    label: "Weekly Velocity Summary",
    description: "Generate executive summary of progress",
  },
  {
    icon: "🔍",
    label: "PR Risk Assessment",
    description: "AI analyzes high-risk code changes",
  },
  {
    icon: "🧹",
    label: "Stale Branch Cleanup",
    description: "Identify inactive branches & issues",
  },
];

export function QuickActions() {
  return (
    <div className="stripe-card p-6 lg:p-8 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/10">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-lg text-indigo-300">
            ⚡
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Copilot Actions
            </h2>
            <p className="text-xs text-slate-400">
              One-click AI developer automation
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.label}
              className="w-full flex items-center gap-3.5 p-4 rounded-xl bg-[#0b0e17]/60 border border-white/5 hover:border-indigo-500/30 hover:bg-[#0f1322] transition-all duration-200 text-left group"
            >
              <span className="text-xl p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all flex-shrink-0">
                {action.icon}
              </span>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {action.label}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
