"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── Types ─────────────────────────────────────────────────

export interface GitHubStats {
  openPRs: number;
  activeIssues: number;
  ciPassRate: number;
  avgReviewHours: number;
  totalRepos: number;
  isDemo: boolean;
}

export interface GitHubPR {
  id: number;
  number: number;
  title: string;
  repo: string;
  author: string;
  avatarUrl: string;
  status: "review" | "approved" | "changes" | "draft";
  additions: number;
  deletions: number;
  comments: number;
  createdAt: string;
  url: string;
  labels: { name: string; color: string }[];
}

export interface GitHubWorkflow {
  id: number;
  name: string;
  repo: string;
  branch: string;
  status: "success" | "failure" | "building" | "cancelled";
  duration: string;
  url: string;
}

export interface GitHubActivity {
  day: string;
  commits: number;
  prs: number;
  reviews: number;
}

export interface GitHubMilestone {
  id: number;
  title: string;
  description: string;
  repo: string;
  openIssues: number;
  closedIssues: number;
  totalIssues: number;
  progressPct: number;
  dueOn: string | null;
  url: string;
}

export interface OvernightSummary {
  commits: number;
  prsMerged: number;
  newIssues: number;
  isDemo: boolean;
}

// ── Generic fetch hook ────────────────────────────────────

function useApiData<T>(
  url: string,
  refreshInterval = 60_000
): { data: T | null; loading: boolean; error: string | null; refresh: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (mountedRef.current) {
      setLoading(true);
      setError(null);
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as T;

      if (mountedRef.current) {
        setData(json);
      }
    } catch (err: unknown) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();

    let timer: ReturnType<typeof setInterval> | undefined;
    if (refreshInterval > 0) {
      timer = setInterval(fetchData, refreshInterval);
    }

    return () => {
      mountedRef.current = false;
      if (timer) clearInterval(timer);
    };
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refresh: fetchData };
}

// ── Exported hooks ────────────────────────────────────────

export function useGitHubStats() {
  return useApiData<GitHubStats>("/api/github/stats");
}

export function useGitHubPulls() {
  return useApiData<GitHubPR[]>("/api/github/pulls");
}

export function useGitHubWorkflows() {
  return useApiData<GitHubWorkflow[]>("/api/github/workflows");
}

export function useGitHubActivity() {
  return useApiData<GitHubActivity[]>("/api/github/activity");
}

export function useGitHubMilestones() {
  return useApiData<GitHubMilestone[]>("/api/github/milestones");
}

export function useOvernightSummary() {
  return useApiData<OvernightSummary>("/api/github/overnight");
}
