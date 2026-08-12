/**
 * WizDev — GitHub API Client (Server-side only)
 * Handles authentication, rate limiting, and error normalization.
 */

export const GITHUB_API = "https://api.github.com";

// ── Config ────────────────────────────────────────────────
export function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN || "";
  const owner = process.env.GITHUB_OWNER || "";
  const reposRaw = process.env.GITHUB_REPOS || "";
  const repos = reposRaw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  return { token, owner, repos, isConfigured: !!(token && owner && repos.length > 0) };
}

// ── Fetch helper ─────────────────────────────────────────
export async function ghFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const { token } = getGitHubConfig();

  const res = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    // Next.js: cache for 60 seconds
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new GHError(res.status, path, text);
  }

  return res.json() as Promise<T>;
}

export class GHError extends Error {
  constructor(
    public readonly status: number,
    public readonly path: string,
    public readonly body: string
  ) {
    super(`GitHub API ${status} on ${path}`);
  }
}

// ── Date helpers ─────────────────────────────────────────
export function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// ── GitHub types (subset) ────────────────────────────────
export interface GHPullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  draft: boolean;
  user: { login: string; avatar_url: string };
  created_at: string;
  updated_at: string;
  labels: { name: string; color: string }[];
  additions?: number;
  deletions?: number;
  comments: number;
  review_comments: number;
  requested_reviewers: { login: string }[];
  head: { repo: { name: string }; ref: string };
  base: { ref: string };
  html_url: string;
}

export interface GHIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  labels: { name: string; color: string }[];
  created_at: string;
  comments: number;
  pull_request?: object; // present if it's actually a PR
}

export interface GHWorkflowRun {
  id: number;
  name: string;
  status: "queued" | "in_progress" | "completed";
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null;
  created_at: string;
  updated_at: string;
  run_started_at: string;
  html_url: string;
  head_branch: string;
  repository: { name: string };
}

export interface GHCommitActivity {
  days: number[]; // [sun, mon, tue, wed, thu, fri, sat]
  total: number;
  week: number; // unix timestamp
}

export interface GHMilestone {
  id: number;
  number: number;
  title: string;
  description: string | null;
  state: "open" | "closed";
  open_issues: number;
  closed_issues: number;
  due_on: string | null;
  html_url: string;
}

export interface GHReview {
  id: number;
  state: "APPROVED" | "CHANGES_REQUESTED" | "COMMENTED" | "PENDING";
  submitted_at: string;
}
