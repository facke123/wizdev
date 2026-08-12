"use client";

import { GitPullRequest, ArrowRight, MessageSquare, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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
      { name: "feature", color: "#9d91fc" },
      { name: "frontend", color: "#38bdf8" },
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
      { name: "bug", color: "#f87171" },
      { name: "critical", color: "#fbbf24" },
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
    labels: [{ name: "refactor", color: "#c084fc" }],
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
    labels: [{ name: "ai", color: "#34d399" }],
  },
];

const statusConfig = {
  review:   { label: "Review Required", bg: "rgba(251,191,36,0.12)",  color: "#fcd34d", border: "rgba(251,191,36,0.25)" },
  approved: { label: "Approved",        bg: "rgba(16,217,142,0.12)",  color: "#6ee7b7", border: "rgba(16,217,142,0.25)" },
  changes:  { label: "Changes Needed",  bg: "rgba(251,113,133,0.12)", color: "#fca5a5", border: "rgba(251,113,133,0.25)" },
  draft:    { label: "Draft",           bg: "rgba(34,211,238,0.10)",  color: "#67e8f9", border: "rgba(34,211,238,0.22)" },
};

const avatarGradients = [
  "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
  "linear-gradient(135deg, #10d98e, #059669)",
  "linear-gradient(135deg, #fbbf24, #d97706)",
  "linear-gradient(135deg, #22d3ee, #0891b2)",
];

export function PullRequestList() {
  const { t } = useLanguage();

  return (
    <div className="card p-5 sm:p-6 space-y-4">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0"
            style={{
              background: "rgba(124,109,250,0.12)",
              border: "1px solid rgba(124,109,250,0.22)",
            }}
          >
            <GitPullRequest className="w-4 h-4 text-[var(--brand-violet)]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-white tracking-tight truncate">
              {t("prs.title")}
            </h2>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5 truncate">
              {t("prs.sub")}
            </p>
          </div>
        </div>

        <a
          href="/prs"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all shrink-0 whitespace-nowrap text-[var(--text-secondary)] hover:text-white"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span className="whitespace-nowrap">{t("prs.viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
        </a>
      </div>

      {/* ── PR List ────────────────────────────────── */}
      <div className="space-y-2.5">
        {mockPRs.map((pr, idx) => {
          const status = statusConfig[pr.status];
          return (
            <div
              key={pr.id}
              className="p-4 rounded-xl transition-all duration-150 cursor-pointer group"
              style={{
                background: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(124,109,250,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,109,250,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.018)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
                {/* Left: PR Info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5"
                    style={{ background: avatarGradients[idx % avatarGradients.length] }}
                  >
                    {pr.avatar}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[12px] font-bold shrink-0 text-[#9d91fc]">
                        #{pr.number}
                      </span>
                      <h3 className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors truncate">
                        {pr.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] flex-wrap">
                      <span
                        className="font-mono text-[11px] font-medium px-1.5 py-0.5 rounded border text-[var(--text-secondary)]"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.07)",
                        }}
                      >
                        {pr.repo}
                      </span>
                      <span>
                        by <strong className="text-[var(--text-secondary)] font-semibold">@{pr.author}</strong>
                      </span>
                      <span>· {pr.createdAt}</span>
                      {pr.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" strokeWidth={1.5} />
                          {pr.comments}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Labels + Diff + Status */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0 pl-11 lg:pl-0">
                  {/* Desaturated, clear readable Labels */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {pr.labels.map((label) => (
                      <span
                        key={label.name}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border"
                        style={{
                          background: `${label.color}14`,
                          color: label.color,
                          borderColor: `${label.color}28`,
                        }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>

                  {/* Diff */}
                  <div
                    className="flex items-center gap-1.5 font-mono text-[11px] font-bold px-2 py-0.5 rounded-lg shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span className="flex items-center gap-0.5 text-[#10d98e]">
                      <Plus className="w-2.5 h-2.5" strokeWidth={2.5} />
                      {pr.additions}
                    </span>
                    <span className="text-[var(--text-disabled)]">/</span>
                    <span className="flex items-center gap-0.5 text-[#fb7185]">
                      <Minus className="w-2.5 h-2.5" strokeWidth={2.5} />
                      {pr.deletions}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap"
                    style={{
                      background: status.bg,
                      color: status.color,
                      borderColor: status.border,
                    }}
                  >
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
