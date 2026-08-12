"use client";

import { BarChart3, TrendingDown, Zap, CheckCircle2, Calendar } from "lucide-react";

export function BurndownChart() {
  const days = ["Day 1", "Day 3", "Day 5", "Day 7", "Day 9", "Day 11", "Day 14"];
  const idealPoints = [42, 36, 30, 24, 18, 10, 0];
  const actualPoints = [42, 38, 32, 23, 15, 11, 4];

  return (
    <div
      className="p-5 rounded-2xl space-y-5"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#10d98e]" />
            <span>Sprint 24 Story Point Burndown Curve</span>
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            Ideal vs Actual effort remaining across the 14-day sprint cycle
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#94a3b8]" />
            <span className="text-[var(--text-tertiary)]">Ideal Burndown</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#7c6dfa]" />
            <span className="text-[#a78bfa] font-bold">Actual Remaining</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative h-64 w-full pt-4 pb-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
          {/* Horizontal gridlines */}
          {[0, 50, 100, 150].map((y, idx) => (
            <line
              key={y}
              x1="40"
              y1={y}
              x2="680"
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Ideal line */}
          <polyline
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.6"
            points="40,20 146,50 253,80 360,110 466,140 573,170 680,190"
          />

          {/* Actual line */}
          <polyline
            fill="none"
            stroke="#7c6dfa"
            strokeWidth="3"
            points="40,20 146,40 253,70 360,115 466,150 573,165 680,180"
          />

          {/* Data Points */}
          {[
            { x: 40, y: 20, val: 42 },
            { x: 146, y: 40, val: 38 },
            { x: 253, y: 70, val: 32 },
            { x: 360, y: 115, val: 23 },
            { x: 466, y: 150, val: 15 },
            { x: 573, y: 165, val: 11 },
            { x: 680, y: 180, val: 4 },
          ].map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#7c6dfa"
                stroke="#080c18"
                strokeWidth="2"
              />
              <text
                x={pt.x}
                y={pt.y - 10}
                fill="#ffffff"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {pt.val} pts
              </text>
            </g>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between px-6 mt-2 text-[11px] font-mono text-[var(--text-tertiary)]">
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06] text-xs">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <Zap className="w-4 h-4 text-[#7c6dfa]" />
          <div>
            <span className="text-[var(--text-tertiary)] block">Avg Daily Velocity</span>
            <span className="text-white font-bold font-mono">3.2 pts / day</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#10d98e]" />
          <div>
            <span className="text-[var(--text-tertiary)] block">Completed Story Points</span>
            <span className="text-white font-bold font-mono">38 / 42 pts</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <Calendar className="w-4 h-4 text-[#38bdf8]" />
          <div>
            <span className="text-[var(--text-tertiary)] block">Est. Completion Date</span>
            <span className="text-white font-bold font-mono">Feb 16, 2026 (On Schedule)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
