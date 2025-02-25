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
                history(first: 1) {
                  totalCount
                }
              }
            }
          }
          # 删除了仓库级别的 contributionsCollection 查询
        }
      }
      # 添加用户级别的 contributionsCollection 查询
      contributionsCollection(from: "${ninetyDaysAgoISO}", to: "${todayISO}") {
        commitContributionsByRepository {
          repository {
            name
          }
          contributions(first: 100) {
            nodes {
              occurredAt
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
                };
              };
            };
          }>;
        };
        contributionsCollection: {
          commitContributionsByRepository: Array<{
            repository: {
              name: string;
            };
            contributions: {
              nodes: Array<{
                occurredAt: string;
              }>;
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

    // 创建仓库名称到提交活动的映射
    const repoCommitMap: Record<string, { date: string; count: number }[]> = {};

    // 处理用户级别的贡献数据
    user.contributionsCollection.commitContributionsByRepository.forEach(
      (contribution) => {
        const repoName = contribution.repository.name;

        // 为每个仓库初始化90天的空数据
        repoCommitMap[repoName] = last90Days.map((date) => ({
          date,
          count: 0,
        }));

        // 填充提交数据
        contribution.contributions.nodes.forEach((node) => {
          const dateString = node.occurredAt.split('T')[0]; // YYYY-MM-DD
          const commit = repoCommitMap[repoName].find(
            (commit) => commit.date === dateString
          );
          if (commit) {
            commit.count += 1;
          }
        });
      }
    );

    // 更新数据处理函数
    const repos = user.repositories.nodes.map((repo) => {
      return {
        name: repo.name,
        description: repo.description,
        url: repo.url,
        homepage: repo.homepageUrl,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        isArchived: repo.isArchived,
        updatedAt: repo.updatedAt,
        openIssues: repo.openIssues.totalCount,
        totalCommits: repo.defaultBranchRef?.target.history.totalCount || 0,
        commitActivity:
          repoCommitMap[repo.name] ||
          last90Days.map((date) => ({
            date,
            count: 0,
          })),
        languages: repo.languages.edges.map((edge) => ({
          name: edge.node.name,
          color: edge.node.color,
          percentage: Math.round((edge.size / repo.languages.totalSize) * 100),
        })),
        topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
        ownerAvatar: user.avatarUrl,
      };
    });

    return NextResponse.json({ repos });
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
