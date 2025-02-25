export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  isArchived: boolean;
  updatedAt: string;
  openIssues: number;
  totalCommits: number;
  commitActivity: {
    date: string;
    count: number;
  }[];
  languages: {
    name: string;
    color: string;
    percentage: number;
  }[];
  topics: string[];
  ownerAvatar: string;
}
