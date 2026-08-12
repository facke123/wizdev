"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Bug, Search, Filter, ChevronDown, MessageSquare, ArrowRight, AlertTriangle, CheckCircle2, Clock, TrendingDown } from "lucide-react";

const ALL_ISSUES = [
  { id: 1,  number: 201, title: "Dashboard loads slowly on first render — TTI over 4s",            repo: "wizdev-app", author: "alice",   avatar: "A", priority: "critical" as const, status: "open" as const,        labels: [{ name: "performance", color: "#22d3ee" }, { name: "bug", color: "#fb7185" }], comments: 8,  createdAt: "3 hours ago",   assignees: ["alice", "bob"] },
  { id: 2,  number: 203, title: "Perf regression: analytics query takes 12s on large repos",       repo: "wizdev-api", author: "bob",     avatar: "B", priority: "critical" as const, status: "open" as const,        labels: [{ name: "performance", color: "#22d3ee" }],                                    comments: 5,  createdAt: "5 hours ago",   assignees: ["charlie"] },
  { id: 3,  number: 196, title: "PR diff view breaks on files with >1000 changed lines",           repo: "wizdev-app", author: "charlie", avatar: "C", priority: "high" as const,     status: "open" as const,        labels: [{ name: "bug", color: "#fb7185" }],                                            comments: 3,  createdAt: "1 day ago",     assignees: ["alice"] },
  { id: 4,  number: 188, title: "Add keyboard shortcut support for PR review actions",             repo: "wizdev-app", author: "diana",   avatar: "D", priority: "high" as const,     status: "in_progress" as const, labels: [{ name: "enhancement", color: "#7c6dfa" }],                                    comments: 12, createdAt: "2 days ago",    assignees: ["diana"] },
  { id: 5,  number: 175, title: "Notification emails not sending for CI failures",                 repo: "wizdev-api", author: "eric",    avatar: "E", priority: "high" as const,     status: "in_progress" as const, labels: [{ name: "bug", color: "#fb7185" }, { name: "infra", color: "#fbbf24" }],     comments: 7,  createdAt: "3 days ago",    assignees: ["eric", "alice"] },
  { id: 6,  number: 164, title: "Support multi-org GitHub connections",                            repo: "wizdev-api", author: "alice",   avatar: "A", priority: "medium" as const,   status: "open" as const,        labels: [{ name: "feature", color: "#10d98e" }],                                        comments: 21, createdAt: "5 days ago",    assignees: [] },
  { id: 7,  number: 152, title: "Add dark mode support for chart tooltips",                        repo: "wizdev-app", author: "bob",     avatar: "B", priority: "medium" as const,   status: "open" as const,        labels: [{ name: "ui", color: "#f472b6" }],                                             comments: 4,  createdAt: "1 week ago",    assignees: ["bob"] },
  { id: 8,  number: 148, title: "Stale PR detection should notify original author",                repo: "wizdev-app", author: "charlie", avatar: "C", priority: "low" as const,      status: "open" as const,        labels: [{ name: "enhancement", color: "#7c6dfa" }],                                    comments: 2,  createdAt: "2 weeks ago",   assignees: [] },
  { id: 9,  number: 133, title: "Docs: Update self-hosting guide for Docker Compose v2",           repo: "wizdev-docs",author: "diana",   avatar: "D", priority: "low" as const,      status: "open" as const,        labels: [{ name: "docs", color: "#9ca3af" }],                                           comments: 1,  createdAt: "3 weeks ago",   assignees: ["diana"] },
  { id: 10, number: 122, title: "Fix broken anchor links in API reference page",                   repo: "wizdev-docs",author: "eric",    avatar: "E", priority: "low" as const,      status: "resolved" as const,    labels: [{ name: "docs", color: "#9ca3af" }, { name: "bug", color: "#fb7185" }],       comments: 3,  createdAt: "1 month ago",   assignees: [] },
];

const priorityConfig = {
  critical: { label: "Critical", bg: "rgba(251,113,133,0.15)", color: "#fb7185",  border: "rgba(251,113,133,0.30)", dot: "#fb7185" },
  high:     { label: "High",     bg: "rgba(251,191,36,0.12)",  color: "#fbbf24",  border: "rgba(251,191,36,0.25)", dot: "#fbbf24" },
  medium:   { label: "Medium",   bg: "rgba(124,109,250,0.12)", color: "#c4bcff",  border: "rgba(124,109,250,0.25)", dot: "#9d91fc" },
  low:      { label: "Low",      bg: "rgba(255,255,255,0.06)", color: "#9ba3b5",  border: "rgba(255,255,255,0.10)", dot: "#5a6278" },
};

const statusConfig = {
  open:        { label: "Open",        icon: Bug,          color: "#22d3ee" },
  in_progress: { label: "In Progress", icon: Clock,        color: "#fbbf24" },
  resolved:    { label: "Resolved",    icon: CheckCircle2, color: "#10d98e" },
};

const avatarGradients = [
  "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
  "linear-gradient(135deg, #10d98e, #059669)",
  "linear-gradient(135deg, #fbbf24, #d97706)",
  "linear-gradient(135deg, #22d3ee, #0891b2)",
  "linear-gradient(135deg, #f472b6, #db2777)",
];

export default function IssuesPage() {
  const [search, setSearch]       = useState("");
  const [priority, setPriority]   = useState("all");
  const [statusFilter, setStatus] = useState("all");
  const [repo, setRepo]           = useState("all");

  const filtered = ALL_ISSUES.filter((issue) => {
    const mSearch   = issue.title.toLowerCase().includes(search.toLowerCase()) || `#${issue.number}`.includes(search);
    const mPriority = priority === "all" || issue.priority === priority;
    const mStatus   = statusFilter === "all" || issue.status === statusFilter;
    const mRepo     = repo === "all" || issue.repo === repo;
    return mSearch && mPriority && mStatus && mRepo;
  });

  const repos = [...new Set(ALL_ISSUES.map(i => i.repo))];

  const summaryStats = [
    { label: "Total Open",    value: ALL_ISSUES.filter(i => i.status !== "resolved").length, color: "#22d3ee" },
    { label: "Critical",      value: ALL_ISSUES.filter(i => i.priority === "critical").length, color: "#fb7185" },
    { label: "In Progress",   value: ALL_ISSUES.filter(i => i.status === "in_progress").length, color: "#fbbf24" },
    { label: "Resolved",      value: ALL_ISSUES.filter(i => i.status === "resolved").length, color: "#10d98e" },
  ];

  return (
    <AppShell>
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Issues</h1>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">Track bugs, tasks and feature requests across repositories</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)", boxShadow: "0 2px 8px rgba(124,109,250,0.4)" }}>
          <Bug className="w-4 h-4" />
          New Issue
        </button>
      </div>

      {/* ── Summary Stats ───────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((s) => (
          <div key={s.label} className="stat-card">
            <p className="text-2xl font-extrabold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-semibold text-[var(--text-primary)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ─────────────────────────────────── */}
      <div className="card p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 h-9 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search issues..."
              className="flex-1 bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none" />
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-2 px-3 h-9 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <AlertTriangle className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="bg-transparent text-xs text-[var(--text-secondary)] focus:outline-none cursor-pointer">
              <option value="all">All priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 px-3 h-9 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Filter className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <select value={statusFilter} onChange={e => setStatus(e.target.value)}
              className="bg-transparent text-xs text-[var(--text-secondary)] focus:outline-none cursor-pointer">
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>

          {/* Repo filter */}
          <div className="flex items-center gap-2 px-3 h-9 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <select value={repo} onChange={e => setRepo(e.target.value)}
              className="bg-transparent text-xs text-[var(--text-secondary)] focus:outline-none cursor-pointer">
              <option value="all">All repos</option>
              {repos.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>

          <span className="text-[11px] text-[var(--text-tertiary)] ml-auto">{filtered.length} issue{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Issue List ──────────────────────────────── */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <TrendingDown className="w-10 h-10 mx-auto mb-3 text-[var(--text-disabled)]" strokeWidth={1} />
            <p className="text-sm text-[var(--text-tertiary)]">No issues match your filters</p>
          </div>
        ) : filtered.map((issue, idx) => {
          const prio   = priorityConfig[issue.priority];
          const stat   = statusConfig[issue.status];
          const StatIcon = stat.icon;
          return (
            <div key={issue.id} className="card p-4 lg:p-5 cursor-pointer group"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,109,250,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; }}
            >
              <div className="flex items-start gap-4">
                {/* Priority dot */}
                <div className="mt-1 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full block" style={{ background: prio.dot, boxShadow: `0 0 6px ${prio.dot}80` }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[11px] font-bold shrink-0" style={{ color: "#9d91fc" }}>#{issue.number}</span>
                        <h3 className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors line-clamp-1">{issue.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] flex-wrap">
                        <span className="font-mono px-1.5 py-0.5 rounded border text-[var(--text-secondary)]"
                          style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>{issue.repo}</span>
                        <span>by <strong className="text-[var(--text-secondary)]">@{issue.author}</strong></span>
                        <span>{issue.createdAt}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" strokeWidth={1.5} />{issue.comments}</span>
                        {issue.assignees.length > 0 && (
                          <span className="flex items-center gap-1">
                            <div className="flex -space-x-1">
                              {issue.assignees.slice(0,3).map((a, i) => (
                                <div key={a} className="w-4 h-4 rounded-full border border-[var(--surface-card)] flex items-center justify-center text-[8px] font-bold text-white"
                                  style={{ background: avatarGradients[i % avatarGradients.length] }}>{a[0].toUpperCase()}</div>
                              ))}
                            </div>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {issue.labels.map(l => (
                        <span key={l.name} className="hidden sm:block px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border"
                          style={{ background: `${l.color}18`, color: l.color, borderColor: `${l.color}30` }}>{l.name}</span>
                      ))}
                      <span className="px-2 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1 whitespace-nowrap"
                        style={{ background: prio.bg, color: prio.color, borderColor: prio.border }}>
                        {prio.label}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold"
                        style={{ color: stat.color }}>
                        <StatIcon className="w-3 h-3" strokeWidth={2} />
                        <span className="hidden sm:inline">{stat.label}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-tertiary)]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
