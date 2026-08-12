"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { LANGUAGE_OPTIONS, Language } from "@/lib/i18n/translations";
import { Globe, ChevronDown, Check } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const currentOpt = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 text-[var(--text-secondary)] hover:text-white"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Globe className="w-3.5 h-3.5 text-[var(--brand-cyan)] shrink-0" />
        <span className="hidden sm:inline">{currentOpt.flag} {currentOpt.label}</span>
        <span className="sm:hidden">{currentOpt.flag}</span>
        <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)] shrink-0" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden z-50 p-1 space-y-0.5"
          style={{
            background: "#0c1120",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
          }}
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                setLanguage(opt.code as Language);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
              style={
                language === opt.code
                  ? { background: "rgba(124,109,250,0.15)", color: "#c4bcff" }
                  : { background: "transparent", color: "var(--text-secondary)" }
              }
              onMouseEnter={(e) => {
                if (language !== opt.code) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (language !== opt.code) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span className="flex items-center gap-2">
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
              </span>
              {language === opt.code && <Check className="w-3.5 h-3.5 text-[var(--brand-violet)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
