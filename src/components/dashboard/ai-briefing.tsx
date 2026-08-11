"use client";

import { useEffect, useState } from "react";

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
  defaultGeneratedAt: "09:00 AM",
  model: "GPT-4o-mini",
};

export function AIBriefing() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [generatedAt, setGeneratedAt] = useState(mockBriefing.defaultGeneratedAt);

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setGeneratedAt(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1500);
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
              Generated at {generatedAt} · {mockBriefing.model}
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
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)] mt-1 mb-2">
                📋 Today's Development Briefing
              </h3>

              <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-3 mb-1.5">
                🔥 High Priority
              </h4>
              <ul className="space-y-1 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--wiz-primary-light)]">•</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">3 PRs awaiting your review</strong> — oldest is from @alice (2 days ago)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--wiz-primary-light)]">•</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">CI failing</strong> on{" "}
                    <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--wiz-accent)] text-xs font-mono">
                      main
                    </code>{" "}
                    branch of{" "}
                    <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--wiz-accent)] text-xs font-mono">
                      wizdev-api
                    </code>{" "}
                    — test timeout in auth module
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--wiz-primary-light)]">•</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Release v2.3.1</strong> is tagged but not deployed
                  </span>
                </li>
              </ul>

              <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-4 mb-1.5">
                📊 Overnight Activity
              </h4>
              <ul className="space-y-1 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--wiz-primary-light)]">•</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">7 commits</strong> pushed across 3 repos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--wiz-primary-light)]">•</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">2 PRs merged</strong>: Feature/user-analytics (#142), Fix/memory-leak (#156)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--wiz-primary-light)]">•</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">1 new issue</strong> filed: Performance regression in dashboard load (#203)
                  </span>
                </li>
              </ul>

              <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-4 mb-1.5">
                🎯 Suggested Focus
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-[var(--text-secondary)]">
                <li>Review the stale PRs to unblock the team</li>
                <li>Investigate CI failure on main — likely related to the auth refactor</li>
                <li>Deploy v2.3.1 to staging for QA</li>
              </ol>
            </div>
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
