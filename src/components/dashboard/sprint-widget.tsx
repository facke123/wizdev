"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CalendarDays, ArrowRight, CheckCircle2, AlertTriangle, Layers, ExternalLink } from "lucide-react";
import { useGitHubMilestones } from "@/hooks/use-github";
import type { GitHubMilestone } from "@/hooks/use-github";
import { Skeleton, ErrorState, DemoBanner } from "@/components/ui/skeleton";

const MILESTONE_COLORS = ["#7c6dfa", "#22d3ee", "#10d98e", "#fbbf24"];

function MilestoneStatusIcon({ progress }: { progress: number }) {
  if (progress >= 80) return <CheckCircle2 className="w-4 h-4 text-[#10d98e] shrink-0" />;
  if (progress >= 40) return <Layers className="w-4 h-4 text-[#22d3ee] shrink-0 animate-spin" />;
  return <AlertTriangle className="w-4 h-4 text-[#fb7185] shrink-0" />;
}

function MilestoneStatusBadge({ progress }: { progress: number }) {
  if (progress >= 80) return <span className="text-[10px] font-mono text-[#10d98e] bg-[#10d98e]/10 px-2 py-0.5 rounded shrink-0">On Track</span>;
  if (progress >= 40) return <span className="text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded shrink-0">In Progress</span>;
  return <span className="text-[10px] font-mono text-[#fb7185] bg-[#fb7185]/10 px-2 py-0.5 rounded shrink-0">At Risk</span>;
}

export function SprintWidget() {
  const { t } = useLanguage();
  const { data: milestones, loading, error, refresh } = useGitHubMilestones();

  // Use first milestone as the primary sprint
  const primary = milestones?.[0];
  const isDemo = !loading && !error && milestones?.some((m) => m.url === "#");

  return (
    <div
      className="card p-5 space-y-4"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0"
            style={{ background: "rgba(124,109,250,0.12)", border: "1px solid rgba(124,109,250,0.25)" }}
          >
            <CalendarDays className="w-4 h-4 text-[#a78bfa]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-white tracking-tight truncate">
              {loading ? t("planning.sprint") : (primary?.title ?? t("planning.sprint"))}
            </h2>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5 truncate">
              {loading ? "Loading..." : primary ? `${primary.repo} · ${primary.progressPct}% Completed` : "No open milestones"}
            </p>
          </div>
        </div>

        <a
          href="/planning"
          className="flex items-center gap-1 text-xs font-bold text-[#a78bfa] hover:text-white transition-colors shrink-0"
        >
          <span>{t("prs.viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {isDemo && <DemoBanner />}

      {/* ── Error ────────────────────────────────────── */}
      {error && <ErrorState message={error} onRetry={refresh} />}

      {/* ── Loading ──────────────────────────────────── */}
      {loading && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-2 flex-1">
                  <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                  <Skeleton className="h-3 flex-1" />
                </div>
                <Skeleton className="w-16 h-5 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Progress Bar (primary milestone) ─────────── */}
      {!loading && !error && primary && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[var(--text-tertiary)]">Overall Sprint Health</span>
            <span className="text-white font-bold">
              {primary.closedIssues} / {primary.totalIssues} Issues ({primary.progressPct}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${primary.progressPct}%`,
                background: "linear-gradient(90deg, #7c6dfa, #22d3ee)",
                boxShadow: "0 0 10px rgba(124,109,250,0.4)",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Milestones List ──────────────────────────── */}
      {!loading && !error && milestones && milestones.length > 0 && (
        <div className="space-y-2 pt-1">
          {milestones.map((m: GitHubMilestone, i: number) => (
            <a
              key={m.id}
              href={m.url !== "#" ? m.url : undefined}
              target={m.url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs transition-all hover:bg-white/[0.04] hover:border-white/[0.09] group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MilestoneStatusIcon progress={m.progressPct} />
                <div className="min-w-0">
                  <span className="text-white font-medium truncate block">{m.title}</span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] truncate block"
                    style={{ color: MILESTONE_COLORS[i % MILESTONE_COLORS.length] }}>
                    {m.repo}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <MilestoneStatusBadge progress={m.progressPct} />
                {m.url !== "#" && (
                  <ExternalLink className="w-3 h-3 text-[var(--text-disabled)] group-hover:text-[var(--text-secondary)] transition-colors" />
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────── */}
      {!loading && !error && milestones && milestones.length === 0 && (
        <div className="py-4 text-center">
          <p className="text-[12px] text-[var(--text-tertiary)]">No open milestones found</p>
          <p className="text-[10px] text-[var(--text-disabled)] mt-1">Create milestones in your GitHub repos to see sprint progress</p>
        </div>
      )}
    </div>
  );
}
