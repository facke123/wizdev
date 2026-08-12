"use client";

import { AppShell } from "@/components/layout/app-shell";
import { CheckCircle2, XCircle, Loader2, Clock, Zap, GitBranch, ExternalLink, TrendingUp, AlertTriangle, Activity } from "lucide-react";

const WORKFLOWS = [
  { id: 1,  name: "Build & Integration Tests",  repo: "wizdev-app",  branch: "main",           status: "success" as const,  duration: "2m 34s", ago: "12min ago",  trigger: "push" },
  { id: 2,  name: "Deploy Staging Cluster",      repo: "wizdev-api",  branch: "main",           status: "failure" as const,  duration: "1m 12s", ago: "45min ago",  trigger: "push" },
  { id: 3,  name: "ESLint & TypeScript Check",   repo: "wizdev-app",  branch: "feat/analytics", status: "running" as const,  duration: "0m 48s", ago: "running now",trigger: "pr" },
  { id: 4,  name: "Docs Static Build",           repo: "wizdev-docs", branch: "main",           status: "success" as const,  duration: "1m 05s", ago: "2h ago",     trigger: "push" },
  { id: 5,  name: "Automated Security Audit",    repo: "wizdev-api",  branch: "main",           status: "success" as const,  duration: "3m 21s", ago: "3h ago",     trigger: "schedule" },
  { id: 6,  name: "E2E Tests (Playwright)",       repo: "wizdev-app",  branch: "main",           status: "success" as const,  duration: "5m 47s", ago: "4h ago",     trigger: "schedule" },
  { id: 7,  name: "Docker Build & Push",         repo: "wizdev-api",  branch: "main",           status: "failure" as const,  duration: "3m 02s", ago: "5h ago",     trigger: "push" },
  { id: 8,  name: "Dependency Vulnerability Scan",repo: "wizdev-app", branch: "main",           status: "success" as const,  duration: "1m 30s", ago: "6h ago",     trigger: "schedule" },
  { id: 9,  name: "Unit Test Suite",             repo: "wizdev-api",  branch: "feat/oauth",     status: "queued" as const,   duration: "—",      ago: "queued",     trigger: "pr" },
];

const HISTORY = [
  { time: "10:02", repo: "wizdev-app",  name: "Build & Integration Tests", status: "success" as const },
  { time: "09:47", repo: "wizdev-api",  name: "Deploy Staging Cluster",    status: "failure" as const },
  { time: "09:32", repo: "wizdev-app",  name: "ESLint & TypeScript Check",  status: "success" as const },
  { time: "08:15", repo: "wizdev-docs", name: "Docs Static Build",          status: "success" as const },
  { time: "07:50", repo: "wizdev-api",  name: "Security Audit",             status: "success" as const },
];

const statusStyles = {
  success: { Icon: CheckCircle2, iconColor: "#10d98e", label: "Passed",   labelBg: "rgba(16,217,142,0.10)",  labelColor: "#6ee7b7", labelBorder: "rgba(16,217,142,0.22)"  },
  failure: { Icon: XCircle,      iconColor: "#fb7185", label: "Failed",   labelBg: "rgba(251,113,133,0.10)", labelColor: "#fca5a5", labelBorder: "rgba(251,113,133,0.22)" },
  running: { Icon: Loader2,      iconColor: "#fbbf24", label: "Building", labelBg: "rgba(251,191,36,0.10)",  labelColor: "#fcd34d", labelBorder: "rgba(251,191,36,0.22)", spin: true },
  queued:  { Icon: Clock,        iconColor: "#9ba3b5", label: "Queued",   labelBg: "rgba(255,255,255,0.06)", labelColor: "#9ba3b5", labelBorder: "rgba(255,255,255,0.10)" },
};

const triggerColors: Record<string,string> = { push: "#22d3ee", pr: "#7c6dfa", schedule: "#fbbf24" };

export default function CIPage() {
  const passing    = WORKFLOWS.filter(w => w.status === "success").length;
  const failing    = WORKFLOWS.filter(w => w.status === "failure").length;
  const running    = WORKFLOWS.filter(w => w.status === "running").length;
  const health     = Math.round((passing / WORKFLOWS.filter(w => w.status !== "queued").length) * 100);

  const byRepo = WORKFLOWS.reduce<Record<string, typeof WORKFLOWS>>((acc, w) => {
    (acc[w.repo] = acc[w.repo] || []).push(w);
    return acc;
  }, {});

  return (
    <AppShell>
      {/* ── Page Header ─────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">CI / CD Pipelines</h1>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">Monitor workflow runs and deployment status across all repositories</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold"
          style={{ background: "rgba(16,217,142,0.12)", border: "1px solid rgba(16,217,142,0.25)", color: "#6ee7b7" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: "#10d98e", boxShadow: "0 0 6px #10d98e" }} />
          {health}% Healthy
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Passing",      value: passing,  color: "#10d98e", icon: CheckCircle2 },
          { label: "Failing",      value: failing,  color: "#fb7185", icon: XCircle },
          { label: "Running",      value: running,  color: "#fbbf24", icon: Activity },
          { label: "Health Score", value: `${health}%`, color: "#7c6dfa", icon: TrendingUp },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="stat-card flex items-center gap-4">
              <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${k.color}18`, border: `1px solid ${k.color}28` }}>
                <Icon className="w-5 h-5" style={{ color: k.color }} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-2xl font-extrabold font-mono" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs font-semibold text-[var(--text-tertiary)] mt-0.5">{k.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ── Left: Workflows by Repo ───────────────── */}
        <div className="xl:col-span-8 space-y-6">
          {Object.entries(byRepo).map(([repoName, workflows]) => (
            <div key={repoName} className="card p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl" style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.18)" }}>
                  <GitBranch className="w-4 h-4" style={{ color: "#22d3ee" }} strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[var(--text-primary)] font-mono">{repoName}</h2>
                  <p className="text-[11px] text-[var(--text-tertiary)]">{workflows.length} workflows</p>
                </div>
              </div>

              <div className="space-y-2">
                {workflows.map(w => {
                  const style = statusStyles[w.status];
                  const StatusIcon = style.Icon;
                  return (
                    <div key={w.id} className="p-3.5 rounded-xl flex items-center justify-between gap-3 group cursor-pointer transition-all"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <StatusIcon className={`w-4 h-4 shrink-0 ${"spin" in style && style.spin ? "animate-spin" : ""}`}
                          style={{ color: style.iconColor }} strokeWidth={2} />
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate group-hover:text-white transition-colors">{w.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{w.branch}</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                              style={{ background: `${triggerColors[w.trigger]}18`, color: triggerColors[w.trigger] }}>
                              {w.trigger}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                            style={{ background: style.labelBg, color: style.labelColor, borderColor: style.labelBorder }}>
                            {style.label}
                          </span>
                          <p className="text-[10px] font-mono text-[var(--text-disabled)] mt-0.5 text-right flex items-center justify-end gap-1">
                            <Clock className="w-2.5 h-2.5" /> {w.duration}
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[var(--text-disabled)] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: Activity Timeline ──────────────── */}
        <div className="xl:col-span-4 space-y-6">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl" style={{ background: "rgba(124,109,250,0.12)", border: "1px solid rgba(124,109,250,0.22)" }}>
                <Zap className="w-4 h-4" style={{ color: "#9d91fc" }} strokeWidth={1.75} />
              </div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">Recent Runs</h2>
            </div>
            <div className="space-y-3">
              {HISTORY.map((h, i) => {
                const isSuccess = h.status === "success";
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[var(--text-disabled)] w-10 shrink-0">{h.time}</span>
                    <div className="w-px h-8 rounded-full shrink-0" style={{ background: isSuccess ? "#10d98e" : "#fb7185" }} />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{h.name}</p>
                      <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{h.repo}</p>
                    </div>
                    <div className="ml-auto shrink-0">
                      {isSuccess
                        ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#10d98e" }} strokeWidth={2} />
                        : <XCircle className="w-3.5 h-3.5" style={{ color: "#fb7185" }} strokeWidth={2} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Failure Alert */}
          <div className="card p-5" style={{ borderColor: "rgba(251,113,133,0.25)", background: "rgba(251,113,133,0.05)" }}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#fb7185" }} strokeWidth={1.75} />
              <div>
                <p className="text-xs font-bold text-[#fca5a5]">2 Workflows Failing</p>
                <p className="text-[11px] text-[var(--text-tertiary)] mt-1 leading-relaxed">
                  Deploy Staging and Docker Build have failed on <code className="text-[#22d3ee] font-mono text-[10px]">wizdev-api/main</code>. Review logs immediately.
                </p>
                <button className="mt-3 text-[11px] font-semibold flex items-center gap-1" style={{ color: "#fb7185" }}>
                  View logs <ExternalLink className="w-3 h-3" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
