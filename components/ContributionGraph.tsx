import { GitHubContributions } from "@/types/github";
import { cn } from "@/lib/utils";

type ContributionGraphProps = {
  contributions: GitHubContributions;
};

function level(count: number) {
  if (count === 0) return "bg-secondary/70";
  if (count < 3) return "bg-cyan-900";
  if (count < 6) return "bg-cyan-700";
  if (count < 10) return "bg-cyan-500";
  return "bg-emerald-400";
}

export default function ContributionGraph({
  contributions
}: ContributionGraphProps) {
  const weeks = contributions.weeks.slice(-26);

  if (!weeks.length) {
    return (
      <div className="rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">
        Add `GITHUB_TOKEN` to show the live contribution heatmap.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background/35 p-4">
      <div className="flex min-w-max gap-1">
        {weeks.map((week, weekIndex) => (
          <div className="grid grid-rows-7 gap-1" key={weekIndex}>
            {week.contributionDays.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className={cn(
                  "h-3 w-3 rounded-[3px] ring-1 ring-white/5",
                  level(day.contributionCount)
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
