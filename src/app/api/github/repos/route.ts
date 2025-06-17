import { graphql } from '@octokit/graphql';
import { NextResponse } from 'next/server';

// 计算90天前的日期
const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
const ninetyDaysAgoISO = ninetyDaysAgo.toISOString();
const todayISO = new Date().toISOString();

const GRAPHQL_QUERY = `
  query userRepos($login: String!) {
    user(login: $login) {
      avatarUrl
      repositories(
        first: 10, 
        orderBy: {field: UPDATED_AT, direction: DESC},
        privacy: PUBLIC,
        isFork: false
      ) {
        nodes {
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          isArchived
          updatedAt
          openIssues: issues(states: OPEN) {
            totalCount
          }
          languages(first: 10) {
            edges {
              node {
                name
                color
              }
              size
            }
            totalSize
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                # 獲取每日提交歷史
                history(
                  since: "${ninetyDaysAgoISO}",
                  until: "${todayISO}"
                ) {
                  totalCount
                  nodes {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export async function GET() {
  try {
    const { user } = await graphqlWithAuth<{
      user: {
        avatarUrl: string;
        repositories: {
          nodes: Array<{
            name: string;
            description: string;
            url: string;
            homepageUrl: string;
            stargazerCount: number;
            forkCount: number;
            isArchived: boolean;
            updatedAt: string;
            openIssues: {
              totalCount: number;
            };
            languages: {
              edges: Array<{
                node: {
                  name: string;
                  color: string;
                };
                size: number;
              }>;
              totalSize: number;
            };
            repositoryTopics: {
              nodes: Array<{
                topic: {
                  name: string;
                };
              }>;
            };
            defaultBranchRef: {
              target: {
                history: {
                  totalCount: number;
                  nodes: Array<{
                    committedDate: string;
                  }>;
                };
              };
            };
          }>;
        };
      };
    }>(GRAPHQL_QUERY, { login: 'fileng87' });

    // 生成过去90天的日期数组
    const last90Days = Array.from({ length: 90 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 89 + i); // 从90天前到今天
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    });

    // 移除 repoCommitMap 相关代码，直接处理仓库数据
    const repos = user.repositories.nodes.map((repo) => {
      // 生成過去90天的日期活動數據
      const commitDates =
        repo.defaultBranchRef?.target.history.nodes.map(
          (node: { committedDate: string }) => node.committedDate.split('T')[0]
        ) || [];

      // 計算每天的提交次數
      const commitActivity = last90Days.map((date) => ({
        date,
        count: commitDates.filter((commitDate) => commitDate === date).length,
      }));

      // 計算最近30天的提交總數
      const last30DaysCommits = commitActivity
        .slice(-30)
        .reduce((sum, day) => sum + day.count, 0);

      // 計算更新時間得分（越近期分數越高）
      const updatedDate = new Date(repo.updatedAt);
      const now = new Date();
      const daysSinceUpdate =
        (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24);
      const updateScore = Math.max(0, 100 - daysSinceUpdate); // 最近更新得高分，最多100分

      return {
        name: repo.name,
        description: repo.description,
        url: repo.url,
        homepage: repo.homepageUrl,
        stargazerCount: repo.stargazerCount,
        forkCount: repo.forkCount,
        isArchived: repo.isArchived,
        updatedAt: repo.updatedAt,
        openIssues: repo.openIssues.totalCount,
        totalCommits: repo.defaultBranchRef?.target.history.totalCount || 0,
        commitActivity,
        languages: repo.languages.edges
          .map((edge) => ({
            name: edge.node.name,
            color: edge.node.color,
            percentage: Math.round(
              (edge.size / repo.languages.totalSize) * 100
            ),
          }))
          .sort((a, b) => b.percentage - a.percentage),
        topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
        ownerAvatar: user.avatarUrl,
        activityScore: last30DaysCommits * 2 + updateScore, // 活躍度分數
      };
    });

    // 根據活躍度分數排序
    const sortedRepos = repos.sort((a, b) => {
      // 已封存的專案排在最後
      if (a.isArchived !== b.isArchived) {
        return a.isArchived ? 1 : -1;
      }
      // 根據活躍度分數排序
      return b.activityScore - a.activityScore;
    });

    return NextResponse.json({ repos: sortedRepos });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching repos:', error);
    // 添加更多错误信息输出
    if (error.errors) {
      console.error('GraphQL errors:', JSON.stringify(error.errors, null, 2));
    }
    if (error.response) {
      console.error('Response status:', error.response.status);
    }
    return NextResponse.json(
      { error: 'Failed to fetch repositories', details: error.message },
      { status: 500 }
    );
  }
}
