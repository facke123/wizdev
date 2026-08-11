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

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-[100dvh] w-full bg-[var(--surface-root)] overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area — Full Screen Width */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header />

        {/* Full-Screen Scrollable Content */}
        <main className="flex-1 overflow-y-auto w-full">
          <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Top Metric Cards */}
            <StatsOverview />

            {/* AI Executive Briefing & Quick Copilot Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
              <div className="xl:col-span-2 w-full">
                <AIBriefing />
              </div>
              <div className="w-full">
                <QuickActions />
              </div>
            </div>

            {/* Engineering Velocity Chart & CI/CD Pipelines */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
              <div className="xl:col-span-2 w-full">
                <ActivityChart />
              </div>
              <div className="w-full">
                <CIStatusPanel />
              </div>
            </div>

            {/* Active Pull Requests Section */}
            <div className="w-full">
              <PullRequestList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
