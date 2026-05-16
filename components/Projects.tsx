import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { GitHubStats } from "@/types/github";

type ProjectsProps = {
  stats: GitHubStats;
};

const featuredProjects = [
  {
    title: "Career Copilot",
    description: "AI-powered career analytics platform",
    query: ["career", "copilot"],
    tech: ["FastAPI", "MongoDB", "React", "NLP", "ATS Analysis"]
  },
  {
    title: "Enterprise Order Fulfillment Analytics Platform",
    description: "AI operations platform for fulfillment intelligence",
    query: ["order", "fulfillment", "analytics"],
    tech: ["Django REST", "PostgreSQL", "Redis", "Celery", "Dashboards"]
  },
  {
    title: "Twitter Sentiment Analysis",
    description: "NLP sentiment pipeline for social text classification",
    query: ["twitter", "sentiment"],
    tech: ["Python", "NLP", "Scikit-learn", "TF-IDF"]
  },
  {
    title: "Cognitive Games",
    description: "Interactive brain training and performance tracking",
    query: ["cognitive", "games"],
    tech: ["JavaScript", "Game Logic", "UX"]
  },
  {
    title: "AI Interactive Learning Assistant",
    description: "AI-powered learning support experience",
    query: ["learning", "assistant", "ai"],
    tech: ["AI", "React", "Education Tech"]
  },
  {
    title: "Inventory Management & Billing System",
    description: "Expired-product billing prevention system built in Java",
    query: ["inventory", "billing"],
    tech: ["Java", "SQL", "Desktop App"]
  },
  {
    title: "HealthWatch Blockchain",
    description: "Blockchain-powered healthcare innovation platform",
    query: ["healthwatch", "blockchain"],
    tech: ["Blockchain", "Healthcare", "Product Strategy"]
  }
];

function findRepo(stats: GitHubStats, query: string[]) {
  const repos = [...stats.pinnedRepos, ...stats.repos];
  return repos.find((repo) => {
    const haystack = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
    return query.every((term) => haystack.includes(term));
  });
}

export default function Projects({ stats }: ProjectsProps) {
  return (
    <section className="section-shell" id="projects">
      <div className="section-kicker">Projects</div>
      <h2 className="section-title">Featured systems and live repositories.</h2>
      <p className="section-copy">
        Project cards blend curated product context with live GitHub metadata
        whenever a matching repository exists.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => {
          const repo = findRepo(stats, project.query);
          const topics =
            repo?.repositoryTopics?.nodes.map((node) => node.topic.name) ?? [];
          const languages =
            repo?.languages?.edges.map((edge) => edge.node.name) ??
            (repo?.primaryLanguage ? [repo.primaryLanguage.name] : []);
          const tech = [...new Set([...project.tech, ...topics, ...languages])].slice(
            0,
            8
          );

          return (
            <article
              key={project.title}
              className="group overflow-hidden rounded-lg border border-border bg-card/55 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
            >
              <div className="aspect-[16/9] border-b border-border bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.9),rgba(8,47,73,0.45))] p-5">
                <div className="flex h-full items-end justify-between">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">
                    {repo ? "GitHub linked" : "Case study"}
                  </div>
                  <div className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                    AI / Full Stack
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">{project.title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">
                  {repo?.description ?? project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-background/45 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {repo?.stargazerCount ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {repo?.forkCount ?? 0}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {repo ? (
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} repository`}
                        className="rounded-md border border-border p-2 text-muted-foreground transition hover:border-primary/60 hover:text-primary"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    ) : null}
                    {repo?.homepageUrl ? (
                      <a
                        href={repo.homepageUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="rounded-md border border-border p-2 text-muted-foreground transition hover:border-primary/60 hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-14">
        <h3 className="font-display text-2xl font-bold">Latest repositories</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {stats.repos.slice(0, 6).map((repo) => (
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              key={repo.id}
              className="rounded-lg border border-border bg-card/45 p-4 transition hover:border-primary/60 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">{repo.name}</span>
                <Github className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {repo.description ?? "Public repository"}
              </p>
              <div className="mt-4 text-xs text-muted-foreground">
                Updated {new Date(repo.updatedAt).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
