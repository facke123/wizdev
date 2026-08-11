"use client";

const mockData = [
  { day: "Mon", commits: 12, prs: 3, reviews: 5 },
  { day: "Tue", commits: 19, prs: 5, reviews: 8 },
  { day: "Wed", commits: 8, prs: 2, reviews: 4 },
  { day: "Thu", commits: 15, prs: 4, reviews: 6 },
  { day: "Fri", commits: 22, prs: 6, reviews: 9 },
  { day: "Sat", commits: 5, prs: 1, reviews: 2 },
  { day: "Sun", commits: 3, prs: 0, reviews: 1 },
];

const maxCommits = Math.max(...mockData.map((d) => d.commits));

export function ActivityChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">📈</span>
          <h2 className="font-semibold text-[var(--text-primary)]">
            Weekly Activity
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--wiz-primary)]" />
            <span className="text-[var(--text-muted)]">Commits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--wiz-accent)]" />
            <span className="text-[var(--text-muted)]">PRs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--wiz-success)]" />
            <span className="text-[var(--text-muted)]">Reviews</span>
          </div>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="flex items-end gap-3 h-48 px-2">
        {mockData.map((day) => (
          <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end gap-0.5 h-40">
              {/* Commits bar */}
              <div
                className="flex-1 rounded-t-sm bg-[var(--wiz-primary)] transition-all duration-500 hover:opacity-80"
                style={{ height: `${(day.commits / maxCommits) * 100}%` }}
                title={`${day.commits} commits`}
              />
              {/* PRs bar */}
              <div
                className="flex-1 rounded-t-sm bg-[var(--wiz-accent)] transition-all duration-500 hover:opacity-80"
                style={{ height: `${(day.prs / maxCommits) * 100}%` }}
                title={`${day.prs} PRs`}
              />
              {/* Reviews bar */}
              <div
                className="flex-1 rounded-t-sm bg-[var(--wiz-success)] transition-all duration-500 hover:opacity-80"
                style={{ height: `${(day.reviews / maxCommits) * 100}%` }}
                title={`${day.reviews} reviews`}
              />
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">
              {day.day}
            </span>
          </div>
        ))}
      </div>

      {/* Summary row */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border-secondary)]">
        <div className="text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {mockData.reduce((s, d) => s + d.commits, 0)}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">Total Commits</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {mockData.reduce((s, d) => s + d.prs, 0)}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">PRs Opened</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {mockData.reduce((s, d) => s + d.reviews, 0)}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">Reviews Done</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold gradient-text">A+</p>
          <p className="text-[11px] text-[var(--text-muted)]">Velocity Score</p>
        </div>
      </div>
    </div>
  );
}
