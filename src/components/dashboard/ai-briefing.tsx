"use client";

import { useState } from "react";

const mockBriefing = {
  summary: `## 📋 Today's Development Briefing

### 🔥 High Priority
- **3 PRs awaiting your review** — oldest is from @alice (2 days ago)
- **CI failing** on \`main\` branch of \`wizdev-api\` — test timeout in auth module
- **Release v2.3.1** is tagged but not deployed

### 📊 Overnight Activity
- **7 commits** pushed across 3 repos
- **2 PRs merged**: Feature/user-analytics (#142), Fix/memory-leak (#156)
- **1 new issue** filed: Performance regression in dashboard load (#203)

### 🎯 Suggested Focus
1. Review the stale PRs to unblock the team
2. Investigate CI failure on main — likely related to the auth refactor
3. Deploy v2.3.1 to staging for QA
`,
  generatedAt: new Date().toLocaleTimeString(),
  model: "GPT-4o-mini",
};

export function AIBriefing() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--wiz-primary)] to-[var(--wiz-accent)] flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">
              AI Daily Briefing
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Generated at {mockBriefing.generatedAt} · {mockBriefing.model}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium
              bg-[var(--wiz-primary)]/10 text-[var(--wiz-primary-light)]
              hover:bg-[var(--wiz-primary)]/20 transition-all duration-200
              disabled:opacity-50
              ${isRefreshing ? "animate-pulse" : ""}
            `}
          >
            {isRefreshing ? "⟳ Generating..." : "⟳ Refresh"}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] transition-colors"
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="prose prose-invert prose-sm max-w-none">
          <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-secondary)]">
            <div
              className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{
                __html: mockBriefing.summary
                  .replace(/## (.*)/g, '<h3 class="text-base font-semibold text-[var(--text-primary)] mt-4 mb-2">$1</h3>')
                  .replace(/### (.*)/g, '<h4 class="text-sm font-semibold text-[var(--text-primary)] mt-3 mb-1.5">$1</h4>')
                  .replace(/- \*\*(.*?)\*\*/g, '<div class="flex items-start gap-2 py-1"><span class="text-[var(--wiz-primary-light)] mt-0.5">•</span><span><strong class="text-[var(--text-primary)]">$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--wiz-accent)] text-xs font-mono">$1</code>')
                  .replace(/\n/g, "</span></div>"),
              }}
            />
          </div>
        </div>
      )}

      {/* AI Chat input */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ask AI about your repos... e.g. 'Which PRs are risky?'"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--wiz-primary)]/50 focus:ring-1 focus:ring-[var(--wiz-primary)]/20 transition-all"
          />
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--wiz-primary)] to-[var(--wiz-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Send
        </button>
      </div>
    </div>
  );
}
