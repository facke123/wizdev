"use client";

const mockWorkflows = [
  {
    id: 1,
    name: "Build & Test",
    repo: "wizdev-app",
    branch: "main",
    status: "success" as const,
    duration: "2m 34s",
    updatedAt: "12 min ago",
  },
  {
    id: 2,
    name: "Deploy Staging",
    repo: "wizdev-api",
    branch: "main",
    status: "failure" as const,
    duration: "1m 12s",
    updatedAt: "45 min ago",
  },
  {
    id: 3,
    name: "Lint & Type Check",
    repo: "wizdev-app",
    branch: "feat/analytics",
    status: "running" as const,
    duration: "0m 48s",
    updatedAt: "just now",
  },
  {
    id: 4,
    name: "Build & Test",
    repo: "wizdev-docs",
    branch: "main",
    status: "success" as const,
    duration: "1m 05s",
    updatedAt: "2h ago",
  },
  {
    id: 5,
    name: "Security Scan",
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
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  failure: {
    icon: "❌",
    label: "Failed",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  running: {
    icon: "⏳",
    label: "Running",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
};

export function CIStatusPanel() {
  const passingCount = mockWorkflows.filter(
    (w) => w.status === "success"
  ).length;
  const totalCount = mockWorkflows.length;

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <h2 className="font-semibold text-[var(--text-primary)]">CI/CD</h2>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {passingCount}/{totalCount} passing
        </span>
      </div>

      <div className="space-y-2.5">
        {mockWorkflows.map((workflow) => {
          const style = statusStyles[workflow.status];
          return (
            <div
              key={workflow.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-secondary)] hover:border-[var(--border-primary)] transition-all cursor-pointer"
            >
              <span className="text-sm">{style.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {workflow.name}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] truncate">
                  {workflow.repo} · {workflow.branch}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-[11px] font-medium ${style.color}`}>
                  {style.label}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  {workflow.duration}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
