"use client";

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
    labels: [{ name: "feature", color: "#6366f1" }, { name: "frontend", color: "#06b6d4" }],
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
    labels: [{ name: "bug", color: "#ef4444" }, { name: "critical", color: "#f59e0b" }],
  },
  {
    id: 3,
    number: 158,
    title: "refactor: Migrate authentication provider layer to OAuth 2.1 specification",
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

const statusConfig = {
  review: { label: "Review Required", badge: "stripe-badge-warning" },
  approved: { label: "Approved", badge: "stripe-badge-success" },
  changes: { label: "Changes Requested", badge: "stripe-badge-danger" },
  draft: { label: "Draft", badge: "stripe-badge-primary" },
};

export function PullRequestList() {
  return (
    <div className="stripe-card p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xl text-indigo-300">
            🔀
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Active Pull Requests
            </h2>
            <p className="text-xs text-slate-400">
              Showing 4 open PRs across active repositories
            </p>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-all">
          View All PRs →
        </button>
      </div>

      {/* PR Table Rows */}
      <div className="space-y-4">
        {mockPRs.map((pr) => {
          const status = statusConfig[pr.status];
          return (
            <div
              key={pr.id}
              className="p-5 rounded-2xl bg-[#0b0e17]/60 border border-white/5 hover:border-indigo-500/30 hover:bg-[#0f1322] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left PR Meta */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] flex-shrink-0 mt-0.5">
                    <div className="w-full h-full bg-[#0f1322] rounded-[11px] flex items-center justify-center text-white text-xs font-bold">
                      {pr.avatar}
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-indigo-400">
                        #{pr.number}
                      </span>
                      <h3 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors truncate">
                        {pr.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                      <span className="font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {pr.repo}
                      </span>
                      <span>opened by <strong className="text-slate-200">@{pr.author}</strong></span>
                      <span>{pr.createdAt}</span>
                      <span>💬 {pr.comments} comments</span>
                    </div>
                  </div>
                </div>

                {/* Right Labels, Diff & Status Badge */}
                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap justify-between md:justify-end">
                  {/* Labels */}
                  <div className="flex items-center gap-1.5">
                    {pr.labels.map((label) => (
                      <span
                        key={label.name}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border"
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

                  {/* Diff Stats */}
                  <div className="flex items-center gap-2 font-mono text-xs font-medium px-3 py-1 rounded-lg bg-white/5">
                    <span className="text-emerald-400">+{pr.additions}</span>
                    <span className="text-rose-400">-{pr.deletions}</span>
                  </div>

                  {/* Status Badge */}
                  <span className={`stripe-badge ${status.badge} flex-shrink-0`}>
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
