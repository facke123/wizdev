"use client";

import { CheckCircle2, XCircle, Loader2, ExternalLink } from "lucide-react";

const mockWorkflows = [
  {
    id: 1,
    name: "Build & Integration Tests",
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
    name: "ESLint & TypeScript Check",
    repo: "wizdev-app",
    branch: "feat/analytics",
    status: "running" as const,
    duration: "0m 48s",
    updatedAt: "running now",
  },
  {
    id: 4,
    name: "Docs Static Build",
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
    Icon: CheckCircle2,
    iconColor: "#10d98e",
    label: "Passed",
    labelBg: "rgba(16,217,142,0.10)",
    labelColor: "#6ee7b7",
    labelBorder: "rgba(16,217,142,0.22)",
    dot: "#10d98e",
  },
  failure: {
    Icon: XCircle,
    iconColor: "#fb7185",
    label: "Failed",
    labelBg: "rgba(251,113,133,0.10)",
    labelColor: "#fca5a5",
    labelBorder: "rgba(251,113,133,0.22)",
    dot: "#fb7185",
  },
  running: {
    Icon: Loader2,
    iconColor: "#fbbf24",
    label: "Building",
    labelBg: "rgba(251,191,36,0.10)",
    labelColor: "#fcd34d",
    labelBorder: "rgba(251,191,36,0.22)",
    dot: "#fbbf24",
    spin: true,
  },
};

export function CIStatusPanel() {
  const passingCount = mockWorkflows.filter((w) => w.status === "success").length;
  const healthPercent = Math.round((passingCount / mockWorkflows.length) * 100);

  return (
    <div className="card p-5 lg:p-6">
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="p-2 rounded-xl"
            style={{
              background: "rgba(34,211,238,0.10)",
              border: "1px solid rgba(34,211,238,0.20)",
            }}
          >
            <CheckCircle2
              className="w-[17px] h-[17px]"
              style={{ color: "#22d3ee" }}
              strokeWidth={1.75}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold text-[var(--text-primary)] tracking-tight">
              CI/CD Pipelines
            </h2>
            <p className="text-[11px] text-[var(--text-tertiary)]">
              {passingCount}/{mockWorkflows.length} passing
            </p>
          </div>
        </div>

        {/* Health badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0"
          style={{
            background: "rgba(16,217,142,0.10)",
            border: "1px solid rgba(16,217,142,0.22)",
            color: "#6ee7b7",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#10d98e", boxShadow: "0 0 6px #10d98e" }}
          />
          {healthPercent}% Healthy
        </div>
      </div>

      {/* Health progress bar */}
      <div
        className="w-full h-1 rounded-full mb-5 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${healthPercent}%`,
            background: "linear-gradient(90deg, #10d98e, #22d3ee)",
            boxShadow: "0 0 8px rgba(16,217,142,0.5)",
          }}
        />
      </div>

      {/* ── Workflow List ───────────────────────────── */}
      <div className="space-y-2">
        {mockWorkflows.map((workflow) => {
          const style = statusStyles[workflow.status];
          const StatusIcon = style.Icon;

          return (
            <div
              key={workflow.id}
              className="p-3 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <StatusIcon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${"spin" in style && style.spin ? "animate-spin" : ""}`}
                  style={{ color: style.iconColor }}
                  strokeWidth={2}
                />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate group-hover:text-white transition-colors">
                    {workflow.name}
                  </p>
                  <p className="text-[10px] text-[var(--text-tertiary)] font-mono truncate mt-0.5">
                    {workflow.repo} · {workflow.branch}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <span
                    className="block text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      background: style.labelBg,
                      color: style.labelColor,
                      borderColor: style.labelBorder,
                    }}
                  >
                    {style.label}
                  </span>
                  <p className="text-[10px] font-mono text-[var(--text-disabled)] mt-0.5 text-right">
                    {workflow.duration}
                  </p>
                </div>
                <ExternalLink
                  className="w-3 h-3 text-[var(--text-disabled)] opacity-0 group-hover:opacity-100 transition-opacity"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer CTA ──────────────────────────────── */}
      <button
        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12px] font-semibold transition-all"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "var(--text-secondary)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
        }}
      >
        View all pipelines
        <ExternalLink className="w-3 h-3" strokeWidth={1.75} />
      </button>
    </div>
  );
}
