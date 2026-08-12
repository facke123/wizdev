"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { AIBriefing } from "@/components/dashboard/ai-briefing";
import { PullRequestList } from "@/components/dashboard/pull-request-list";
import { CIStatusPanel } from "@/components/dashboard/ci-status-panel";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";

import { I18nProvider } from "@/lib/i18n/context";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <I18nProvider>
      <div
        className="flex min-h-[100dvh] w-full overflow-x-hidden"
        style={{ background: "var(--surface-root)" }}
      >
      {/* Ambient background mesh */}
      <div className="bg-mesh" />

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1600px] mx-auto space-y-6 sm:space-y-8" style={{ margin: "2px", padding: "2px" }}>

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
                <QuickActions />
                <CIStatusPanel />
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
    </I18nProvider>
  );
}
