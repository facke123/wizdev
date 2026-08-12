import { NextResponse } from "next/server";
import { getGitHubConfig, ghFetch, GHCommitActivity } from "@/lib/github-client";
import type { GitHubActivity } from "@/hooks/use-github";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Demo fallback ─────────────────────────────────────────
const DEMO_ACTIVITY: GitHubActivity[] = [
  { day: "Mon", commits: 12, prs: 3, reviews: 5 },
  { day: "Tue", commits: 19, prs: 5, reviews: 8 },
  { day: "Wed", commits: 8,  prs: 2, reviews: 4 },
  { day: "Thu", commits: 15, prs: 4, reviews: 6 },
  { day: "Fri", commits: 22, prs: 6, reviews: 9 },
  { day: "Sat", commits: 5,  prs: 1, reviews: 2 },
  { day: "Sun", commits: 3,  prs: 0, reviews: 1 },
];

export async function GET() {
  const cfg = getGitHubConfig();

  if (!cfg.isConfigured) {
    return NextResponse.json(DEMO_ACTIVITY);
  }

  try {
    // Fetch commit activity for all repos in parallel
    const activityResults = await Promise.allSettled(
      cfg.repos.map((repo) =>
        ghFetch<GHCommitActivity[]>(
          `/repos/${cfg.owner}/${repo}/stats/commit_activity`
        )
      )
    );

    // Aggregate the most recent week across repos
    const aggregated = new Array(7).fill(0) as number[];

    for (const result of activityResults) {
      if (result.status !== "fulfilled") continue;
      const data = result.value;
      if (!Array.isArray(data) || data.length === 0) continue;

      // Last week = last element
      const lastWeek = data[data.length - 1];
      if (!lastWeek?.days) continue;

      // days array: [sun, mon, tue, wed, thu, fri, sat]
      for (let i = 0; i < 7; i++) {
        aggregated[i] += lastWeek.days[i] ?? 0;
      }
    }

    // Also fetch PRs opened in the last 7 days per-day
    // GitHub's search API lets us query by date
    const prsByDay = new Array(7).fill(0) as number[];
    const now = new Date();

    const prSearchResults = await Promise.allSettled(
      cfg.repos.map((repo) =>
        ghFetch<{ items: { created_at: string }[] }>(
          `/search/issues?q=repo:${cfg.owner}/${repo}+type:pr+created:>${new Date(now.getTime() - 7 * 86400_000).toISOString().split("T")[0]}&per_page=100`
        )
      )
    );

    for (const result of prSearchResults) {
      if (result.status !== "fulfilled") continue;
      for (const item of result.value.items ?? []) {
        const dayOfWeek = new Date(item.created_at).getDay(); // 0=sun
        prsByDay[dayOfWeek]++;
      }
    }

    // Build output ordered Mon→Sun (skip Sun if quiet)
    const today = new Date().getDay(); // 0=sun
    const orderedDays: GitHubActivity[] = [];
    for (let i = 1; i <= 7; i++) {
      const dayIdx = (today - 7 + i + 7) % 7;
      orderedDays.push({
        day: DAYS[dayIdx].slice(0, 3),
        commits: aggregated[dayIdx],
        prs: prsByDay[dayIdx],
        reviews: Math.round(aggregated[dayIdx] * 0.4), // estimate
      });
    }

    return NextResponse.json(orderedDays);
  } catch (err) {
    console.error("[/api/github/activity]", err);
    return NextResponse.json(DEMO_ACTIVITY);
  }
}
