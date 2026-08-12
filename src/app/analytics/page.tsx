"use client";

import { AppShell } from "@/components/layout/app-shell";
import { TrendingUp, GitCommit, GitMerge, Clock, Star, BarChart3, Users, Activity } from "lucide-react";

const WEEKLY_DATA = [
  { week: "Jun W3", commits: 68, prs: 14, reviews: 22, releases: 1 },
  { week: "Jun W4", commits: 82, prs: 18, reviews: 29, releases: 0 },
  { week: "Jul W1", commits: 55, prs: 11, reviews: 17, releases: 1 },
  { week: "Jul W2", commits: 94, prs: 21, reviews: 35, releases: 2 },
  { week: "Jul W3", commits: 71, prs: 16, reviews: 24, releases: 0 },
  { week: "Jul W4", commits: 110, prs: 24, reviews: 40, releases: 1 },
  { week: "Aug W1", commits: 84, prs: 21, reviews: 35, releases: 1 },
];

const CONTRIBUTORS = [
  { name: "alice",   commits: 142, prs: 28, reviews: 54, score: 98 },
  { name: "bob",     commits: 98,  prs: 19, reviews: 41, score: 87 },
  { name: "charlie", commits: 76,  prs: 15, reviews: 33, score: 79 },
  { name: "diana",   commits: 61,  prs: 12, reviews: 28, score: 71 },
  { name: "eric",    commits: 47,  prs: 8,  reviews: 19, score: 62 },
];

const REPO_HEALTH = [
  { repo: "wizdev-app",  prs: 5,  ci: 94, score: 92, trend: "up"   },
  { repo: "wizdev-api",  prs: 4,  ci: 78, score: 74, trend: "down" },
  { repo: "wizdev-docs", prs: 1,  ci: 100,score: 96, trend: "up"   },
];

const maxCommits = Math.max(...WEEKLY_DATA.map(d => d.commits));
const avatarGradients = [
  "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
  "linear-gradient(135deg, #10d98e, #059669)",
  "linear-gradient(135deg, #fbbf24, #d97706)",
  "linear-gradient(135deg, #22d3ee, #0891b2)",
  "linear-gradient(135deg, #f472b6, #db2777)",
];

export default function AnalyticsPage() {
  const totalCommits  = WEEKLY_DATA.reduce((s, d) => s + d.commits, 0);
  const totalPRs      = WEEKLY_DATA.reduce((s, d) => s + d.prs, 0);
  const totalReviews  = WEEKLY_DATA.reduce((s, d) => s + d.reviews, 0);
  const totalReleases = WEEKLY_DATA.reduce((s, d) => s + d.releases, 0);

  return (
    <AppShell>
      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Analytics</h1>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">Engineering velocity and team performance over the last 4 weeks</p>
      </div>

      {/* ── KPI Row ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Commits",  value: totalCommits,  color: "#7c6dfa", icon: GitCommit,  change: "+14%" },
          { label: "PRs Merged",     value: totalPRs,      color: "#22d3ee", icon: GitMerge,   change: "+8%"  },
          { label: "Code Reviews",   value: totalReviews,  color: "#10d98e", icon: Activity,   change: "+21%" },
          { label: "Releases",       value: totalReleases, color: "#fbbf24", icon: Star,        change: "+0%"  },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl" style={{ background: `${k.color}18`, border: `1px solid ${k.color}28` }}>
                  <Icon className="w-4 h-4" style={{ color: k.color }} strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(16,217,142,0.10)", color: "#10d98e", border: "1px solid rgba(16,217,142,0.22)" }}>
                  {k.change}
                </span>
              </div>
              <p className="text-3xl font-extrabold font-mono" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1 font-medium">{k.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ── Velocity Chart ───────────────────────── */}
        <div className="xl:col-span-8 card p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl" style={{ background: "rgba(124,109,250,0.12)", border: "1px solid rgba(124,109,250,0.22)" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "#9d91fc" }} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">4-Week Velocity Trend</h2>
              <p className="text-[11px] text-[var(--text-tertiary)]">Commits per week across all repositories</p>
            </div>
            <div className="ml-auto flex items-center gap-3 text-[11px]">
              {[
                { label: "Commits", color: "#7c6dfa" },
                { label: "PRs",     color: "#22d3ee" },
                { label: "Reviews", color: "#10d98e" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 4px ${s.color}` }} />
                  <span className="text-[var(--text-secondary)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-xl p-4" style={{ background: "rgba(7,11,20,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-end gap-2 h-48">
              {WEEKLY_DATA.map((d, i) => (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end justify-center gap-0.5 h-40">
                    {[
                      { val: d.commits, color: "#7c6dfa", max: maxCommits },
                      { val: d.prs * 3, color: "#22d3ee", max: maxCommits },
                      { val: d.reviews * 2, color: "#10d98e", max: maxCommits },
                    ].map((bar, bi) => (
                      <div key={bi}
                        className="flex-1 rounded-t-[3px] min-w-0 origin-bottom"
                        style={{
                          maxWidth: 14,
                          height: `${Math.max((bar.val / bar.max) * 100, 3)}%`,
                          background: `linear-gradient(to top, ${bar.color}bb, ${bar.color})`,
                          animation: `barGrow 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05 + bi * 0.03}s both`,
                          transition: "filter 0.15s",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.35)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = "none"; }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-[var(--text-disabled)] text-center leading-tight">{d.week.replace(" ","<br/>")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Repo Health ──────────────────────────── */}
        <div className="xl:col-span-4 card p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl" style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.18)" }}>
              <BarChart3 className="w-4 h-4" style={{ color: "#22d3ee" }} strokeWidth={1.75} />
            </div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Repo Health Scores</h2>
          </div>
          <div className="space-y-4">
            {REPO_HEALTH.map((r) => {
              const scoreColor = r.score >= 90 ? "#10d98e" : r.score >= 75 ? "#fbbf24" : "#fb7185";
              return (
                <div key={r.repo}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-semibold font-mono text-[var(--text-primary)]">{r.repo}</span>
                    <span className="text-[12px] font-bold font-mono" style={{ color: scoreColor }}>{r.score}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${r.score}%`, background: `linear-gradient(90deg, ${scoreColor}99, ${scoreColor})`, transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)]">
                    <span>{r.prs} open PRs</span>
                    <span>{r.ci}% CI pass</span>
                    <span className={`flex items-center gap-0.5 ${r.trend === "up" ? "text-[#10d98e]" : "text-[#fb7185]"}`}>
                      {r.trend === "up" ? "↑" : "↓"} trend
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Contributors Leaderboard ─────────────────── */}
      <div className="mt-6 card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl" style={{ background: "rgba(251,191,36,0.10)", border: "1px solid rgba(251,191,36,0.18)" }}>
            <Users className="w-4 h-4" style={{ color: "#fbbf24" }} strokeWidth={1.75} />
          </div>
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Top Contributors</h2>
          <span className="text-[11px] text-[var(--text-tertiary)]">Last 4 weeks</span>
        </div>
        <div className="space-y-3">
          {CONTRIBUTORS.map((c, i) => (
            <div key={c.name} className="flex items-center gap-4 p-3 rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}>
              <span className="text-sm font-bold text-[var(--text-disabled)] w-5 text-center shrink-0">#{i+1}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                style={{ background: avatarGradients[i % avatarGradients.length] }}>
                {c.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[var(--text-primary)]">@{c.name}</p>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)] mt-0.5">
                  <span><span className="font-bold text-[var(--text-secondary)]">{c.commits}</span> commits</span>
                  <span><span className="font-bold text-[var(--text-secondary)]">{c.prs}</span> PRs</span>
                  <span><span className="font-bold text-[var(--text-secondary)]">{c.reviews}</span> reviews</span>
                </div>
              </div>
              <div className="shrink-0">
                <div className="text-right mb-1">
                  <span className="text-[13px] font-bold font-mono" style={{ color: i === 0 ? "#fbbf24" : "var(--text-primary)" }}>
                    {c.score}
                  </span>
                </div>
                <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: i === 0 ? "#fbbf24" : "#7c6dfa" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
