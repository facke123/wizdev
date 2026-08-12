"use client";

import {
  LayoutDashboard,
  CalendarDays,
  GitPullRequest,
  Bug,
  Zap,
  BarChart3,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { usePathname } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    {
      icon: LayoutDashboard,
      labelKey: "nav.dashboard",
      href: "/",
      active: pathname === "/",
      group: "main",
    },
    {
      icon: CalendarDays,
      labelKey: "nav.planning",
      href: "/planning",
      active: pathname === "/planning",
      badge: "Sprint 24",
      group: "main",
    },
    {
      icon: GitPullRequest,
      labelKey: "nav.prs",
      href: "/prs",
      active: pathname === "/prs",
      badge: "12",
      group: "main",
    },
    {
      icon: Bug,
      labelKey: "nav.issues",
      href: "/issues",
      active: pathname === "/issues",
      badge: "28",
      group: "main",
    },
    {
      icon: Zap,
      labelKey: "nav.ci",
      href: "/ci",
      active: pathname === "/ci",
      group: "main",
    },
    {
      icon: BarChart3,
      labelKey: "nav.analytics",
      href: "/analytics",
      active: pathname === "/analytics",
      group: "tools",
    },
    {
      icon: Bot,
      labelKey: "nav.copilot",
      href: "/chat",
      active: pathname === "/chat",
      group: "tools",
      highlight: true,
    },
    {
      icon: Settings,
      labelKey: "nav.settings",
      href: "/settings",
      active: pathname === "/settings",
      group: "tools",
    },
  ];

  const mainItems = navItems.filter((i) => i.group === "main");
  const toolItems = navItems.filter((i) => i.group === "tools");

  return (
    <aside
      className={`
        h-[100dvh] sticky top-0 z-40
        flex flex-col
        transition-all duration-300 ease-out
        border-r border-white/[0.05]
        ${collapsed ? "w-[64px]" : "w-[240px]"}
      `}
      style={{
        background: "linear-gradient(180deg, #0b0f1e 0%, #080c18 100%)",
      }}
    >
      {/* ── Logo ──────────────────────────────────── */}
      <div
        className={`flex items-center h-[60px] border-b border-white/[0.05] shrink-0 ${
          collapsed ? "justify-center px-0" : "px-4 gap-3"
        }`}
      >
        <div className="relative shrink-0">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white font-black text-sm"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5b4fdf 50%, #22d3ee 100%)",
              boxShadow: "0 4px 12px rgba(124, 109, 250, 0.45), 0 0 0 1px rgba(255,255,255,0.10) inset",
            }}
          >
            W
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#080c18]"
            style={{ background: "var(--color-success)" }}
          />
        </div>

        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[13px] text-white tracking-tight leading-tight">
              WizDev
            </span>
            <span
              className="text-[10px] font-mono font-medium tracking-widest leading-tight"
              style={{ color: "var(--brand-violet)" }}
            >
              BETA v1.0
            </span>
          </div>
        )}
      </div>

      {/* ── Navigation ────────────────────────────── */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-4">
        {/* Main group */}
        <div className="space-y-0.5">
          {!collapsed && (
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-disabled)]">
              Workspace
            </p>
          )}
          {mainItems.map((item) => (
            <NavItem key={item.labelKey} item={item} collapsed={collapsed} t={t} />
          ))}
        </div>

        {/* Tools group */}
        <div className="space-y-0.5">
          {!collapsed && (
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-disabled)]">
              Tools
            </p>
          )}
          {toolItems.map((item) => (
            <NavItem key={item.labelKey} item={item} collapsed={collapsed} t={t} />
          ))}
        </div>
      </nav>

      {/* ── User Profile Area ──────────────────────── */}
      {!collapsed && (
        <div className="mx-2 mb-3 p-3 rounded-xl border border-white/[0.05] bg-white/[0.02] flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, var(--brand-violet), var(--brand-indigo))",
            }}
          >
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate">
              John Doe
            </p>
            <p className="text-[10px] text-[var(--text-tertiary)] truncate">
              Pro Plan
            </p>
          </div>
        </div>
      )}

      {/* ── Collapse Button ────────────────────────── */}
      <div className="p-2 border-t border-white/[0.05] shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[var(--text-tertiary)] hover:bg-white/[0.05] hover:text-[var(--text-secondary)] transition-all duration-150 text-xs font-medium"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>{t("header.collapse")}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  collapsed,
  t,
}: {
  item: {
    icon: any;
    labelKey: string;
    href: string;
    active: boolean;
    badge?: string;
    highlight?: boolean;
  };
  collapsed: boolean;
  t: (key: string) => string;
}) {
  const Icon = item.icon;
  const label = t(item.labelKey);

  return (
    <a
      href={item.href}
      title={collapsed ? label : undefined}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium
        transition-all duration-150 group
        ${collapsed ? "justify-center" : ""}
        ${
          item.active
            ? "text-white"
            : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-white/[0.03]"
        }
      `}
      style={
        item.active
          ? {
              background: "linear-gradient(135deg, rgba(124,109,250,0.18) 0%, rgba(124,109,250,0.08) 100%)",
              border: "1px solid rgba(124,109,250,0.25)",
              boxShadow: "0 2px 8px rgba(124,109,250,0.12)",
            }
          : { border: "1px solid transparent" }
      }
    >
      {item.active && !collapsed && (
        <div
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
          style={{ background: "var(--brand-violet)" }}
        />
      )}

      <Icon
        className={`flex-shrink-0 transition-transform duration-150 group-hover:scale-110 ${
          item.active
            ? "text-[var(--brand-violet)]"
            : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"
        }`}
        style={{ width: 16, height: 16 }}
        strokeWidth={item.active ? 2.25 : 1.75}
      />

      {!collapsed && (
        <>
          <span className="truncate flex-1 text-left">{label}</span>

          {item.highlight && (
            <Sparkles
              className="w-3 h-3 shrink-0 ml-auto"
              style={{ color: "var(--brand-violet)" }}
            />
          )}

          {item.badge && (
            <span
              className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold font-mono leading-none shrink-0 whitespace-nowrap"
              style={{
                background: item.active
                  ? "rgba(124,109,250,0.25)"
                  : "rgba(255,255,255,0.06)",
                color: item.active ? "#c4bcff" : "var(--text-tertiary)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </a>
  );
}
