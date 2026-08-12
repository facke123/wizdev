"use client";

import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, Command } from "lucide-react";

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
    <header
      className="sticky top-0 z-30 h-[60px] w-full"
      style={{
        background: "rgba(7, 11, 20, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center justify-between h-full w-full px-5 gap-4">
        {/* ── Left: Greeting ──────────────────────── */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)] mb-0.5">
            <span className="hidden sm:inline">Workspace</span>
            <span className="hidden sm:inline text-[var(--text-disabled)]">/</span>
            <span
              className="font-semibold"
              style={{ color: "var(--brand-violet)" }}
            >
              Overview
            </span>
            {formattedDate && (
              <>
                <span className="hidden lg:inline text-[var(--text-disabled)]">
                  ·
                </span>
                <span className="hidden lg:inline">{formattedDate}</span>
              </>
            )}
          </div>
          <h1 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight truncate leading-tight">
            {mounted ? greeting : "Dashboard"}{" "}
            <span className="text-[var(--text-secondary)] font-normal">
              — Here&apos;s your daily overview
            </span>
          </h1>
        </div>

        {/* ── Right: Controls ─────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <div
            className="hidden md:flex items-center gap-2.5 px-3 h-9 rounded-xl cursor-pointer transition-all duration-150 group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(124,109,250,0.35)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.03)";
            }}
          >
            <Search
              className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--brand-violet)] transition-colors"
            />
            <span className="text-xs text-[var(--text-tertiary)] select-none">
              Search...
            </span>
            <kbd
              className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--text-disabled)]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </div>

          {/* AI Model Pill */}
          <div
            className="flex items-center gap-2 px-3 h-9 rounded-xl cursor-pointer transition-all duration-150 shrink-0"
            style={{
              background: "rgba(124,109,250,0.10)",
              border: "1px solid rgba(124,109,250,0.22)",
            }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--color-success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: "var(--color-success)" }}
              />
            </span>
            <span
              className="text-xs font-bold font-mono"
              style={{ color: "#c4bcff" }}
            >
              GPT-4o
            </span>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-xl transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--color-danger)",
                boxShadow: "0 0 0 2px #070b14",
              }}
            />
          </button>

          {/* Divider */}
          <div
            className="h-6 w-px shrink-0"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />

          {/* User Avatar */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold cursor-pointer hover:scale-105 transition-transform"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-violet), var(--brand-indigo))",
              boxShadow: "0 2px 8px rgba(124,109,250,0.35)",
            }}
          >
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
