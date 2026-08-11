"use client";

import { FileText, BarChart3, ShieldAlert, Trash2 } from "lucide-react";

const actions = [
  {
    icon: FileText,
    label: "Generate Standup Report",
    description: "AI compiles your daily standup notes",
    accent: "#635bff",
  },
  {
    icon: BarChart3,
    label: "Weekly Velocity Summary",
    description: "Generate executive summary of progress",
    accent: "#00d4ff",
  },
  {
    icon: ShieldAlert,
    label: "PR Risk Assessment",
    description: "AI analyzes high-risk code changes",
    accent: "#f5a623",
  },
  {
    icon: Trash2,
    label: "Stale Branch Cleanup",
    description: "Identify inactive branches and issues",
    accent: "#00d97e",
  },
];

export function QuickActions() {
  return (
    <div className="card p-5 lg:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06]">
          <div className="p-2 rounded-lg bg-[var(--color-accent-muted)] border border-[var(--color-accent-border)]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-accent-hover)]"
            >
              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight truncate">
              AI Copilot
            </h2>
            <p className="text-[11px] text-[var(--text-tertiary)] truncate">
              One-click automation
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-[var(--surface-base)]/60 border border-white/[0.05] hover:border-[var(--color-accent-border)] hover:bg-[var(--surface-base)] transition-all duration-150 text-left group"
              >
                <div
                  className="p-1.5 rounded-md transition-all duration-150 group-hover:scale-110"
                  style={{
                    backgroundColor: `${action.accent}14`,
                  }}
                >
                  <Icon
                    className="w-[15px] h-[15px]"
                    style={{ color: action.accent }}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent-hover)] transition-colors truncate">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <p className="mt-4 text-[10px] text-[var(--text-disabled)] text-center">
        Press{" "}
        <kbd className="px-1 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] border border-white/[0.08]">
          &lrm;&#8984;J
        </kbd>{" "}
        to open command palette
      </p>
    </div>
  );
}
