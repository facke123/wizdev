"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import {
  GitPullRequest, Search, Filter, ArrowUpDown,
  Plus, Minus, MessageSquare, ArrowRight, ChevronDown,
  GitMerge, CircleDot, BookOpen, TrendingUp
} from "lucide-react";

const ALL_PRS = [
  { id: 1, number: 142, title: "feat: Add user analytics dashboard and retention funnel charts", repo: "wizdev-app", author: "alice", avatar: "A", status: "review" as const, additions: 342, deletions: 28, comments: 5, createdAt: "2 hours ago", labels: [{ name: "feature", color: "#7c6dfa" }, { name: "frontend", color: "#22d3ee" }] },
  { id: 2, number: 156, title: "fix: Memory leak in WebSocket connection handler pool", repo: "wizdev-api", author: "bob", avatar: "B", status: "approved" as const, additions: 23, deletions: 45, comments: 3, createdAt: "5 hours ago", labels: [{ name: "bug", color: "#fb7185" }, { name: "critical", color: "#fbbf24" }] },
  { id: 3, number: 158, title: "refactor: Migrate auth provider layer to OAuth 2.1 spec", repo: "wizdev-api", author: "charlie", avatar: "C", status: "changes" as const, additions: 567, deletions: 312, comments: 12, createdAt: "1 day ago", labels: [{ name: "refactor", color: "#a78bfa" }] },
  { id: 4, number: 160, title: "WIP: Implement AI-powered code review suggestions engine", repo: "wizdev-app", author: "alice", avatar: "A", status: "draft" as const, additions: 128, deletions: 0, comments: 0, createdAt: "3 hours ago", labels: [{ name: "ai", color: "#10d98e" }] },
  { id: 5, number: 163, title: "perf: Optimize database query batching for dashboard API", repo: "wizdev-api", author: "diana", avatar: "D", status: "review" as const, additions: 89, deletions: 134, comments: 7, createdAt: "6 hours ago", labels: [{ name: "performance", color: "#22d3ee" }] },
  { id: 6, number: 165, title: "docs: Add OpenAPI spec for all public endpoints", repo: "wizdev-docs", author: "eric", avatar: "E", status: "approved" as const, additions: 412, deletions: 5, comments: 2, createdAt: "8 hours ago", labels: [{ name: "docs", color: "#10d98e" }] },
  { id: 7, number: 167, title: "feat: Dark mode improvements and Stripe-inspired components", repo: "wizdev-app", author: "alice", avatar: "A", status: "merged" as const, additions: 230, deletions: 88, comments: 9, createdAt: "1 day ago", labels: [{ name: "feature", color: "#7c6dfa" }, { name: "ui", color: "#f472b6" }] },
  { id: 8, number: 170, title: "chore: Bump dependencies to latest stable versions", repo: "wizdev-app", author: "bob", avatar: "B", status: "merged" as const, additions: 12, deletions: 10, comments: 1, createdAt: "2 days ago", labels: [{ name: "chore", color: "#9ca3af" }] },
];

const statusConfig = {
  review:   { label: "Review Required", bg: "rgba(251,191,36,0.12)",  color: "#fcd34d", border: "rgba(251,191,36,0.25)" },
  approved: { label: "Approved",        bg: "rgba(16,217,142,0.12)",  color: "#6ee7b7", border: "rgba(16,217,142,0.25)" },
  changes:  { label: "Changes Needed",  bg: "rgba(251,113,133,0.12)", color: "#fca5a5", border: "rgba(251,113,133,0.25)" },
  draft:    { label: "Draft",           bg: "rgba(34,211,238,0.10)",  color: "#67e8f9", border: "rgba(34,211,238,0.22)" },
  merged:   { label: "Merged",          bg: "rgba(124,109,250,0.12)", color: "#c4bcff", border: "rgba(124,109,250,0.25)" },
};

const avatarGradients = [
  "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
  "linear-gradient(135deg, #10d98e, #059669)",
  "linear-gradient(135deg, #fbbf24, #d97706)",
  "linear-gradient(135deg, #22d3ee, #0891b2)",
  "linear-gradient(135deg, #f472b6, #db2777)",
];

const tabs = [
  { key: "all",      label: "All",      icon: GitPullRequest, count: 8  },
  { key: "open",     label: "Open",     icon: CircleDot,      count: 5  },
  { key: "review",   label: "In Review",icon: BookOpen,        count: 2  },
  { key: "merged",   label: "Merged",   icon: GitMerge,       count: 2  },
  { key: "draft",    label: "Draft",    icon: TrendingUp,     count: 1  },
];

export default function PullRequestsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch]       = useState("");
  const [repo, setRepo]           = useState("all");

  const filtered = ALL_PRS.filter((pr) => {
    const matchTab =
      activeTab === "all"  ? true :
      activeTab === "open" ? ["review","approved","changes"].includes(pr.status) :
      pr.status === activeTab;
    const matchSearch = pr.title.toLowerCase().includes(search.toLowerCase()) || `#${pr.number}`.includes(search);
    const matchRepo   = repo === "all" || pr.repo === repo;
    return matchTab && matchSearch && matchRepo;
  });

  const repos = [...new Set(ALL_PRS.map(p => p.repo))];

  return (
    <AppShell>
      {/* ── Page Header ─────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Pull Requests</h1>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">Review and manage code changes across repositories</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)", boxShadow: "0 2px 8px rgba(124,109,250,0.4)" }}
        >
          <GitPullRequest className="w-4 h-4" />
          New PR
        </button>
      </div>

      {/* ── Summary Stats ─────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Open", value: "5",  color: "#22d3ee",  desc: "awaiting action" },
          { label: "In Review", value: "2", color: "#fbbf24", desc: "needs attention" },
          { label: "Merged This Week", value: "2", color: "#10d98e", desc: "successfully merged" },
          { label: "Draft", value: "1", color: "#7c6dfa",  desc: "work in progress" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <p className="text-2xl font-extrabold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-semibold text-[var(--text-primary)] mt-1">{s.label}</p>
            <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs + Filters ─────────────────────────────── */}
      <div className="card p-4 mb-6">
        {/* Tabs */}
        <div className="flex gap-1 flex-wrap mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={
                  activeTab === tab.key
                    ? { background: "rgba(124,109,250,0.18)", color: "#c4bcff", border: "1px solid rgba(124,109,250,0.28)" }
                    : { background: "transparent", color: "var(--text-tertiary)", border: "1px solid transparent" }
                }
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {tab.label}
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono"
                  style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-tertiary)" }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 h-9 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search pull requests..."
              className="flex-1 bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none" />
          </div>
          <div className="flex items-center gap-2 px-3 h-9 rounded-xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Filter className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <select value={repo} onChange={e => setRepo(e.target.value)}
              className="bg-transparent text-xs text-[var(--text-secondary)] focus:outline-none cursor-pointer">
              <option value="all">All repos</option>
              {repos.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>
          <div className="flex items-center gap-2 px-3 h-9 rounded-xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <span className="text-xs text-[var(--text-secondary)]">Newest first</span>
          </div>
        </div>
      </div>

      {/* ── PR List ─────────────────────────────────────── */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <GitPullRequest className="w-10 h-10 mx-auto mb-3 text-[var(--text-disabled)]" strokeWidth={1} />
            <p className="text-sm text-[var(--text-tertiary)]">No pull requests match your filters</p>
          </div>
        ) : filtered.map((pr, idx) => {
          const status = statusConfig[pr.status];
          return (
            <div key={pr.id} className="card p-4 lg:p-5 cursor-pointer group"
              style={{ transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,109,250,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5"
                    style={{ background: avatarGradients[idx % avatarGradients.length] }}>
                    {pr.avatar}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold shrink-0" style={{ color: "#9d91fc" }}>#{pr.number}</span>
                      <h3 className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors truncate">{pr.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] flex-wrap">
                      <span className="font-mono px-1.5 py-0.5 rounded border text-[var(--text-secondary)]"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>{pr.repo}</span>
                      <span>by <strong className="text-[var(--text-secondary)]">@{pr.author}</strong></span>
                      <span>{pr.createdAt}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" strokeWidth={1.5} />{pr.comments}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap shrink-0 pl-11 lg:pl-0">
                  {pr.labels.map(l => (
                    <span key={l.name} className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border"
                      style={{ background: `${l.color}18`, color: l.color, borderColor: `${l.color}30` }}>{l.name}</span>
                  ))}
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold px-2 py-1 rounded-lg shrink-0"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="flex items-center gap-0.5" style={{ color: "#10d98e" }}><Plus className="w-2.5 h-2.5" strokeWidth={2.5} />{pr.additions}</span>
                    <span className="text-[var(--text-disabled)]">/</span>
                    <span className="flex items-center gap-0.5" style={{ color: "#fb7185" }}><Minus className="w-2.5 h-2.5" strokeWidth={2.5} />{pr.deletions}</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap"
                    style={{ background: status.bg, color: status.color, borderColor: status.border }}>{status.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-tertiary)]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
