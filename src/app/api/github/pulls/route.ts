import { NextResponse } from "next/server";
import {
  getGitHubConfig,
  ghFetch,
  GHPullRequest,
  GHReview,
  timeAgo,
} from "@/lib/github-client";
import type { GitHubPR } from "@/hooks/use-github";

// ── Demo fallback ─────────────────────────────────────────
const DEMO_PULLS: GitHubPR[] = [
  {
    id: 1, number: 142,
    title: "feat: Add user analytics dashboard and retention funnel charts",
    repo: "wizdev-app", author: "alice",
    avatarUrl: "", status: "review",
    additions: 342, deletions: 28, comments: 5,
    createdAt: "2h ago", url: "#",
    labels: [{ name: "feature", color: "9d91fc" }, { name: "frontend", color: "38bdf8" }],
  },
  {
    id: 2, number: 156,
    title: "fix: Memory leak in WebSocket connection handler pool",
    repo: "wizdev-api", author: "bob",
    avatarUrl: "", status: "approved",
    additions: 23, deletions: 45, comments: 3,
    createdAt: "5h ago", url: "#",
    labels: [{ name: "bug", color: "f87171" }, { name: "critical", color: "fbbf24" }],
  },
  {
    id: 3, number: 158,
    title: "refactor: Migrate auth provider layer to OAuth 2.1 spec",
    repo: "wizdev-api", author: "charlie",
    avatarUrl: "", status: "changes",
    additions: 567, deletions: 312, comments: 12,
    createdAt: "1d ago", url: "#",
    labels: [{ name: "refactor", color: "c084fc" }],
  },
  {
    id: 4, number: 160,
    title: "WIP: Implement AI-powered code review suggestions engine",
    repo: "wizdev-app", author: "alice",
    avatarUrl: "", status: "draft",
    additions: 128, deletions: 0, comments: 0,
    createdAt: "3h ago", url: "#",
    labels: [{ name: "ai", color: "34d399" }],
  },
];

function mapReviewStatus(
  pr: GHPullRequest,
  reviews: GHReview[]
): GitHubPR["status"] {
  if (pr.draft) return "draft";
  const latest = new Map<string, GHReview["state"]>();
  for (const r of reviews) {
    if (r.state !== "COMMENTED") latest.set(r.state, r.state);
  }
  if (latest.has("CHANGES_REQUESTED")) return "changes";
  if (latest.has("APPROVED")) return "approved";
  return "review";
}

export async function GET() {
  const cfg = getGitHubConfig();

  if (!cfg.isConfigured) {
    return NextResponse.json(DEMO_PULLS);
  }

  try {
    const allPRs: GitHubPR[] = [];

    for (const repo of cfg.repos) {
      const prs = await ghFetch<GHPullRequest[]>(
        `/repos/${cfg.owner}/${repo}/pulls?state=open&per_page=20&sort=updated&direction=desc`
      );

      // Fetch reviews for each PR (in parallel, capped at first 10)
      const sample = prs.slice(0, 10);
      const reviewResults = await Promise.allSettled(
        sample.map((pr) =>
          ghFetch<GHReview[]>(
            `/repos/${cfg.owner}/${repo}/pulls/${pr.number}/reviews`
          )
        )
      );

      for (let i = 0; i < sample.length; i++) {
        const pr = sample[i];
        const reviewRes = reviewResults[i];
        const reviews = reviewRes.status === "fulfilled" ? reviewRes.value : [];

        allPRs.push({
          id: pr.id,
          number: pr.number,
          title: pr.title,
          repo,
          author: pr.user.login,
          avatarUrl: pr.user.avatar_url,
          status: mapReviewStatus(pr, reviews),
          additions: pr.additions ?? 0,
          deletions: pr.deletions ?? 0,
          comments: (pr.comments ?? 0) + (pr.review_comments ?? 0),
          createdAt: timeAgo(pr.created_at),
          url: pr.html_url,
          labels: pr.labels.map((l) => ({
            name: l.name,
            color: `#${l.color}`,
          })),
        });
      }
    }

    // Sort by most recently updated
    allPRs.sort((a, b) => (a.number > b.number ? -1 : 1));

    return NextResponse.json(allPRs.slice(0, 10));
  } catch (err) {
    console.error("[/api/github/pulls]", err);
    return NextResponse.json(DEMO_PULLS);
  }
}
