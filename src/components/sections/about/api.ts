export async function fetchGitHubStats(username: string) {
  const response = await fetch(`/api/github/stats?username=${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.stats;
}

export async function fetchWakaTimeStats(username: string) {
  const response = await fetch(`/api/wakatime/stats?username=${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.stats;
}
