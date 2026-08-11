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
    <div className="flex h-screen overflow-hidden bg-[#080a11]">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content View */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <Header />

        <div className="p-8 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
          {/* Top Metric Cards */}
          <StatsOverview />

          {/* AI Executive Briefing & Quick Copilot Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AIBriefing />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Engineering Velocity Chart & CI/CD Pipelines */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <div>
              <CIStatusPanel />
            </div>
          </div>

          {/* Active Pull Requests Section */}
          <PullRequestList />
        </div>
      </main>
    </div>
  );
}
