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
  },
  {
    id: 2,
    name: "Deploy Staging Cluster",
    repo: "wizdev-api",
    branch: "main",
    status: "failure" as const,
    duration: "1m 12s",
  },
  {
    id: 3,
    name: "ESLint & TypeScript Check",
    repo: "wizdev-app",
    branch: "feat/analytics",
    status: "running" as const,
    duration: "0m 48s",
  },
  {
    id: 4,
    name: "Docs Static Build",
    repo: "wizdev-docs",
    branch: "main",
    status: "success" as const,
    duration: "1m 05s",
  },
  {
    id: 5,
    name: "Automated Security Audit",
    repo: "wizdev-api",
    branch: "main",
    status: "success" as const,
    duration: "3m 21s",
  },
];

const statusStyles = {
  success: {
    Icon: CheckCircle2,
    iconColor: "#10d98e",
    label: "Passed",
    color: "#10d98e",
  },
  failure: {
    Icon: XCircle,
    iconColor: "#fb7185",
    label: "Failed",
    color: "#fb7185",
  },
  running: {
    Icon: Loader2,
    iconColor: "#fbbf24",
    label: "Building",
    color: "#fbbf24",
    spin: true,
  },
};

export function CIStatusPanel() {
  const passingCount = mockWorkflows.filter((w) => w.status === "success").length;
  const healthPercent = Math.round((passingCount / mockWorkflows.length) * 100);

  return (
    <div
      className="card p-5"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mb-4">
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
            <h2 className="text-[14px] font-bold text-white tracking-tight">
              CI/CD Pipelines
            </h2>
            <p className="text-[11px] text-[var(--text-tertiary)]">
              {passingCount}/{mockWorkflows.length} passing
            </p>
          </div>
        </div>

        {/* Health badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0"
          style={{
            background: "rgba(16,217,142,0.12)",
            border: "1px solid rgba(16,217,142,0.25)",
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
        className="w-full h-1 rounded-full mb-4 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
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
              className="p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer"
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

              <div className="text-right shrink-0">
                <span className="text-[11px] font-bold block leading-none" style={{ color: style.color }}>
                  {style.label}
                </span>
                <span className="text-[9px] font-mono text-[var(--text-disabled)] mt-0.5 block">
                  {workflow.duration}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer Link ────────────────────────────── */}
      <a
        href="/ci"
        className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all shrink-0 whitespace-nowrap text-[var(--text-secondary)] hover:text-white"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="whitespace-nowrap">View all pipelines</span>
        <ExternalLink className="w-3 h-3 shrink-0" strokeWidth={1.75} />
      </a>
    </div>
  );
}
