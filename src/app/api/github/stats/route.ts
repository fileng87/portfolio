import { graphql } from '@octokit/graphql';
import { NextResponse } from 'next/server';

const GRAPHQL_QUERY = `
  query userInfo($login: String!) {
    user(login: $login) {
      name
      login
      contributionsCollection {
        totalCommitContributions
        totalPullRequestReviewContributions
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
        totalCount
        nodes {
          name
          stargazers { totalCount }
          forks { totalCount }
          watchers { totalCount }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
      }
      pullRequests(first: 1) {
        totalCount
      }
      mergedPullRequests: pullRequests(states: MERGED) {
        totalCount
      }
      openIssues: issues(states: OPEN) {
        totalCount
      }
      closedIssues: issues(states: CLOSED) {
        totalCount
      }
      followers {
        totalCount
      }
      repositoryDiscussions {
        totalCount
      }
      repositoryDiscussionComments(onlyAnswers: true) {
        totalCount
      }
    }
  }
`;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const { user } = await graphqlWithAuth<{
      user: {
        name: string;
        login: string;
        repositories: {
          totalCount: number;
          nodes: Array<{
            name: string;
            stargazers: { totalCount: number };
            forks: { totalCount: number };
            watchers: { totalCount: number };
          }>;
          pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
          };
        };
        contributionsCollection: {
          totalCommitContributions: number;
          totalPullRequestReviewContributions: number;
        };
        repositoriesContributedTo: { totalCount: number };
        pullRequests: { totalCount: number };
        mergedPullRequests: { totalCount: number };
        openIssues: { totalCount: number };
        closedIssues: { totalCount: number };
        followers: { totalCount: number };
        repositoryDiscussions: { totalCount: number };
        repositoryDiscussionComments: { totalCount: number };
      };
    }>(GRAPHQL_QUERY, { login: username });

    const totalStars = user.repositories.nodes.reduce(
      (acc, repo) => acc + repo.stargazers.totalCount,
      0
    );
    const totalForks = user.repositories.nodes.reduce(
      (acc, repo) => acc + repo.forks.totalCount,
      0
    );
    const totalWatchers = user.repositories.nodes.reduce(
      (acc, repo) => acc + repo.watchers.totalCount,
      0
    );

    const totalIssues =
      user.openIssues.totalCount + user.closedIssues.totalCount;
    const totalPRs = user.pullRequests.totalCount;
    const totalPRsMerged = user.mergedPullRequests.totalCount;
    const mergedPRsPercentage = (totalPRsMerged / totalPRs) * 100;

    const stats = {
      name: user.name || user.login,
      totalRepos: user.repositories.totalCount,
      totalStars,
      totalForks,
      totalIssues,
      totalPRs,
      totalPRsMerged,
      mergedPRsPercentage,
      totalWatchers,
      totalReviews:
        user.contributionsCollection.totalPullRequestReviewContributions,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalDiscussionsStarted: user.repositoryDiscussions.totalCount,
      totalDiscussionsAnswered: user.repositoryDiscussionComments.totalCount,
      followers: user.followers.totalCount,
      contributedTo: user.repositoriesContributedTo.totalCount,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
