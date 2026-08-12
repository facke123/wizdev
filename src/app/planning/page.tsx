"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PlanningHeader } from "@/components/planning/planning-header";
import { RoadmapTimeline } from "@/components/planning/roadmap-timeline";
import { SprintKanban } from "@/components/planning/sprint-kanban";
import { AiAutoPlanner } from "@/components/planning/ai-autoplanner";
import { BurndownChart } from "@/components/planning/burndown-chart";
import { useLanguage } from "@/lib/i18n/context";
import { Map, Kanban, Sparkles, TrendingDown } from "lucide-react";

export default function PlanningPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"kanban" | "roadmap" | "ai" | "burndown">("kanban");

  return (
    <AppShell>
      <div className="space-y-6">
        {/* ── Top Metric Header ───────────────────────── */}
        <PlanningHeader
          onNewTask={() => setActiveTab("kanban")}
          onAiPlannerClick={() => setActiveTab("ai")}
        />

        {/* ── Tab Switcher ────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "kanban"
                ? "bg-[#7c6dfa] text-white shadow-lg shadow-[#7c6dfa]/30"
                : "text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>{t("planning.tabs.kanban")}</span>
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "roadmap"
                ? "bg-[#7c6dfa] text-white shadow-lg shadow-[#7c6dfa]/30"
                : "text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Map className="w-4 h-4" />
            <span>{t("planning.tabs.roadmap")}</span>
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "ai"
                ? "bg-gradient-to-r from-[#7c6dfa] to-[#22d3ee] text-white shadow-lg shadow-[#7c6dfa]/30"
                : "text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#22d3ee]" />
            <span>{t("planning.tabs.aiPlanner")}</span>
          </button>

          <button
            onClick={() => setActiveTab("burndown")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "burndown"
                ? "bg-[#7c6dfa] text-white shadow-lg shadow-[#7c6dfa]/30"
                : "text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <TrendingDown className="w-4 h-4 text-[#10d98e]" />
            <span>{t("planning.tabs.burndown")}</span>
          </button>
        </div>

        {/* ── Active Tab View Content ─────────────────── */}
        <div>
          {activeTab === "kanban" && <SprintKanban />}
          {activeTab === "roadmap" && <RoadmapTimeline />}
          {activeTab === "ai" && <AiAutoPlanner />}
          {activeTab === "burndown" && <BurndownChart />}
        </div>
      </div>
    </AppShell>
  );
}
