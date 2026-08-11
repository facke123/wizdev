"use client";

const mockPRs = [
  {
    id: 1,
    number: 142,
    title: "feat: Add user analytics dashboard",
    repo: "wizdev-app",
    author: "alice",
    avatar: "A",
    status: "review" as const,
    additions: 342,
    deletions: 28,
    comments: 5,
    createdAt: "2h ago",
    labels: [{ name: "feature", color: "#6366f1" }, { name: "frontend", color: "#06b6d4" }],
    draft: false,
  },
  {
    id: 2,
    number: 156,
    title: "fix: Memory leak in WebSocket connection handler",
    repo: "wizdev-api",
    author: "bob",
    avatar: "B",
    status: "approved" as const,
    additions: 23,
    deletions: 45,
    comments: 3,
    createdAt: "5h ago",
    labels: [{ name: "bug", color: "#ef4444" }, { name: "critical", color: "#f59e0b" }],
    draft: false,
  },
  {
    id: 3,
    number: 158,
    title: "refactor: Migrate auth module to OAuth 2.1",
    repo: "wizdev-api",
    author: "charlie",
    avatar: "C",
    status: "changes" as const,
    additions: 567,
    deletions: 312,
    comments: 12,
    createdAt: "1d ago",
    labels: [{ name: "refactor", color: "#8b5cf6" }],
    draft: false,
  },
  {
    id: 4,
    number: 160,
    title: "WIP: Implement AI-powered code review suggestions",
    repo: "wizdev-app",
    author: "alice",
    avatar: "A",
    status: "draft" as const,
    additions: 128,
    deletions: 0,
    comments: 0,
    createdAt: "3h ago",
    labels: [{ name: "ai", color: "#10b981" }],
    draft: true,
  },
];

const statusConfig = {
  review: { label: "In Review", color: "bg-yellow-500/10 text-yellow-400", dot: "warning" },
  approved: { label: "Approved", color: "bg-emerald-500/10 text-emerald-400", dot: "success" },
  changes: { label: "Changes Req.", color: "bg-red-500/10 text-red-400", dot: "danger" },
  draft: { label: "Draft", color: "bg-gray-500/10 text-gray-400", dot: "info" },
};

export function PullRequestList() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔀</span>
          <h2 className="font-semibold text-[var(--text-primary)]">
            Pull Requests
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-[var(--wiz-primary)]/10 text-[var(--wiz-primary-light)] text-xs font-medium">
            {mockPRs.length} open
          </span>
        </div>
        <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          View all →
        </button>
      </div>

      <div className="space-y-3">
        {mockPRs.map((pr) => {
          const status = statusConfig[pr.status];
          return (
            <div
              key={pr.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-secondary)] hover:border-[var(--border-primary)] transition-all duration-200 cursor-pointer group"
            >
              {/* Author Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--wiz-primary)]/60 to-[var(--wiz-accent)]/60 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {pr.avatar}
              </div>

              {/* PR Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--wiz-primary-light)] transition-colors">
                    {pr.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span>{pr.repo}</span>
                  <span>#{pr.number}</span>
                  <span>by @{pr.author}</span>
                  <span>{pr.createdAt}</span>
                </div>
              </div>

              {/* Labels */}
              <div className="hidden md:flex items-center gap-1.5">
                {pr.labels.map((label) => (
                  <span
                    key={label.name}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
                    style={{
                      backgroundColor: label.color + "15",
                      color: label.color,
                      borderColor: label.color + "30",
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-emerald-400">+{pr.additions}</span>
                <span className="text-red-400">-{pr.deletions}</span>
                <span>💬 {pr.comments}</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <span className={`status-dot ${status.dot}`} />
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
