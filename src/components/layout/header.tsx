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
    <header className="sticky top-0 z-30 h-20 border-b border-white/10 bg-[#080a11]/90 backdrop-blur-2xl">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto gap-4">
        {/* Left: Greeting & Breadcrumb */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-0.5 truncate">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-indigo-400 font-semibold">Overview</span>
            {formattedDate && (
              <>
                <span className="hidden lg:inline text-slate-600">•</span>
                <span className="hidden lg:inline text-slate-400">{formattedDate}</span>
              </>
            )}
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
            {greeting}
          </h1>
        </div>

        {/* Right: Search, AI Model & User Controls */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
          {/* Search Box */}
          <div className="hidden lg:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 cursor-pointer hover:border-indigo-500/40 hover:bg-white/[0.07] transition-all group shrink-0">
            <span className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">
              🔍
            </span>
            <span className="whitespace-nowrap">Search repos, PRs...</span>
            <kbd className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono font-semibold text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </div>

          {/* AI Model Selector Pill */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-200 cursor-pointer hover:bg-indigo-500/20 transition-all shrink-0 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-mono font-semibold">GPT-4o-mini</span>
            <span className="text-slate-400 text-[10px]">▾</span>
          </div>

          {/* Notification Button */}
          <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-slate-300 shrink-0">
            <span className="text-base leading-none block">🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#080a11]" />
          </button>

          {/* User Profile */}
          <div className="flex items-center pl-1 sm:pl-2 border-l border-white/10 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] shadow-md shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0f1322] rounded-[11px] flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
