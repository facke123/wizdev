"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Welcome back 👋");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    const g =
      hour < 12
        ? "Good morning 👋"
        : hour < 18
        ? "Good afternoon 👋"
        : "Good evening 👋";
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
    <header className="sticky top-0 z-30 h-16 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Greeting */}
        <div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">
            {greeting}
          </h1>
          <p className="text-xs text-[var(--text-muted)] min-h-[16px]">
            {formattedDate}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-sm text-[var(--text-muted)] cursor-pointer hover:border-[var(--wiz-primary)]/30 transition-colors">
            <span>🔍</span>
            <span>Search...</span>
            <kbd className="ml-4 px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[10px] font-mono">
              ⌘K
            </kbd>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--wiz-danger)]" />
          </button>

          {/* AI Model Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-sm cursor-pointer hover:border-[var(--wiz-primary)]/30 transition-colors">
            <span>🟢</span>
            <span className="text-[var(--text-secondary)] text-xs">
              GPT-4o-mini
            </span>
            <span className="text-[var(--text-muted)] text-xs">▾</span>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--wiz-primary)] to-[var(--wiz-accent)] flex items-center justify-center text-white text-sm font-bold cursor-pointer">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
