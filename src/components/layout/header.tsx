"use client";

import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, Command } from "lucide-react";
import { LanguageSelector } from "./language-selector";
import { useLanguage } from "@/lib/i18n/context";

export function Header() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [greetingKey, setGreetingKey] = useState("header.greeting.morning");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    const gk =
      hour < 12
        ? "header.greeting.morning"
        : hour < 18
          ? "header.greeting.afternoon"
          : "header.greeting.evening";
    setGreetingKey(gk);
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header
      className="sticky top-0 z-30 h-[64px] w-full"
      style={{
        background: "rgba(7, 11, 20, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto h-full flex items-center justify-between gap-4" style={{ margin: "2px", padding: "2px" }}>
        {/* ── Left: Greeting & Breadcrumb ─────────────── */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] leading-none mb-1">
              <span className="font-medium text-[var(--text-secondary)]">{t("header.workspace")}</span>
              <span className="text-[var(--text-disabled)]">/</span>
              <span className="font-semibold text-[var(--brand-violet)]">{t("header.overview")}</span>
              {mounted && formattedDate && (
                <>
                  <span className="text-[var(--text-disabled)]">·</span>
                  <span className="font-mono text-[var(--text-tertiary)]">{formattedDate}</span>
                </>
              )}
            </div>
            <h1 className="text-[15px] font-bold text-white tracking-tight leading-none truncate">
              {mounted ? t(greetingKey) : t("header.greeting.morning")}
              <span className="hidden sm:inline font-normal text-[var(--text-tertiary)] ml-2 text-[13px]">
                — {t("header.subtitle")}
              </span>
            </h1>
          </div>
        </div>

        {/* ── Right: Controls ──────────────────────────── */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Search Box */}
          <div
            className="hidden md:flex items-center gap-2 px-3 h-9 rounded-xl transition-all duration-150 group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              width: "180px",
            }}
          >
            <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--brand-violet)] transition-colors shrink-0" />
            <input
              type="text"
              placeholder={t("header.search")}
              className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none"
            />
            <kbd
              className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--text-disabled)] shrink-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </div>

          {/* Model Selector Pill */}
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
                style={{ background: "#10d98e" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: "#10d98e" }}
              />
            </span>
            <span className="text-xs font-bold font-mono text-[#c4bcff]">
              GPT-4o
            </span>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-xl transition-all duration-150 shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "var(--text-secondary)",
            }}
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{
                background: "#fb7185",
                boxShadow: "0 0 0 2px #070b14",
              }}
            />
          </button>

          {/* Divider */}
          <div
            className="h-5 w-px shrink-0 hidden sm:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* User Avatar */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold cursor-pointer hover:scale-105 transition-transform shrink-0"
            style={{
              background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
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
