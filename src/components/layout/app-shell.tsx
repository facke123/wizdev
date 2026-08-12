"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="flex min-h-[100dvh] w-full overflow-x-hidden"
      style={{ background: "var(--surface-root)" }}
    >
      <div className="bg-mesh" />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-7 lg:px-9 py-8 sm:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
