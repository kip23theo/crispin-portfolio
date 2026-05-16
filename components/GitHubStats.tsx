import {
  Activity,
  Code2,
  GitFork,
  Github,
  Star,
  TrendingUp
} from "lucide-react";
import ContributionGraph from "@/components/ContributionGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubStats as GitHubStatsType } from "@/types/github";

type GitHubStatsProps = {
  stats: GitHubStatsType;
};

export default function GitHubStats({ stats }: GitHubStatsProps) {
  const statCards = [
    {
      label: "Live repos",
      value: stats.totals.repos,
      icon: Github
    },
    {
      label: "Total stars",
      value: stats.totals.stars,
      icon: Star
    },
    {
      label: "Current streak",
      value: stats.contributions.currentStreak,
      icon: TrendingUp
    },
    {
      label: "Total forks",
      value: stats.totals.forks,
      icon: GitFork
    }
  ];

  return (
    <section className="section-shell" id="github">
      <div className="section-kicker">
        <Activity className="h-4 w-4" />
        Live GitHub Sync
      </div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="section-title">Engineering signal, automatically updated.</h2>
          <p className="section-copy">
            Repository metrics, contribution activity, languages, and recent
            commits are pulled from GitHub APIs at runtime.
          </p>
        </div>
        <a
          href="https://github.com/kip23theo"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          View GitHub <Github className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {statCards.map((item) => (
          <Card key={item.label} className="rounded-lg">
            <CardContent className="p-5">
              <item.icon className="mb-5 h-5 w-5 text-primary" />
              <div className="font-display text-3xl font-bold">{item.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Contribution heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <ContributionGraph contributions={stats.contributions} />
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{stats.contributions.totalContributions} contributions this year</span>
              <span>Longest streak: {stats.contributions.longestStreak} days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Top languages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.languages.length ? (
              stats.languages.map((language) => (
                <div key={language.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{language.name}</span>
                    <span className="text-muted-foreground">{language.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${language.percentage}%`,
                        backgroundColor: language.color ?? undefined
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Language breakdown appears after GitHub data loads.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 rounded-lg">
        <CardHeader>
          <CardTitle>Recent commits</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {stats.recentActivity.length ? (
            stats.recentActivity.map((activity) => (
              <a
                href={activity.url}
                target="_blank"
                rel="noreferrer"
                key={`${activity.repo}-${activity.date}`}
                className="rounded-lg border border-border bg-background/35 p-4 transition hover:border-primary/60 hover:bg-primary/5"
              >
                <div className="text-sm font-semibold text-primary">{activity.repo}</div>
                <div className="mt-2 line-clamp-2 text-sm text-foreground">
                  {activity.message}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
              </a>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Recent commits are available when GitHub API access is enabled.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
