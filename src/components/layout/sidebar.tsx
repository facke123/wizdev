"use client";

import {
  LayoutDashboard,
  GitPullRequest,
  Bug,
  Zap,
  BarChart3,
  Bot,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
    active: true,
  },
  {
    icon: GitPullRequest,
    label: "Pull Requests",
    href: "/prs",
    active: false,
    badge: "12",
  },
  {
    icon: Bug,
    label: "Issues",
    href: "/issues",
    active: false,
    badge: "28",
  },
  {
    icon: Zap,
    label: "CI/CD",
    href: "/ci",
    active: false,
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/analytics",
    active: false,
  },
  {
    icon: Bot,
    label: "AI Copilot",
    href: "/chat",
    active: false,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    active: false,
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        h-[100dvh] sticky top-0
        bg-[var(--surface-base)]/95 backdrop-blur-xl
        border-r border-white/[0.06]
        flex flex-col z-40
        transition-all duration-300 ease-out
        ${collapsed ? "w-[68px]" : "w-[248px]"}
      `}
    >
      {/* Logo Area */}
      <div
        className={`flex items-center h-16 border-b border-white/[0.05] ${
          collapsed ? "justify-center px-0" : "gap-3 px-5"
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-info)] flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20 flex-shrink-0">
          <span className="text-white font-black text-sm tracking-tighter">
            W
          </span>
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-[var(--text-primary)] tracking-tight leading-tight">
              WizDev
            </span>
            <span className="text-[10px] text-[var(--color-accent-hover)] font-mono font-medium tracking-wide leading-tight">
              v1.0
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 group relative
                ${
                  item.active
                    ? "bg-[var(--color-accent-muted)] text-[var(--text-primary)] border border-[var(--color-accent-border)]"
                    : "text-[var(--text-tertiary)] hover:bg-white/[0.04] hover:text-[var(--text-secondary)] border border-transparent"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon
                className={`w-[18px] h-[18px] flex-shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                  item.active
                    ? "text-[var(--color-accent-hover)]"
                    : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"
                }`}
                strokeWidth={item.active ? 2 : 1.75}
              />

              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`
                        ml-auto px-1.5 py-0.5 rounded-full text-[11px] font-semibold font-mono leading-none
                        ${
                          item.active
                            ? "bg-[rgba(99,91,255,0.25)] text-[#a5b4fc]"
                            : "bg-white/[0.06] text-[var(--text-tertiary)] group-hover:bg-white/[0.10] group-hover:text-[var(--text-secondary)]"
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Active indicator */}
              {item.active && collapsed && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[var(--color-accent)] rounded-r-full" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Collapse Action Footer */}
      <div className="p-3 border-t border-white/[0.05]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[var(--text-tertiary)] hover:bg-white/[0.04] hover:text-[var(--text-secondary)] border border-transparent hover:border-white/[0.08] transition-all duration-150 text-xs font-medium"
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
