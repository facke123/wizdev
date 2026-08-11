"use client";

const mockWorkflows = [
  {
    id: 1,
    name: "Build & Integration Test Suite",
    repo: "wizdev-app",
    branch: "main",
    status: "success" as const,
    duration: "2m 34s",
    updatedAt: "12m ago",
  },
  {
    id: 2,
    name: "Deploy Staging Cluster",
    repo: "wizdev-api",
    branch: "main",
    status: "failure" as const,
    duration: "1m 12s",
    updatedAt: "45m ago",
  },
  {
    id: 3,
    name: "ESLint & TypeScript Typecheck",
    repo: "wizdev-app",
    branch: "feat/analytics",
    status: "running" as const,
    duration: "0m 48s",
    updatedAt: "running now",
  },
  {
    id: 4,
    name: "Docs Site Static Build",
    repo: "wizdev-docs",
    branch: "main",
    status: "success" as const,
    duration: "1m 05s",
    updatedAt: "2h ago",
  },
  {
    id: 5,
    name: "Automated Security Audit",
    repo: "wizdev-api",
    branch: "main",
    status: "success" as const,
    duration: "3m 21s",
    updatedAt: "3h ago",
  },
];

const statusStyles = {
  success: {
    icon: "✅",
    label: "Passed",
    badge: "stripe-badge-success",
  },
  failure: {
    icon: "❌",
    label: "Failed",
    badge: "stripe-badge-danger",
  },
  running: {
    icon: "⏳",
    label: "Building",
    badge: "stripe-badge-warning",
  },
};

export function CIStatusPanel() {
  const passingCount = mockWorkflows.filter(
    (w) => w.status === "success"
  ).length;

  return (
    <div className="stripe-card p-6 lg:p-8 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-lg text-cyan-300">
              ⚡
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                CI/CD Workflows
              </h2>
              <p className="text-xs text-slate-400">
                {passingCount}/{mockWorkflows.length} passing
              </p>
            </div>
          </div>
          <span className="stripe-badge stripe-badge-success font-mono">94.2% Health</span>
        </div>

        <div className="space-y-3">
          {mockWorkflows.map((workflow) => {
            const style = statusStyles[workflow.status];
            return (
              <div
                key={workflow.id}
                className="p-3.5 rounded-xl bg-[#0b0e17]/60 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base flex-shrink-0">{style.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {workflow.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      {workflow.repo} · {workflow.branch}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`stripe-badge ${style.badge} text-[10px]`}>
                    {style.label}
                  </span>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">
                    {workflow.duration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
