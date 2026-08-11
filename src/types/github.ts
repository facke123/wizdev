/**
 * GitHub Data Types for WizDev
 */

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  draft: boolean;
  additions: number;
  deletions: number;
  changed_files: number;
  labels: { name: string; color: string }[];
  requested_reviewers: GitHubUser[];
  repo_name?: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  labels: { name: string; color: string }[];
  assignees: GitHubUser[];
  comments: number;
  repo_name?: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    login: string;
    avatar_url: string;
    date: string;
  };
  html_url: string;
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  repo_name?: string;
}

export interface GitHubWorkflowRun {
  id: number;
  name: string;
  status: "completed" | "in_progress" | "queued" | "waiting";
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  head_branch: string;
  repo_name?: string;
}

// Aggregated stats
export interface DailyStats {
  date: string;
  commits: number;
  prsOpened: number;
  prsMerged: number;
  issuesClosed: number;
  linesAdded: number;
  linesDeleted: number;
}

export interface RepoHealth {
  repo: GitHubRepo;
  openPRs: number;
  stalePRs: number; // PRs open > 7 days
  failingCI: number;
  avgReviewTime: number; // hours
  healthScore: number; // 0-100
}
