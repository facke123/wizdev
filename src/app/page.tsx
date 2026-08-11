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
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="flex-1 overflow-y-auto">
        <Header />

        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
          {/* Stats Overview Row */}
          <StatsOverview />

          {/* AI Briefing + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIBriefing />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Activity Chart + CI Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <div>
              <CIStatusPanel />
            </div>
          </div>

          {/* Pull Requests */}
          <PullRequestList />
        </div>
      </main>
    </div>
  );
}
