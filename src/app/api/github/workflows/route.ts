import { NextResponse } from "next/server";
import { getGitHubConfig, ghFetch, GHWorkflowRun } from "@/lib/github-client";
import type { GitHubWorkflow } from "@/hooks/use-github";

// ── Demo fallback ─────────────────────────────────────────
const DEMO_WORKFLOWS: GitHubWorkflow[] = [
  { id: 1, name: "Build & Integration Tests", repo: "wizdev-app", branch: "main",    status: "success",   duration: "2m 34s", url: "#" },
  { id: 2, name: "Deploy Staging Cluster",    repo: "wizdev-api", branch: "main",    status: "failure",   duration: "1m 12s", url: "#" },
  { id: 3, name: "ESLint & TypeScript Check", repo: "wizdev-app", branch: "feat/analytics", status: "success", duration: "48s", url: "#" },
  { id: 4, name: "Docker Image Build",        repo: "wizdev-worker", branch: "main", status: "building",  duration: "1m 45s", url: "#" },
  { id: 5, name: "Security Scan (Snyk)",      repo: "wizdev-app", branch: "main",    status: "success",   duration: "3m 10s", url: "#" },
];

function mapStatus(run: GHWorkflowRun): GitHubWorkflow["status"] {
  if (run.status === "in_progress" || run.status === "queued") return "building";
  if (run.conclusion === "success") return "success";
  if (run.conclusion === "failure") return "failure";
  if (run.conclusion === "cancelled") return "cancelled";
  return "building";
}

function formatDuration(startedAt: string, updatedAt: string): string {
  const ms = new Date(updatedAt).getTime() - new Date(startedAt).getTime();
  if (ms < 0) return "—";
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export async function GET() {
  const cfg = getGitHubConfig();

  if (!cfg.isConfigured) {
    return NextResponse.json(DEMO_WORKFLOWS);
  }

  try {
    const allWorkflows: GitHubWorkflow[] = [];

    const results = await Promise.allSettled(
      cfg.repos.map((repo) =>
        ghFetch<{ workflow_runs: GHWorkflowRun[] }>(
          `/repos/${cfg.owner}/${repo}/actions/runs?per_page=10`
        )
      )
    );

    for (let i = 0; i < cfg.repos.length; i++) {
      const result = results[i];
      if (result.status !== "fulfilled") continue;

      const repo = cfg.repos[i];
      const runs = result.value.workflow_runs;

      // De-duplicate: keep only latest run per workflow name
      const seen = new Set<string>();
      for (const run of runs) {
        if (seen.has(run.name)) continue;
        seen.add(run.name);

        allWorkflows.push({
          id: run.id,
          name: run.name,
          repo,
          branch: run.head_branch,
          status: mapStatus(run),
          duration: formatDuration(run.run_started_at, run.updated_at),
          url: run.html_url,
        });
      }
    }

    return NextResponse.json(allWorkflows.slice(0, 8));
  } catch (err) {
    console.error("[/api/github/workflows]", err);
    return NextResponse.json(DEMO_WORKFLOWS);
  }
}
