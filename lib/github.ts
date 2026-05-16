import {
  ContributionDay,
  GitHubActivity,
  GitHubContributions,
  GitHubLanguage,
  GitHubProfile,
  GitHubRepo,
  GitHubStats
} from "@/types/github";

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = process.env.GITHUB_USERNAME ?? "kip23theo";
const TOKEN = process.env.GITHUB_TOKEN;

const graphqlHeaders = {
  "Content-Type": "application/json",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

const restHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

async function githubGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  if (!TOKEN) {
    return null;
  }

  let response: Response;
  try {
    response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: graphqlHeaders,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 900 }
    });
  } catch {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    return null;
  }

  return payload.data ?? null;
}

async function githubREST<T>(path: string): Promise<T | null> {
  let response: Response;
  try {
    response = await fetch(`${GITHUB_API}${path}`, {
      headers: restHeaders,
      next: { revalidate: 900 }
    });
  } catch {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

function normalizeRestRepo(repo: any): GitHubRepo {
  return {
    id: String(repo.id),
    name: repo.name,
    nameWithOwner: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    homepageUrl: repo.homepage,
    stargazerCount: repo.stargazers_count ?? 0,
    forkCount: repo.forks_count ?? 0,
    primaryLanguage: repo.language
      ? {
          name: repo.language,
          color: null
        }
      : null,
    repositoryTopics: {
      nodes: (repo.topics ?? []).map((name: string) => ({
        topic: { name }
      }))
    },
    languages: { edges: [] },
    updatedAt: repo.updated_at,
    createdAt: repo.created_at
  };
}

export async function fetchProfile(): Promise<GitHubProfile | null> {
  const data = await githubGraphQL<{
    user: GitHubProfile;
  }>(
    `
      query Profile($login: String!) {
        user(login: $login) {
          login
          name
          avatarUrl
          bio
          url
          repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
            totalCount
          }
          followers {
            totalCount
          }
        }
      }
    `,
    { login: USERNAME }
  );

  if (data?.user) {
    return data.user;
  }

  const rest = await githubREST<any>(`/users/${USERNAME}`);
  if (!rest) {
    return null;
  }

  return {
    login: rest.login,
    name: rest.name ?? "Crispin Theophane",
    avatarUrl: rest.avatar_url,
    bio: rest.bio,
    url: rest.html_url,
    repositories: { totalCount: rest.public_repos ?? 0 },
    followers: { totalCount: rest.followers ?? 0 }
  };
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const data = await githubGraphQL<{
    user: {
      repositories: {
        nodes: GitHubRepo[];
      };
    };
  }>(
    `
      query Repos($login: String!) {
        user(login: $login) {
          repositories(
            first: 40,
            ownerAffiliations: OWNER,
            privacy: PUBLIC,
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              id
              name
              nameWithOwner
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              updatedAt
              createdAt
              primaryLanguage {
                name
                color
              }
              repositoryTopics(first: 8) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    `,
    { login: USERNAME }
  );

  if (data?.user.repositories.nodes.length) {
    return data.user.repositories.nodes;
  }

  const rest = await githubREST<any[]>(
    `/users/${USERNAME}/repos?per_page=40&sort=updated&type=owner`
  );

  return rest?.map(normalizeRestRepo) ?? [];
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  const data = await githubGraphQL<{
    user: {
      pinnedItems: {
        nodes: GitHubRepo[];
      };
    };
  }>(
    `
      query PinnedRepos($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                nameWithOwner
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                updatedAt
                primaryLanguage {
                  name
                  color
                }
                repositoryTopics(first: 8) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
                  edges {
                    size
                    node {
                      name
                      color
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { login: USERNAME }
  );

  if (data?.user.pinnedItems.nodes.length) {
    return data.user.pinnedItems.nodes;
  }

  const repos = await fetchRepos();
  return repos
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 6);
}

function calculateStreak(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => b.date.localeCompare(a.date));
  let currentStreak = 0;
  let longestStreak = 0;
  let activeRun = 0;
  let currentStillOpen = true;

  for (const day of sorted) {
    if (day.contributionCount > 0) {
      activeRun += 1;
      if (currentStillOpen) {
        currentStreak += 1;
      }
      longestStreak = Math.max(longestStreak, activeRun);
    } else {
      currentStillOpen = false;
      activeRun = 0;
    }
  }

  return { currentStreak, longestStreak };
}

export async function fetchContributions(): Promise<GitHubContributions> {
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  const data = await githubGraphQL<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: ContributionDay[];
          }>;
        };
      };
    };
  }>(
    `
      query Contributions($login: String!, $from: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `,
    { login: USERNAME, from: from.toISOString() }
  );

  const calendar =
    data?.user.contributionsCollection.contributionCalendar ?? null;

  if (!calendar) {
    return {
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      weeks: []
    };
  }

  const days = calendar.weeks.flatMap((week) => week.contributionDays);
  const streaks = calculateStreak(days);

  return {
    totalContributions: calendar.totalContributions,
    ...streaks,
    weeks: calendar.weeks
  };
}

export async function fetchLanguages(): Promise<GitHubLanguage[]> {
  const repos = await fetchRepos();
  const languageMap = new Map<string, GitHubLanguage>();

  for (const repo of repos) {
    if (repo.languages?.edges.length) {
      for (const edge of repo.languages.edges) {
        const current = languageMap.get(edge.node.name);
        languageMap.set(edge.node.name, {
          name: edge.node.name,
          color: edge.node.color,
          size: (current?.size ?? 0) + edge.size,
          percentage: 0
        });
      }
    } else if (repo.primaryLanguage?.name) {
      const current = languageMap.get(repo.primaryLanguage.name);
      languageMap.set(repo.primaryLanguage.name, {
        name: repo.primaryLanguage.name,
        color: repo.primaryLanguage.color,
        size: (current?.size ?? 0) + 1,
        percentage: 0
      });
    }
  }

  const total = [...languageMap.values()].reduce(
    (sum, language) => sum + language.size,
    0
  );

  return [...languageMap.values()]
    .map((language) => ({
      ...language,
      percentage: total ? Math.round((language.size / total) * 100) : 0
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 8);
}

export async function fetchRecentActivity(): Promise<GitHubActivity[]> {
  const repos = await fetchRepos();
  const recentRepos = repos.slice(0, 8);
  const commits = await Promise.all(
    recentRepos.map(async (repo) => {
      const ownerRepo = repo.nameWithOwner ?? `${USERNAME}/${repo.name}`;
      const data = await githubREST<any[]>(
        `/repos/${ownerRepo}/commits?per_page=1`
      );
      const commit = data?.[0];
      if (!commit) {
        return null;
      }

      return {
        repo: repo.name,
        message: commit.commit.message.split("\n")[0],
        url: commit.html_url,
        date: commit.commit.author.date
      };
    })
  );

  return commits
    .filter((commit): commit is GitHubActivity => Boolean(commit))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 6);
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [profile, repos, pinnedRepos, contributions, languages, recentActivity] =
    await Promise.all([
      fetchProfile(),
      fetchRepos(),
      fetchPinnedRepos(),
      fetchContributions(),
      fetchLanguages(),
      fetchRecentActivity()
    ]);

  return {
    profile,
    repos,
    pinnedRepos,
    contributions,
    languages,
    recentActivity,
    totals: {
      repos: profile?.repositories.totalCount ?? repos.length,
      stars: repos.reduce((sum, repo) => sum + repo.stargazerCount, 0),
      forks: repos.reduce((sum, repo) => sum + repo.forkCount, 0)
    }
  };
}
