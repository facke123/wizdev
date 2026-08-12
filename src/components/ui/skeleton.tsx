"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn("rounded-lg animate-pulse", className)}
      style={{ background: "rgba(255,255,255,0.06)", ...style }}
    />
  );
}

export function SkeletonText({ lines = 2, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3"
          style={{ width: i === lines - 1 ? "65%" : "100%" } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn("rounded-xl p-5 space-y-3", className)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div
      className="stat-card"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(15,23,42,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <Skeleton className="flex-1 h-7 max-w-[80px]" />
        <Skeleton className="w-12 h-5 rounded-full" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-2.5 w-32 mb-3" />
      <div className="pt-2 border-t border-white/[0.05] space-y-2">
        <Skeleton className="h-1 w-full rounded-full" />
        <Skeleton className="h-2.5 w-28" />
      </div>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="rounded-xl p-4 flex items-center gap-3"
      style={{
        background: "rgba(251,113,133,0.07)",
        border: "1px solid rgba(251,113,133,0.18)",
      }}
    >
      <span className="text-lg shrink-0">⚠️</span>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-[#fca5a5]">Failed to load data</p>
        <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#fca5a5] hover:text-white transition-colors"
          style={{ background: "rgba(251,113,133,0.12)", border: "1px solid rgba(251,113,133,0.22)" }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function DemoBanner() {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium"
      style={{
        background: "rgba(251,191,36,0.08)",
        border: "1px solid rgba(251,191,36,0.20)",
        color: "#fcd34d",
      }}
    >
      <span>🔧</span>
      <span>Demo Mode — configure <code className="font-mono">.env.local</code> with your GitHub token</span>
    </div>
  );
}
