export type GitHubProfile = {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  url: string;
  repositories: {
    totalCount: number;
  };
  followers: {
    totalCount: number;
  };
};

export type GitHubRepo = {
  id: string;
  name: string;
  nameWithOwner?: string;
  description: string | null;
  url: string;
  homepageUrl?: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: {
    name: string;
    color: string | null;
  } | null;
  repositoryTopics?: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  languages?: {
    edges: Array<{
      size: number;
      node: {
        name: string;
        color: string | null;
      };
    }>;
  };
  updatedAt: string;
  createdAt?: string;
};

export type GitHubLanguage = {
  name: string;
  color: string | null;
  size: number;
  percentage: number;
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

export type GitHubContributions = {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
};

export type GitHubActivity = {
  repo: string;
  message: string;
  url: string;
  date: string;
};

export type GitHubStats = {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  pinnedRepos: GitHubRepo[];
  contributions: GitHubContributions;
  languages: GitHubLanguage[];
  recentActivity: GitHubActivity[];
  totals: {
    repos: number;
    stars: number;
    forks: number;
  };
};
