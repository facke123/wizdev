import { NextResponse } from "next/server";
import {
  getGitHubConfig,
  ghFetch,
  GHIssue,
  GHPullRequest,
  GHCommitActivity,
  daysAgo,
} from "@/lib/github-client";
import type { OvernightSummary } from "@/hooks/use-github";

const DEMO: OvernightSummary = { commits: 7, prsMerged: 2, newIssues: 1, isDemo: true };

export async function GET() {
  const cfg = getGitHubConfig();

  if (!cfg.isConfigured) {
    return NextResponse.json(DEMO);
  }

  try {
    const since = daysAgo(1).toISOString();

    const results = await Promise.allSettled(
      cfg.repos.map(async (repo) => {
        const [closedPRs, newIssues, commitActivity] = await Promise.all([
          ghFetch<GHPullRequest[]>(
            `/repos/${cfg.owner}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=30`
          ),
          ghFetch<GHIssue[]>(
            `/repos/${cfg.owner}/${repo}/issues?state=open&sort=created&direction=desc&since=${since}&per_page=30`
          ),
          ghFetch<GHCommitActivity[]>(
            `/repos/${cfg.owner}/${repo}/stats/commit_activity`
          ),
        ]);

        // PRs merged in last 24h
        const mergedPRs = closedPRs.filter(
          (pr) => pr.updated_at > since
        ).length;

        // New issues (not PRs) in last 24h
        const issueCount = newIssues.filter((i) => !i.pull_request).length;

        // Commits yesterday from activity stats
        const lastWeek = commitActivity[commitActivity.length - 1];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dayIdx = yesterday.getDay(); // 0=sun
        const commits = lastWeek?.days?.[dayIdx] ?? 0;

        return { mergedPRs, issueCount, commits };
      })
    );

    let totalCommits = 0;
    let totalMerged = 0;
    let totalNewIssues = 0;

    for (const r of results) {
      if (r.status !== "fulfilled") continue;
      totalCommits += r.value.commits;
      totalMerged += r.value.mergedPRs;
      totalNewIssues += r.value.issueCount;
    }

    return NextResponse.json({
      commits: totalCommits,
      prsMerged: totalMerged,
      newIssues: totalNewIssues,
      isDemo: false,
    });
  } catch (err) {
    console.error("[/api/github/overnight]", err);
    return NextResponse.json(DEMO);
  }
}
