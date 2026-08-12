"use client";

import { useState } from "react";
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  GitPullRequest,
} from "lucide-react";

export interface TaskItem {
  id: string;
  title: string;
  points: number;
  priority: "P0" | "P1" | "P2";
  status: "backlog" | "planning" | "in_progress" | "in_review" | "done";
  assignee: string;
  prLink?: string;
  isBlocker?: boolean;
}

const initialTasks: TaskItem[] = [
  {
    id: "task-101",
    title: "Implement OAuth2 PKCE login flow for web app",
    points: 5,
    priority: "P0",
    status: "in_progress",
    assignee: "Alex R.",
    prLink: "PR #142",
    isBlocker: true,
  },
  {
    id: "task-102",
    title: "Refactor Next.js i18n hydration provider",
    points: 3,
    priority: "P1",
    status: "in_review",
    assignee: "Sarah J.",
    prLink: "PR #145",
  },
  {
    id: "task-103",
    title: "Setup Redis cache cluster for API rate limiting",
    points: 8,
    priority: "P0",
    status: "planning",
    assignee: "Chen W.",
  },
  {
    id: "task-104",
    title: "Add WebSocket live notification listener",
    points: 5,
    priority: "P2",
    status: "backlog",
    assignee: "Kenji S.",
  },
  {
    id: "task-105",
    title: "Fix Flexbox text overflow on AI Briefing cards",
    points: 2,
    priority: "P1",
    status: "done",
    assignee: "Alex R.",
    prLink: "PR #138",
  },
  {
    id: "task-106",
    title: "Optimize Docker multi-stage build size",
    points: 3,
    priority: "P2",
    status: "done",
    assignee: "Chen W.",
    prLink: "PR #139",
  },
];

const COLUMNS: { key: TaskItem["status"]; title: string; color: string }[] = [
  { key: "backlog", title: "Backlog", color: "#94a3b8" },
  { key: "planning", title: "In Planning", color: "#38bdf8" },
  { key: "in_progress", title: "In Progress", color: "#7c6dfa" },
  { key: "in_review", title: "In Review", color: "#22d3ee" },
  { key: "done", title: "Done", color: "#10d98e" },
];

const priorityStyles = {
  P0: { bg: "rgba(251,113,133,0.15)", text: "#fb7185", border: "rgba(251,113,133,0.3)" },
  P1: { bg: "rgba(251,191,36,0.15)", text: "#fbbf24", border: "rgba(251,191,36,0.3)" },
  P2: { bg: "rgba(148,163,184,0.15)", text: "#94a3b8", border: "rgba(148,163,184,0.3)" },
};

export function SprintKanban() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const moveTask = (taskId: string, direction: "prev" | "next") => {
    const colOrder: TaskItem["status"][] = ["backlog", "planning", "in_progress", "in_review", "done"];

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const currIdx = colOrder.indexOf(task.status);
        const nextIdx = direction === "next" ? currIdx + 1 : currIdx - 1;

        if (nextIdx < 0 || nextIdx >= colOrder.length) return task;

        return { ...task, status: colOrder[nextIdx] };
      })
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.key);
        const colPoints = colTasks.reduce((sum, t) => sum + t.points, 0);

        return (
          <div
            key={col.key}
            className="flex flex-col rounded-2xl p-3 space-y-3 min-h-[500px]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(15,23,42,0.8) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: col.color, boxShadow: `0 0 8px ${col.color}` }}
                />
                <h3 className="text-xs font-bold text-white tracking-tight uppercase">
                  {col.title}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-tertiary)] px-2 py-0.5 rounded-full bg-white/[0.05]">
                {colTasks.length} ({colPoints} pts)
              </span>
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-2.5">
              {colTasks.length === 0 ? (
                <div className="h-28 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs text-[var(--text-disabled)] font-mono">
                  No tasks
                </div>
              ) : (
                colTasks.map((task) => {
                  const prio = priorityStyles[task.priority];

                  return (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl space-y-2.5 transition-all duration-150 hover:border-white/20 group"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {/* Priority Tag & Blocker Warning */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold font-mono"
                            style={{
                              background: prio.bg,
                              color: prio.text,
                              border: `1px solid ${prio.border}`,
                            }}
                          >
                            {task.priority}
                          </span>

                          <span className="text-[10px] font-mono text-[var(--text-tertiary)] bg-white/5 px-1.5 py-0.5 rounded">
                            {task.points} pts
                          </span>
                        </div>

                        {task.isBlocker && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-[#fb7185] bg-[#fb7185]/10 px-1.5 py-0.5 rounded border border-[#fb7185]/30 animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            Blocker
                          </span>
                        )}
                      </div>

                      {/* Task Title */}
                      <h4 className="text-xs font-semibold text-white leading-snug group-hover:text-[#7c6dfa] transition-colors">
                        {task.title}
                      </h4>

                      {/* Card Footer & Movement Controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] text-[11px]">
                        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                          <User className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {col.key !== "backlog" && (
                            <button
                              onClick={() => moveTask(task.id, "prev")}
                              title="Move left"
                              className="p-1 rounded hover:bg-white/10 text-[var(--text-tertiary)] hover:text-white transition-colors"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {col.key !== "done" && (
                            <button
                              onClick={() => moveTask(task.id, "next")}
                              title="Move right"
                              className="p-1 rounded hover:bg-white/10 text-[var(--text-tertiary)] hover:text-white transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
