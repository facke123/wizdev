"use client";

import { GitPullRequest, ArrowRight, MessageSquare } from "lucide-react";

const mockPRs = [
  {
    id: 1,
    number: 142,
    title: "feat: Add user analytics dashboard and retention funnel charts",
    repo: "wizdev-app",
    author: "alice",
    avatar: "A",
    status: "review" as const,
    additions: 342,
    deletions: 28,
    comments: 5,
    createdAt: "2 hours ago",
    labels: [
      { name: "feature", color: "#635bff" },
      { name: "frontend", color: "#06b6d4" },
    ],
  },
  {
    id: 2,
    number: 156,
    title: "fix: Memory leak in WebSocket connection handler pool",
    repo: "wizdev-api",
    author: "bob",
    avatar: "B",
    status: "approved" as const,
    additions: 23,
    deletions: 45,
    comments: 3,
    createdAt: "5 hours ago",
    labels: [
      { name: "bug", color: "#ef4444" },
      { name: "critical", color: "#f59e0b" },
    ],
  },
  {
    id: 3,
    number: 158,
    title: "refactor: Migrate auth provider layer to OAuth 2.1 spec",
    repo: "wizdev-api",
    author: "charlie",
    avatar: "C",
    status: "changes" as const,
    additions: 567,
    deletions: 312,
    comments: 12,
    createdAt: "1 day ago",
    labels: [{ name: "refactor", color: "#8b5cf6" }],
  },
  {
    id: 4,
    number: 160,
    title: "WIP: Implement AI-powered code review suggestions engine",
    repo: "wizdev-app",
    author: "alice",
    avatar: "A",
    status: "draft" as const,
    additions: 128,
    deletions: 0,
    comments: 0,
    createdAt: "3 hours ago",
    labels: [{ name: "ai", color: "#10b981" }],
  },
];

const statusConfig: Record<
  string,
  { label: string; badgeClass: string }
> = {
  review: { label: "Review Required", badgeClass: "badge--warning" },
  approved: { label: "Approved", badgeClass: "badge--success" },
  changes: { label: "Changes Requested", badgeClass: "badge--danger" },
  draft: { label: "Draft", badgeClass: "badge--info" },
};

const avatarColors = [
  "from-[#635bff] to-[#7a73ff]",
  "from-[#00d97e] to-[#00c26a]",
  "from-[#f5a623] to-[#e09510]",
  "from-[#00d4ff] to-[#00b8e0]",
];

export function PullRequestList() {
  return (
    <div className="card p-5 sm:p-6 lg:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="p-2 rounded-lg bg-[var(--color-accent-muted)] border border-[var(--color-accent-border)]">
            <GitPullRequest className="w-[18px] h-[18px] text-[var(--color-accent-hover)]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] tracking-tight truncate">
              Active Pull Requests
            </h2>
            <p className="text-[11px] text-[var(--text-tertiary)] truncate">
              4 open PRs across active repositories
            </p>
          </div>
        </div>

        <button className="btn btn--ghost text-xs">
          View All
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>

      {/* PR List */}
      <div className="space-y-2.5">
        {mockPRs.map((pr, idx) => {
          const status = statusConfig[pr.status];
          return (
            <div
              key={pr.id}
              className="p-4 rounded-2xl bg-[var(--surface-base)]/40 border border-white/[0.04] hover:border-[var(--color-accent-border)] hover:bg-[var(--surface-base)] transition-all duration-150 cursor-pointer group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Left: PR Info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} p-[1px] shrink-0 mt-0.5`}
                  >
                    <div className="w-full h-full bg-[var(--surface-card)] rounded-[7px] flex items-center justify-center text-[var(--text-primary)] text-[11px] font-bold">
                      {pr.avatar}
                    </div>
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[11px] font-semibold text-[var(--color-accent-hover)] shrink-0">
                        #{pr.number}
                      </span>
                      <h3 className="text-xs sm:text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent-hover)] transition-colors truncate">
                        {pr.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-[var(--text-tertiary)] flex-wrap">
                      <span className="font-mono text-[var(--text-secondary)] bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.05] shrink-0">
                        {pr.repo}
                      </span>
                      <span className="truncate">
                        opened by{" "}
                        <strong className="text-[var(--text-secondary)]">
                          @{pr.author}
                        </strong>
                      </span>
                      <span className="shrink-0">{pr.createdAt}</span>
                      <span className="inline-flex items-center gap-1 shrink-0">
                        <MessageSquare className="w-3 h-3" strokeWidth={1.5} />
                        {pr.comments}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Meta */}
                <div className="flex items-center gap-2.5 flex-wrap lg:flex-nowrap shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.04]">
                  {/* Labels */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {pr.labels.map((label) => (
                      <span
                        key={label.name}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border shrink-0 whitespace-nowrap"
                        style={{
                          backgroundColor: label.color + "18",
                          color: label.color,
                          borderColor: label.color + "30",
                        }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>

                  {/* Diff Stats */}
                  <div className="flex items-center gap-2 font-mono text-[11px] font-semibold px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05] shrink-0 whitespace-nowrap">
                    <span className="text-[var(--color-success)]">
                      +{pr.additions}
                    </span>
                    <span className="text-[var(--color-danger)]">
                      -{pr.deletions}
                    </span>
                  </div>

                  {/* Status */}
                  <span className={`badge ${status.badgeClass}`}>
                    {status.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
