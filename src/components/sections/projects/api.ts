import { GitHubRepo } from './types';

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const response = await fetch('/api/github/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }
  const data = await response.json();
  return data.repos;
}
