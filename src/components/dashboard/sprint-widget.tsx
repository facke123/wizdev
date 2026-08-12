"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CalendarDays, ArrowRight, CheckCircle2, AlertTriangle, Layers } from "lucide-react";

export function SprintWidget() {
  const { t } = useLanguage();

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
            style={{
              background: "rgba(124,109,250,0.12)",
              border: "1px solid rgba(124,109,250,0.25)",
            }}
          >
            <CalendarDays className="w-4 h-4 text-[#a78bfa]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-white tracking-tight truncate">
              {t("planning.sprint")}
            </h2>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5 truncate">
              Q1 Milestone · 68% Completed
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

      {/* ── Progress Bar ────────────────────────────── */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-[var(--text-tertiary)]">Overall Sprint Health</span>
          <span className="text-white font-bold">17 / 25 Tasks (42 pts)</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: "68%",
              background: "linear-gradient(90deg, #7c6dfa, #22d3ee)",
              boxShadow: "0 0 10px rgba(124,109,250,0.4)",
            }}
          />
        </div>
      </div>

      {/* ── Mini Milestones List ────────────────────── */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-[#10d98e] shrink-0" />
            <span className="text-white font-medium truncate">AI Executive Copilot Synthesis</span>
          </div>
          <span className="text-[10px] font-mono text-[#10d98e] bg-[#10d98e]/10 px-2 py-0.5 rounded shrink-0">
            Done
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Layers className="w-4 h-4 text-[#22d3ee] shrink-0 animate-spin" />
            <span className="text-white font-medium truncate">OAuth2 SSO PKCE Auth Server</span>
          </div>
          <span className="text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded shrink-0">
            In Review
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle className="w-4 h-4 text-[#fb7185] shrink-0" />
            <span className="text-white font-medium truncate">Multi-Region K8s Deployment</span>
          </div>
          <span className="text-[10px] font-mono text-[#fb7185] bg-[#fb7185]/10 px-2 py-0.5 rounded shrink-0">
            At Risk
          </span>
        </div>
      </div>
    </div>
  );
}
