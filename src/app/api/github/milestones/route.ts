import { NextResponse } from "next/server";
import { getGitHubConfig, ghFetch, GHMilestone } from "@/lib/github-client";
import type { GitHubMilestone } from "@/hooks/use-github";

// ── Demo fallback ─────────────────────────────────────────
const DEMO_MILESTONES: GitHubMilestone[] = [
  {
    id: 1, title: "Q1 Milestone", description: "Core platform release",
    repo: "wizdev-app", openIssues: 8, closedIssues: 17, totalIssues: 25,
    progressPct: 68, dueOn: null, url: "#",
  },
  {
    id: 2, title: "Security Hardening", description: "OAuth + audit logs",
    repo: "wizdev-api", openIssues: 3, closedIssues: 7, totalIssues: 10,
    progressPct: 70, dueOn: null, url: "#",
  },
];

export async function GET() {
  const cfg = getGitHubConfig();

  if (!cfg.isConfigured) {
    return NextResponse.json(DEMO_MILESTONES);
  }

  try {
    const milestones: GitHubMilestone[] = [];

    const results = await Promise.allSettled(
      cfg.repos.map((repo) =>
        ghFetch<GHMilestone[]>(
          `/repos/${cfg.owner}/${repo}/milestones?state=open&per_page=5&sort=due_on&direction=asc`
        )
      )
    );

    for (let i = 0; i < cfg.repos.length; i++) {
      const result = results[i];
      if (result.status !== "fulfilled") continue;
      const repo = cfg.repos[i];

      for (const m of result.value) {
        const total = m.open_issues + m.closed_issues;
        const progressPct = total > 0 ? Math.round((m.closed_issues / total) * 100) : 0;

        milestones.push({
          id: m.id,
          title: m.title,
          description: m.description ?? "",
          repo,
          openIssues: m.open_issues,
          closedIssues: m.closed_issues,
          totalIssues: total,
          progressPct,
          dueOn: m.due_on,
          url: m.html_url,
        });
      }
    }

    // Sort by progress descending (most advanced first)
    milestones.sort((a, b) => b.progressPct - a.progressPct);

    return NextResponse.json(milestones.slice(0, 3));
  } catch (err) {
    console.error("[/api/github/milestones]", err);
    return NextResponse.json(DEMO_MILESTONES);
  }
}
