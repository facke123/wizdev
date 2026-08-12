"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Layers, AlertTriangle, Plus, Loader2 } from "lucide-react";

interface SubTaskEstimate {
  id: string;
  subtask: string;
  points: number;
  priority: "P0" | "P1" | "P2";
  recommendedOwner: string;
  riskFactor: "Low" | "Medium" | "High";
  dependencies: string;
}

export function AiAutoPlanner() {
  const [promptInput, setPromptInput] = useState<string>("Implement OAuth2 Single Sign-On (SSO) with Multi-Factor Authentication (MFA)");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [generatedTasks, setGeneratedTasks] = useState<SubTaskEstimate[]>([
    {
      id: "ai-task-1",
      subtask: "Design OAuth2 PKCE Authorization Server Handshake Protocol",
      points: 5,
      priority: "P0",
      recommendedOwner: "Alex Rivera",
      riskFactor: "Medium",
      dependencies: "None",
    },
    {
      id: "ai-task-2",
      subtask: "Configure Redis Distributed Session Storage & JWT Revocation Blacklist",
      points: 3,
      priority: "P1",
      recommendedOwner: "Chen Wei",
      riskFactor: "Low",
      dependencies: "Task-1",
    },
    {
      id: "ai-task-3",
      subtask: "Build React Client Auth Modal & TOTP QR Code Verification UI",
      points: 5,
      priority: "P1",
      recommendedOwner: "Sarah Jenkins",
      riskFactor: "Low",
      dependencies: "Task-1",
    },
    {
      id: "ai-task-4",
      subtask: "Write End-to-End Cypress Integration Test Matrix & Load Tests",
      points: 3,
      priority: "P2",
      recommendedOwner: "Kenji Sato",
      riskFactor: "Low",
      dependencies: "Task-2, Task-3",
    },
  ]);

  const handleDecompose = () => {
    if (!promptInput.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setGeneratedTasks([
        {
          id: `ai-task-${Date.now()}-1`,
          subtask: `Core API Service for ${promptInput.trim()}`,
          points: 8,
          priority: "P0",
          recommendedOwner: "Alex Rivera",
          riskFactor: "High",
          dependencies: "Architecture Spec",
        },
        {
          id: `ai-task-${Date.now()}-2`,
          subtask: `Frontend UI Integration & Responsive State Management`,
          points: 5,
          priority: "P1",
          recommendedOwner: "Sarah Jenkins",
          riskFactor: "Medium",
          dependencies: "Core API Service",
        },
        {
          id: `ai-task-${Date.now()}-3`,
          subtask: `Automated Integration Test Suite & CI Security Audit`,
          points: 3,
          priority: "P2",
          recommendedOwner: "Chen Wei",
          riskFactor: "Low",
          dependencies: "Frontend UI",
        },
      ]);
      setIsAnalyzing(false);
    }, 800);
  };

  const totalPoints = generatedTasks.reduce((sum, t) => sum + t.points, 0);

  return (
    <div
      className="p-5 rounded-2xl space-y-5"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Title Header ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#22d3ee] animate-pulse" />
            <span>AI Feature Auto-Planner & Task Estimator</span>
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            Describe a feature or Epic requirement, and AI will automatically generate structured engineering sub-tasks
          </p>
        </div>

        <div
          className="px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 flex items-center gap-1.5"
          style={{
            background: "rgba(124,109,250,0.12)",
            border: "1px solid rgba(124,109,250,0.3)",
            color: "#a78bfa",
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Est. Velocity: {totalPoints} Story Points</span>
        </div>
      </div>

      {/* ── Input Bar ───────────────────────────────── */}
      <div className="flex items-center gap-2">
        <div
          className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Sparkles className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Type feature or Epic requirement..."
            className="w-full bg-transparent text-xs text-white placeholder-[var(--text-disabled)] outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleDecompose()}
          />
        </div>

        <button
          onClick={handleDecompose}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shrink-0 transition-all hover:brightness-110 disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #7c6dfa 0%, #22d3ee 100%)",
            boxShadow: "0 0 16px rgba(124,109,250,0.3)",
          }}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Decompose Epic</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* ── Generated Tasks Table / Cards ─────────────── */}
      <div className="space-y-3">
        {generatedTasks.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 rounded-xl space-y-2 transition-all"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-[#7c6dfa]/20 border border-[#7c6dfa]/40 flex items-center justify-center text-xs font-mono font-bold text-[#a78bfa] shrink-0 mt-0.5">
                  {idx + 1}
                </span>

                <div className="space-y-1 min-w-0">
                  <h4 className="text-xs font-bold text-white tracking-tight leading-snug">
                    {item.subtask}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-[var(--text-tertiary)] font-mono flex-wrap">
                    <span>Est. Effort: <strong className="text-[#22d3ee]">{item.points} pts</strong></span>
                    <span>Rec. Owner: <strong className="text-white">{item.recommendedOwner}</strong></span>
                    <span>Dependencies: <strong className="text-[var(--text-secondary)]">{item.dependencies}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 sm:self-center">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    item.riskFactor === "High"
                      ? "bg-[#fb7185]/15 text-[#fb7185] border border-[#fb7185]/30"
                      : item.riskFactor === "Medium"
                      ? "bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30"
                      : "bg-[#10d98e]/15 text-[#10d98e] border border-[#10d98e]/30"
                  }`}
                >
                  Risk: {item.riskFactor}
                </span>

                <button
                  onClick={() => alert(`Added "${item.subtask}" to Sprint 24 Kanban!`)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Sprint</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
