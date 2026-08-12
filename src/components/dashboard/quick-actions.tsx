"use client";

import { FileText, BarChart3, ShieldAlert, GitBranch, ArrowRight, Sparkles } from "lucide-react";

const actions = [
  {
    icon: FileText,
    label: "Generate Standup Report",
    description: "AI compiles your daily standup notes",
    color: "#7c6dfa",
  },
  {
    icon: BarChart3,
    label: "Weekly Velocity Summary",
    description: "Executive summary of team progress",
    color: "#22d3ee",
  },
  {
    icon: ShieldAlert,
    label: "PR Risk Assessment",
    description: "AI analyzes high-risk code changes",
    color: "#fbbf24",
  },
  {
    icon: GitBranch,
    label: "Stale Branch Cleanup",
    description: "Identify inactive branches & issues",
    color: "#10d98e",
  },
];

export function QuickActions() {
  return (
    <div
      className="card p-5 relative overflow-visible"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top right floating bot badge with notification '1' */}
      <div
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-lg border border-white/20 z-10 cursor-pointer hover:scale-110 transition-transform"
        style={{
          background: "linear-gradient(135deg, rgba(124,109,250,0.8), rgba(34,211,238,0.7))",
          boxShadow: "0 4px 14px rgba(124,109,250,0.4)",
        }}
      >
        🤖
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center border border-[#070b14]">
          1
        </span>
      </div>

      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-2 rounded-xl"
          style={{
            background: "rgba(124,109,250,0.12)",
            border: "1px solid rgba(124,109,250,0.22)",
          }}
        >
          <Sparkles
            className="w-[17px] h-[17px]"
            style={{ color: "#9d91fc" }}
            strokeWidth={1.75}
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            AI Copilot
          </h2>
          <p className="text-[11px] text-[var(--text-tertiary)]">
            One-click automation
          </p>
        </div>
      </div>

      {/* ── Action Buttons ──────────────────────────── */}
      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 text-left group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${action.color}0a`;
                el.style.borderColor = `${action.color}28`;
                el.style.transform = "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.borderColor = "rgba(255,255,255,0.05)";
                el.style.transform = "translateX(0)";
              }}
            >
              <div
                className="p-1.5 rounded-lg flex-shrink-0 transition-transform duration-150 group-hover:scale-110"
                style={{ background: `${action.color}18` }}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: action.color }}
                  strokeWidth={1.75}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors truncate">
                  {action.label}
                </p>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5 truncate">
                  {action.description}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <ArrowRight
                  className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-white transition-all group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Bottom Hint ─────────────────────────────── */}
      <div
        className="mt-3.5 pt-3 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-[10px] text-[var(--text-disabled)]">
          Press{" "}
          <kbd
            className="px-1.5 py-0.5 rounded font-mono text-[10px]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-tertiary)",
            }}
          >
            ⌘J
          </kbd>{" "}
          to open command palette
        </p>
      </div>
    </div>
  );
}
