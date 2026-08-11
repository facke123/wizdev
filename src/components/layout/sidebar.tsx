"use client";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: "📊", label: "Dashboard", href: "/", active: true },
  { icon: "🔀", label: "Pull Requests", href: "/prs", active: false, badge: "12" },
  { icon: "🐛", label: "Issues", href: "/issues", active: false, badge: "28" },
  { icon: "⚡", label: "CI/CD Pipeline", href: "/ci", active: false },
  { icon: "📈", label: "Analytics", href: "/analytics", active: false },
  { icon: "🤖", label: "AI Copilot", href: "/chat", active: false },
  { icon: "⚙️", label: "Settings", href: "/settings", active: false },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        h-screen sticky top-0
        bg-[#0b0e17]/90 backdrop-blur-xl border-r border-white/10
        flex flex-col z-40
        transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
        ${collapsed ? "w-[72px]" : "w-[260px]"}
      `}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 flex-shrink-0">
          <div className="w-full h-full bg-[#0b0e17] rounded-[11px] flex items-center justify-center text-white font-black text-base">
            W
          </div>
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg stripe-gradient-text tracking-tight">
              WizDev
            </span>
            <span className="text-[10px] text-indigo-400 font-mono font-medium tracking-wider uppercase">
              AI Copilot v1.0
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`
              flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium
              transition-all duration-200 group relative
              ${
                item.active
                  ? "bg-gradient-to-r from-indigo-500/15 to-purple-500/10 text-white border border-indigo-500/30 shadow-md shadow-indigo-500/10"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }
            `}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-lg flex-shrink-0 transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="truncate tracking-wide">{item.label}</span>
              )}
            </div>

            {!collapsed && item.badge && (
              <span
                className={`
                  px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono
                  ${
                    item.active
                      ? "bg-indigo-500/30 text-indigo-200"
                      : "bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-white"
                  }
                `}
              >
                {item.badge}
              </span>
            )}

            {/* Active Indicator Bar */}
            {item.active && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-indigo-400 to-cyan-400 rounded-r-full" />
            )}
          </a>
        ))}
      </nav>

      {/* Collapse Action Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10 transition-all duration-200 text-xs font-medium"
        >
          <span className="text-sm">{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
}
