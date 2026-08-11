"use client";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const mockWorkflows = [
  {
    id: 1,
    name: "Build & Integration Test Suite",
    repo: "wizdev-app",
    branch: "main",
    status: "success" as const,
    duration: "2m 34s",
    updatedAt: "12min ago",
  },
  {
    id: 2,
    name: "Deploy Staging Cluster",
    repo: "wizdev-api",
    branch: "main",
    status: "failure" as const,
    duration: "1m 12s",
    updatedAt: "45min ago",
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
    icon: CheckCircle2,
    iconColor: "text-[var(--color-success)]",
    label: "Passed",
    badgeClass: "badge--success",
  },
  failure: {
    icon: XCircle,
    iconColor: "text-[var(--color-danger)]",
    label: "Failed",
    badgeClass: "badge--danger",
  },
  running: {
    icon: Loader2,
    iconColor: "text-[var(--color-warning)] animate-spin",
    label: "Building",
    badgeClass: "badge--warning",
  },
};

export function CIStatusPanel() {
  const passingCount = mockWorkflows.filter(
    (w) => w.status === "success"
  ).length;
  const healthPercent = Math.round(
    (passingCount / mockWorkflows.length) * 100
  );

  return (
    <div className="card p-5 lg:p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[rgba(0,212,255,0.10)] border border-[rgba(0,212,255,0.20)]">
              <CheckCircle2 className="w-[18px] h-[18px] text-[var(--color-info)]" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
                CI/CD Pipelines
              </h2>
              <p className="text-[11px] text-[var(--text-tertiary)]">
                {passingCount}/{mockWorkflows.length} passing
              </p>
            </div>
          </div>
          <span className="badge badge--success font-mono text-[10px]">
            {healthPercent}% Healthy
          </span>
        </div>

        {/* Workflow List */}
        <div className="space-y-2">
          {mockWorkflows.map((workflow) => {
            const style = statusStyles[workflow.status];
            const StatusIcon = style.icon;
            return (
              <div
                key={workflow.id}
                className="p-3 rounded-xl bg-[var(--surface-base)]/40 border border-white/[0.04] hover:border-white/[0.08] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <StatusIcon
                    className={`w-[15px] h-[15px] flex-shrink-0 ${style.iconColor}`}
                    strokeWidth={2}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--color-accent-hover)] transition-colors">
                      {workflow.name}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] font-mono truncate mt-0.5">
                      {workflow.repo} &middot; {workflow.branch}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`badge ${style.badgeClass} text-[10px]`}>
                    {style.label}
                  </span>
                  <p className="text-[10px] font-mono text-[var(--text-disabled)] mt-1">
                    {workflow.duration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <button className="mt-4 w-full btn btn--ghost text-xs py-2">
        View all pipelines
      </button>
    </div>
  );
}
