"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { AIBriefing } from "@/components/dashboard/ai-briefing";
import { PullRequestList } from "@/components/dashboard/pull-request-list";
import { CIStatusPanel } from "@/components/dashboard/ci-status-panel";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { SprintWidget } from "@/components/dashboard/sprint-widget";

export default function DashboardPage() {
  return (
    <AppShell>
      {/* ── Stats Row ───────────────────────────── */}
      <section>
        <StatsOverview />
      </section>

      {/* ── Main 2-Column Grid ───────────────────── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column — 8/12 */}
        <div className="xl:col-span-8 space-y-6 lg:space-y-7 min-w-0">
          <AIBriefing />
          <ActivityChart />
          <PullRequestList />
        </div>

        {/* Right Column — 4/12 */}
        <div className="xl:col-span-4 space-y-6 lg:space-y-7 min-w-0">
          <SprintWidget />
          <QuickActions />
          <CIStatusPanel />
        </div>
      </section>
    </AppShell>
  );
}
