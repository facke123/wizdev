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

        {/* Full-Screen Scrollable Content with Generous Inter-Module Spacing */}
        <main className="flex-1 overflow-y-auto w-full">
          <div className="w-full p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Top Metric Cards (Full Width Row) */}
            <StatsOverview />

            {/* Unified 2-Column Dashboard Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 w-full items-start">
              {/* Main Feed Column (Left — 8/12) */}
              <div className="xl:col-span-8 space-y-8 sm:space-y-10 lg:space-y-12 w-full min-w-0">
                {/* 1. Daily Executive Briefing */}
                <AIBriefing />

                {/* 2. Engineering Velocity Chart */}
                <ActivityChart />

                {/* 3. Active Pull Requests */}
                <PullRequestList />
              </div>

              {/* Tools & Status Sidebar Column (Right — 4/12) */}
              <div className="xl:col-span-4 space-y-8 sm:space-y-10 lg:space-y-12 w-full min-w-0">
                {/* 1. Quick Copilot Actions */}
                <QuickActions />

                {/* 2. CI/CD Pipelines Status */}
                <CIStatusPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
