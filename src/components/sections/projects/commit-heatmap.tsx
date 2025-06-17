import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface CommitHeatmapProps {
  activity: Array<{
    date: string;
    count: number;
  }>;
}

export const CommitHeatmap = ({ activity }: CommitHeatmapProps) => {
  const maxCount = Math.max(...activity.map((day) => day.count), 1);
  const totalCommits = activity.reduce((sum, day) => sum + day.count, 0);
  const recentActivity = activity.slice(activity.length - 70);

  // SVG 網格的配置
  const CELL_SIZE = 10;
  const CELL_PADDING = 2;
  const GRID_ROWS = 5;
  const GRID_COLS = 14;
  const WIDTH = GRID_COLS * (CELL_SIZE + CELL_PADDING);
  const HEIGHT = GRID_ROWS * (CELL_SIZE + CELL_PADDING);

  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Recent commits {totalCommits > 0 ? `(${totalCommits})` : ''}
        </span>
      </div>
      <svg
        width={WIDTH}
        height={HEIGHT}
        className="h-auto w-full"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {recentActivity.map((day, index) => {
          const row = index % GRID_ROWS;
          const col = Math.floor(index / GRID_ROWS);
          const x = col * (CELL_SIZE + CELL_PADDING);
          const y = row * (CELL_SIZE + CELL_PADDING);

          const intensity =
            day.count > 0 ? Math.min(0.1 + (day.count / maxCount) * 0.9, 1) : 0;
          const dayDate = new Date(day.date);
          const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

          return (
            <rect
              key={day.date}
              x={x}
              y={y}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              className={cn(
                'stroke-pink-300/30 dark:stroke-cyan-800/10',
                day.count > 0
                  ? `fill-pink-500/40 dark:fill-cyan-500/50 ${isWeekend ? 'dark:fill-pink-500/40! fill-cyan-500/50!' : ''}`
                  : `fill-gray-300/20 dark:fill-gray-700/20 ${isWeekend ? 'fill-gray-900/20! dark:fill-gray-100/20!' : ''}`
              )}
              style={{
                fillOpacity: day.count > 0 ? 0.2 + intensity * 0.8 : 0.2,
              }}
            >
              <title>{`${format(dayDate, 'MMM d')}: ${day.count} commits`}</title>
            </rect>
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
        <span>{format(new Date(recentActivity[0].date), 'MMM d')}</span>
        <span>
          {format(
            new Date(recentActivity[recentActivity.length - 1].date),
            'MMM d'
          )}
        </span>
      </div>
    </div>
  );
};
