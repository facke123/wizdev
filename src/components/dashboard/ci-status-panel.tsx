"use client";

import { CheckCircle2, XCircle, Loader2, ExternalLink, Zap, Ban } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useGitHubWorkflows } from "@/hooks/use-github";
import type { GitHubWorkflow } from "@/hooks/use-github";
import { Skeleton, ErrorState, DemoBanner } from "@/components/ui/skeleton";

const statusStyles = {
  success:   { Icon: CheckCircle2, iconColor: "#10d98e", label: "Passed",    color: "#10d98e" },
  failure:   { Icon: XCircle,      iconColor: "#fb7185", label: "Failed",    color: "#fb7185" },
  building:  { Icon: Loader2,      iconColor: "#fbbf24", label: "Building",  color: "#fbbf24", spin: true },
  cancelled: { Icon: Ban,          iconColor: "#5a6278", label: "Cancelled", color: "#5a6278" },
};

export function CIStatusPanel() {
  const { t } = useLanguage();
  const { data: workflows, loading, error, refresh } = useGitHubWorkflows();

  const passingCount = workflows?.filter((w: GitHubWorkflow) => w.status === "success").length ?? 0;
  const totalCount = workflows?.length ?? 1;
  const healthPercent = totalCount > 0 ? Math.round((passingCount / totalCount) * 100) : 100;
  const healthColor = healthPercent >= 80 ? "#10d98e" : healthPercent >= 60 ? "#fbbf24" : "#fb7185";
  const healthLabel = healthPercent >= 80 ? t("ci.healthy") : healthPercent >= 60 ? "Degraded" : "Critical";

  const isDemo = !loading && !error && workflows?.some((w: GitHubWorkflow) => w.url === "#");

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
            style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.22)" }}
          >
            <Zap className="w-4 h-4 text-[var(--brand-cyan)]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-white tracking-tight truncate">
              {t("ci.title")}
            </h2>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5 truncate">
              {t("ci.sub")}
            </p>
          </div>
        </div>

        {/* Health badge */}
        {!loading && (
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 whitespace-nowrap"
            style={{
              background: `${healthColor}12`,
              border: `1px solid ${healthColor}25`,
              color: healthColor,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: healthColor }} />
            {healthLabel}
          </div>
        )}
      </div>

      {isDemo && <DemoBanner />}

      {/* Health progress bar */}
      {!loading && (
        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${healthPercent}%`,
              background: `linear-gradient(90deg, ${healthColor}, #22d3ee)`,
              boxShadow: `0 0 8px ${healthColor}80`,
            }}
          />
        </div>
      )}

      {/* ── Loading ──────────────────────────────────── */}
      {loading && (
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="p-2.5 rounded-xl flex items-center justify-between gap-3"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2.5 flex-1">
                <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
              </div>
              <Skeleton className="w-14 h-7 shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* ── Error ────────────────────────────────────── */}
      {error && <ErrorState message={error} onRetry={refresh} />}

      {/* ── Workflow List ───────────────────────────── */}
      {!loading && !error && workflows && (
        <div className="space-y-2">
          {workflows.map((workflow: GitHubWorkflow) => {
            const style = statusStyles[workflow.status] ?? statusStyles.building;
            const StatusIcon = style.Icon;
            return (
              <a
                key={workflow.id}
                href={workflow.url !== "#" ? workflow.url : undefined}
                target={workflow.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
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
              </a>
            );
          })}
        </div>
      )}

      {/* ── Footer Link ────────────────────────────── */}
      <a
        href="/ci"
        className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all shrink-0 whitespace-nowrap text-[var(--text-secondary)] hover:text-white"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="whitespace-nowrap">{t("ci.viewAll")}</span>
        <ExternalLink className="w-3 h-3 shrink-0" strokeWidth={1.75} />
      </a>
    </div>
  );
}
