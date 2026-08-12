"use client";

import { FileText, TrendingUp, ShieldAlert, GitBranch, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

export function QuickActions() {
  const { t } = useLanguage();

  const actions = [
    {
      icon: FileText,
      titleKey: "copilot.action1.title",
      descKey: "copilot.action1.desc",
      color: "#7c6dfa",
      bg: "rgba(124,109,250,0.10)",
      border: "rgba(124,109,250,0.22)",
      tag: "1-Click",
    },
    {
      icon: TrendingUp,
      titleKey: "copilot.action2.title",
      descKey: "copilot.action2.desc",
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.10)",
      border: "rgba(34,211,238,0.22)",
      tag: "Weekly",
    },
    {
      icon: ShieldAlert,
      titleKey: "copilot.action3.title",
      descKey: "copilot.action3.desc",
      color: "#fb7185",
      bg: "rgba(251,113,133,0.10)",
      border: "rgba(251,113,133,0.22)",
      tag: "Security",
    },
    {
      icon: GitBranch,
      titleKey: "copilot.action4.title",
      descKey: "copilot.action4.desc",
      color: "#10d98e",
      bg: "rgba(16,217,142,0.10)",
      border: "rgba(16,217,142,0.22)",
      tag: "Cleanup",
    },
  ];

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
          className="p-2 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(124,109,250,0.12)",
            border: "1px solid rgba(124,109,250,0.22)",
          }}
        >
          <Sparkles className="w-4 h-4 text-[var(--brand-violet)]" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-white tracking-tight leading-none">
            {t("copilot.title")}
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-1 leading-none">
            {t("copilot.sub")}
          </p>
        </div>
      </div>

      {/* ── Action Buttons ──────────────────────────── */}
      <div className="space-y-2">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              className="w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all duration-150 group border border-white/[0.05] hover:border-white/[0.12]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: action.bg, border: `1px solid ${action.border}` }}
              >
                <p className="text-[12px] font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors truncate">
                  {t(action.titleKey)}
                </p>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5 truncate">
                  {t(action.descKey)}
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
