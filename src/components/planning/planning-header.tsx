"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Sparkles, Plus, Layers, AlertTriangle, Users, CheckCircle2 } from "lucide-react";

interface PlanningHeaderProps {
  onNewTask: () => void;
  onAiPlannerClick: () => void;
}

export function PlanningHeader({ onNewTask, onAiPlannerClick }: PlanningHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* ── Title Banner ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {t("planning.title")}
            </h1>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0"
              style={{
                background: "rgba(124,109,250,0.15)",
                border: "1px solid rgba(124,109,250,0.3)",
                color: "#a78bfa",
              }}
            >
              {t("planning.sprint")}
            </span>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            {t("planning.subtitle")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onAiPlannerClick}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, rgba(124,109,250,0.25) 0%, rgba(34,211,238,0.2) 100%)",
              border: "1px solid rgba(124,109,250,0.4)",
              color: "#ffffff",
              boxShadow: "0 0 16px rgba(124,109,250,0.2)",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#22d3ee] animate-pulse" />
            <span>{t("planning.aiBreakdownBtn")}</span>
          </button>

          <button
            onClick={onNewTask}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5b4fdf 100%)",
              boxShadow: "0 2px 10px rgba(124,109,250,0.35)",
            }}
          >
            <Plus className="w-4 h-4" />
            <span>{t("planning.newTask")}</span>
          </button>
        </div>
      </div>

      {/* ── Key Metrics Overview Cards ────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1: Sprint Progress */}
        <div
          className="p-3.5 rounded-xl space-y-1.5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-medium">
            <span>{t("planning.metrics.progress")}</span>
            <CheckCircle2 className="w-4 h-4 text-[#10d98e]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-white tracking-tight">68%</span>
            <span className="text-[11px] font-mono text-[#10d98e]">17 / 25 Tasks</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10 mt-1">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: "68%",
                background: "linear-gradient(90deg, #10d98e, #22d3ee)",
              }}
            />
          </div>
        </div>

        {/* Metric 2: Total Story Points */}
        <div
          className="p-3.5 rounded-xl space-y-1.5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-medium">
            <span>{t("planning.metrics.storyPoints")}</span>
            <Layers className="w-4 h-4 text-[#7c6dfa]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-white tracking-tight">42 pts</span>
            <span className="text-[11px] font-mono text-[#7c6dfa]">84% Capacity</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10 mt-1">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: "84%",
                background: "linear-gradient(90deg, #7c6dfa, #a78bfa)",
              }}
            />
          </div>
        </div>

        {/* Metric 3: At Risk Tasks */}
        <div
          className="p-3.5 rounded-xl space-y-1.5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-medium">
            <span>{t("planning.metrics.atRisk")}</span>
            <AlertTriangle className="w-4 h-4 text-[#fb7185]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-[#fb7185] tracking-tight">2 Tasks</span>
            <span className="text-[11px] font-mono text-[#fb7185]">Blocker Risk</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10 mt-1">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: "25%",
                background: "#fb7185",
              }}
            />
          </div>
        </div>

        {/* Metric 4: Team Capacity */}
        <div
          className="p-3.5 rounded-xl space-y-1.5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-medium">
            <span>{t("planning.metrics.teamCapacity")}</span>
            <Users className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-white tracking-tight">5 Devs</span>
            <span className="text-[11px] font-mono text-[#38bdf8]">8 pts / dev avg</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10 mt-1">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: "75%",
                background: "#38bdf8",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
