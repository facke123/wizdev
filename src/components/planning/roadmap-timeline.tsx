"use client";

import { useState } from "react";
import { Flag, CheckCircle2, Clock, AlertCircle, ArrowUpRight, ChevronRight, User } from "lucide-react";

interface EpicMilestone {
  id: string;
  epic: string;
  repo: string;
  owner: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  progress: number;
  status: "completed" | "in_progress" | "at_risk" | "planned";
  targetDate: string;
  storyPoints: number;
  tags: string[];
}

const mockMilestones: EpicMilestone[] = [
  {
    id: "epic-1",
    epic: "v2.0 AI Executive Copilot & Daily Synthesis Engine",
    repo: "wizdev-core",
    owner: "Alex Rivera",
    quarter: "Q1",
    progress: 85,
    status: "in_progress",
    targetDate: "2026-03-31",
    storyPoints: 21,
    tags: ["AI/LLM", "Core Architecture", "High Priority"],
  },
  {
    id: "epic-2",
    epic: "Multi-Region Kubernetes Deployment & Edge Routing",
    repo: "wizdev-infra",
    owner: "Chen Wei",
    quarter: "Q1",
    progress: 40,
    status: "at_risk",
    targetDate: "2026-03-15",
    storyPoints: 13,
    tags: ["DevOps", "Infrastructure", "Blocker Risk"],
  },
  {
    id: "epic-3",
    epic: "Enterprise OAuth2 SSO, SAML & Audit Log System",
    repo: "wizdev-api",
    owner: "Sarah Jenkins",
    quarter: "Q2",
    progress: 15,
    status: "planned",
    targetDate: "2026-05-30",
    storyPoints: 18,
    tags: ["Security", "Compliance"],
  },
  {
    id: "epic-4",
    epic: "Real-time Telemetry Dashboard & Trace Visualization",
    repo: "wizdev-ui",
    owner: "Kenji Sato",
    quarter: "Q2",
    progress: 0,
    status: "planned",
    targetDate: "2026-06-30",
    storyPoints: 15,
    tags: ["Frontend", "Analytics"],
  },
  {
    id: "epic-5",
    epic: "Automated Code Review Bot & Security Vulnerability Scanner",
    repo: "wizdev-bot",
    owner: "Alex Rivera",
    quarter: "Q3",
    progress: 100,
    status: "completed",
    targetDate: "2026-02-10",
    storyPoints: 12,
    tags: ["AI/LLM", "Security"],
  },
];

const statusBadgeStyles = {
  completed: {
    bg: "rgba(16,217,142,0.12)",
    border: "1px solid rgba(16,217,142,0.3)",
    color: "#10d98e",
    label: "Completed",
    icon: CheckCircle2,
  },
  in_progress: {
    bg: "rgba(34,211,238,0.12)",
    border: "1px solid rgba(34,211,238,0.3)",
    color: "#22d3ee",
    label: "In Progress",
    icon: Clock,
  },
  at_risk: {
    bg: "rgba(251,113,133,0.15)",
    border: "1px solid rgba(251,113,133,0.35)",
    color: "#fb7185",
    label: "At Risk",
    icon: AlertCircle,
  },
  planned: {
    bg: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "var(--text-tertiary)",
    label: "Planned",
    icon: Flag,
  },
};

export function RoadmapTimeline() {
  const [selectedQuarter, setSelectedQuarter] = useState<string>("ALL");

  const filtered = selectedQuarter === "ALL"
    ? mockMilestones
    : mockMilestones.filter((m) => m.quarter === selectedQuarter);

  return (
    <div
      className="p-5 rounded-2xl space-y-5"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Toolbar & Quarter Filter ─────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Flag className="w-4 h-4 text-[#7c6dfa]" />
            <span>2026 Product Milestone Roadmap</span>
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            Quarterly engineering epics, dependencies & release milestones
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.08] shrink-0">
          {["ALL", "Q1", "Q2", "Q3", "Q4"].map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQuarter(q)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedQuarter === q
                  ? "bg-[#7c6dfa] text-white shadow-lg shadow-[#7c6dfa]/30"
                  : "text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* ── Timeline Grid ─────────────────────────────── */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const badge = statusBadgeStyles[item.status];
          const BadgeIcon = badge.icon;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl transition-all duration-200 group hover:border-white/20"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Epic Name & Info */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        background: "rgba(124,109,250,0.15)",
                        color: "#a78bfa",
                        border: "1px solid rgba(124,109,250,0.25)",
                      }}
                    >
                      {item.quarter} Milestone
                    </span>

                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1"
                      style={{
                        background: badge.bg,
                        border: badge.border,
                        color: badge.color,
                      }}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>

                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-medium"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--text-tertiary)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-[#7c6dfa] transition-colors">
                    {item.epic}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)] font-mono">
                    <span>Repo: <strong className="text-[var(--text-secondary)]">{item.repo}</strong></span>
                    <span>Target: <strong className="text-[var(--text-secondary)]">{item.targetDate}</strong></span>
                    <span>Points: <strong className="text-[var(--text-secondary)]">{item.storyPoints} pts</strong></span>
                  </div>
                </div>

                {/* Progress Bar & Owner Avatar */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="w-36 space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[var(--text-tertiary)]">Progress</span>
                      <span className="font-bold text-white">{item.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${item.progress}%`,
                          background:
                            item.status === "completed"
                              ? "#10d98e"
                              : item.status === "at_risk"
                              ? "#fb7185"
                              : "linear-gradient(90deg, #7c6dfa, #22d3ee)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <div className="w-7 h-7 rounded-full bg-[#7c6dfa]/20 border border-[#7c6dfa]/40 flex items-center justify-center text-xs font-bold text-[#a78bfa]">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] font-medium hidden sm:inline">
                      {item.owner}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
