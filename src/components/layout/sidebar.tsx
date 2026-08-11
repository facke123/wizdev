"use client";

import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: "📊", label: "Dashboard", href: "/", active: true },
  { icon: "🔀", label: "Pull Requests", href: "/prs", active: false },
  { icon: "🐛", label: "Issues", href: "/issues", active: false },
  { icon: "⚡", label: "CI/CD", href: "/ci", active: false },
  { icon: "📈", label: "Analytics", href: "/analytics", active: false },
  { icon: "🤖", label: "AI Chat", href: "/chat", active: false },
  { icon: "⚙️", label: "Settings", href: "/settings", active: false },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        h-screen sticky top-0
        bg-[var(--bg-secondary)] border-r border-[var(--border-primary)]
        flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[68px]" : "w-[240px]"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--border-primary)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--wiz-primary)] to-[var(--wiz-accent)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          W
        </div>
        {!collapsed && (
          <span className="font-bold text-lg gradient-text whitespace-nowrap">
            WizDev
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-all duration-200 group
              ${
                item.active
                  ? "bg-[var(--wiz-primary)]/10 text-[var(--wiz-primary-light)] border border-[var(--wiz-primary)]/20"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
              }
            `}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-[var(--border-primary)]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)] transition-all duration-200"
        >
          <span className="text-sm">{collapsed ? "→" : "←"}</span>
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
