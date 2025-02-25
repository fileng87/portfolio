import { NextResponse } from 'next/server';

export interface WakaTimeData {
  categories: Array<{
    name: string;
    percent: number;
    total_seconds: number;
    text: string;
  }>;
  languages: Array<{
    name: string;
    percent: number;
    total_seconds: number;
    text: string;
  }>;
  editors: Array<{
    name: string;
    percent: number;
    total_seconds: number;
    text: string;
  }>;
  operating_systems: Array<{
    name: string;
    percent: number;
    total_seconds: number;
    text: string;
  }>;
  total_seconds: number;
  total_seconds_including_other_language: number;
  human_readable_total: string;
  human_readable_daily_average: string;
  daily_average: number;
  daily_average_including_other_language: number;
  days_including_holidays: number;
  days_minus_holidays: number;
  status: string;
  range: string;
  human_readable_range: string;
}

class CustomError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

class MissingParamError extends CustomError {
  constructor(params: string[]) {
    super(
      `Missing required parameter(s): ${params.join(', ')}`,
      'MISSING_PARAMS'
    );
  }
}

async function fetchWakatimeStats({
  username,
  api_domain = 'wakatime.com',
}: {
  username: string;
  api_domain?: string;
}) {
  if (!username) {
    throw new MissingParamError(['username']);
  }

  const response = await fetch(
    `https://${api_domain.replace(
      /\/$/gi,
      ''
    )}/api/v1/users/${username}/stats/all_time`
  );

  const { data } = await response.json();

  if (!response.ok) {
    throw new CustomError(
      `Could not resolve to a User with the login of '${username}'`,
      'WAKATIME_USER_NOT_FOUND'
    );
  }

  return data as WakaTimeData;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const api_domain = searchParams.get('api_domain') || 'wakatime.com';

    if (!username) {
      return NextResponse.json(
        { error: 'WakaTime username is required' },
        { status: 400 }
      );
    }

    const stats = await fetchWakatimeStats({ username, api_domain });

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching WakaTime stats:', error);

    if (error instanceof CustomError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === 'WAKATIME_USER_NOT_FOUND' ? 404 : 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch WakaTime stats' },
      { status: 500 }
    );
  }
}
