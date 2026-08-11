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
    <div className="stripe-card p-5 sm:p-6 lg:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-lg text-purple-300 shrink-0">
              📈
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                Team Engineering Velocity
              </h2>
              <p className="text-xs text-slate-400 truncate">
                Weekly breakdown of commits, PRs, and peer code reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 text-xs font-medium flex-wrap shrink-0">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50 shrink-0" />
              <span className="text-slate-300">Commits</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50 shrink-0" />
              <span className="text-slate-300">PRs</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 shrink-0" />
              <span className="text-slate-300">Reviews</span>
            </div>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="flex items-end gap-2 sm:gap-4 h-48 sm:h-52 px-1 pt-4">
          {mockData.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2.5">
              <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-40 sm:h-44">
                {/* Commits bar */}
                <div
                  className="w-1/3 rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-300 hover:brightness-125 cursor-pointer"
                  style={{ height: `${(day.commits / maxCommits) * 100}%` }}
                  title={`${day.commits} commits`}
                />
                {/* PRs bar */}
                <div
                  className="w-1/3 rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-300 hover:brightness-125 cursor-pointer"
                  style={{ height: `${(day.prs / maxCommits) * 100}%` }}
                  title={`${day.prs} PRs`}
                />
                {/* Reviews bar */}
                <div
                  className="w-1/3 rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-300 hover:brightness-125 cursor-pointer"
                  style={{ height: `${(day.reviews / maxCommits) * 100}%` }}
                  title={`${day.reviews} reviews`}
                />
              </div>
              <span className="text-xs font-mono font-medium text-slate-400">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-center">
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02]">
          <p className="text-xl sm:text-2xl font-black text-white font-mono">
            {mockData.reduce((s, d) => s + d.commits, 0)}
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5 truncate">Total Commits</p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02]">
          <p className="text-xl sm:text-2xl font-black text-white font-mono">
            {mockData.reduce((s, d) => s + d.prs, 0)}
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5 truncate">PRs Opened</p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02]">
          <p className="text-xl sm:text-2xl font-black text-white font-mono">
            {mockData.reduce((s, d) => s + d.reviews, 0)}
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5 truncate">Reviews Completed</p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <p className="text-xl sm:text-2xl font-black stripe-gradient-accent font-mono">A+</p>
          <p className="text-[10px] sm:text-[11px] text-indigo-300 font-medium uppercase tracking-wider mt-0.5 truncate">Velocity Score</p>
        </div>
      </div>
    </div>
  );
}
