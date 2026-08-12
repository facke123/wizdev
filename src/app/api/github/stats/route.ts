import { NextResponse } from "next/server";
import {
  getGitHubConfig,
  ghFetch,
  GHPullRequest,
  GHWorkflowRun,
  GHIssue,
  GHReview,
  daysAgo,
} from "@/lib/github-client";

// ── Demo fallback ─────────────────────────────────────────
const DEMO_STATS = {
  openPRs: 12,
  activeIssues: 28,
  ciPassRate: 94.2,
  avgReviewHours: 4.2,
  totalRepos: 3,
  isDemo: true,
};

export async function GET() {
  const cfg = getGitHubConfig();

  if (!cfg.isConfigured) {
    return NextResponse.json(DEMO_STATS);
  }

  try {
    const since = daysAgo(7).toISOString();

    // Fetch PRs, Issues, and workflow runs for all repos in parallel
    const results = await Promise.allSettled(
      cfg.repos.map(async (repo) => {
        const [prs, issues, workflows] = await Promise.all([
          ghFetch<GHPullRequest[]>(
            `/repos/${cfg.owner}/${repo}/pulls?state=open&per_page=100`
          ),
          ghFetch<GHIssue[]>(
            `/repos/${cfg.owner}/${repo}/issues?state=open&per_page=100`
          ),
          ghFetch<{ workflow_runs: GHWorkflowRun[] }>(
            `/repos/${cfg.owner}/${repo}/actions/runs?per_page=30&created=%3E${since}`
          ),
        ]);

        return { repo, prs, issues, workflows: workflows.workflow_runs };
      })
    );

    const repoData = results
      .filter((r): r is PromiseFulfilledResult<{
        repo: string;
        prs: GHPullRequest[];
        issues: GHIssue[];
        workflows: GHWorkflowRun[];
      }> => r.status === "fulfilled")
      .map((r) => r.value);

    // Open PRs (exclude issues that aren't PRs)
    const openPRs = repoData.reduce((sum, d) => sum + d.prs.length, 0);

    // Active issues (exclude PRs from the issues list)
    const activeIssues = repoData.reduce(
      (sum, d) => sum + d.issues.filter((i) => !i.pull_request).length,
      0
    );

    // CI Pass Rate: completed runs in the last 7 days
    const allRuns = repoData.flatMap((d) => d.workflows);
    const completedRuns = allRuns.filter((r) => r.status === "completed");
    const successRuns = completedRuns.filter((r) => r.conclusion === "success");
    const ciPassRate =
      completedRuns.length > 0
        ? Math.round((successRuns.length / completedRuns.length) * 1000) / 10
        : 100;

    // Average review time: fetch PR reviews for a sample of merged/closed PRs
    const samplePRs = repoData.slice(0, 2).flatMap((d) => d.prs.slice(0, 5));
    let totalReviewHours = 0;
    let reviewCount = 0;

    const reviewResults = await Promise.allSettled(
      samplePRs.map(async (pr) => {
        const repoName = pr.head.repo?.name || cfg.repos[0];
        return ghFetch<GHReview[]>(
          `/repos/${cfg.owner}/${repoName}/pulls/${pr.number}/reviews`
        );
      })
    );

    for (let i = 0; i < reviewResults.length; i++) {
      const reviewResult = reviewResults[i];
      if (reviewResult.status === "fulfilled" && reviewResult.value.length > 0) {
        const pr = samplePRs[i];
        const firstReview = reviewResult.value[0];
        const diffMs =
          new Date(firstReview.submitted_at).getTime() -
          new Date(pr.created_at).getTime();
        const diffHours = diffMs / 3_600_000;
        if (diffHours > 0 && diffHours < 240) {
          // cap at 10 days
          totalReviewHours += diffHours;
          reviewCount++;
        }
      }
    }

    const avgReviewHours =
      reviewCount > 0
        ? Math.round((totalReviewHours / reviewCount) * 10) / 10
        : 4.2;

    return NextResponse.json({
      openPRs,
      activeIssues,
      ciPassRate,
      avgReviewHours,
      totalRepos: cfg.repos.length,
      isDemo: false,
    });
  } catch (err) {
    console.error("[/api/github/stats]", err);
    return NextResponse.json(DEMO_STATS);
  }
}
