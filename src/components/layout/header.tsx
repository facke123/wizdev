"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    const g =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";
    setGreeting(g);
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-white/[0.06] bg-[var(--surface-overlay)] backdrop-blur-xl">
      <div className="flex items-center justify-between h-full w-full px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Greeting & Breadcrumb */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] font-medium mb-0.5 truncate">
            <span>Workspace</span>
            <span className="text-[var(--text-disabled)]">/</span>
            <span className="text-[var(--color-accent-hover)] font-semibold">
              Overview
            </span>
            {formattedDate && (
              <>
                <span className="hidden lg:inline text-[var(--text-disabled)]">&bull;</span>
                <span className="hidden lg:inline text-[var(--text-tertiary)]">
                  {formattedDate}
                </span>
              </>
            )}
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] tracking-tight truncate">
            {greeting}
          </h1>
        </div>

        {/* Right: Search, AI Model & User Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Box */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-[var(--text-tertiary)] cursor-pointer hover:border-[var(--color-accent-border)] hover:bg-white/[0.06] transition-all group">
            <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--color-accent-hover)] transition-colors" />
            <span className="select-none">Search repos, PRs...</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-[var(--text-tertiary)] bg-white/[0.06] border border-white/[0.08]">
              &lrm;&#8984;K
            </kbd>
          </div>

          {/* AI Model Selector Pill */}
          <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-[var(--color-accent-muted)] border border-[var(--color-accent-border)] text-xs text-[var(--text-secondary)] cursor-pointer hover:bg-[rgba(99,91,255,0.18)] transition-all shrink-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
            </span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">
              GPT-4o
            </span>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>

          {/* Notification Button */}
          <button className="relative p-2 rounded-lg bg-[#14192b] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all text-[var(--text-secondary)]">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-danger)] ring-2 ring-[var(--surface-root)]" />
          </button>

          {/* User Profile */}
          <div className="flex items-center pl-1 sm:pl-2 border-l border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] p-[1px] cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[var(--surface-card)] rounded-[7px] flex items-center justify-center text-[var(--text-primary)] text-[11px] font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
