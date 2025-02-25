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
  // 取最後 70 天的數據（5行 x 14列）
  const recentActivity = activity.slice(activity.length - 70);

  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Recent commits {totalCommits > 0 ? `(${totalCommits})` : ''}
        </span>
      </div>
      <div className="grid w-full auto-cols-fr grid-flow-col grid-rows-5 gap-1">
        {recentActivity.map((day) => {
          // Adjusted intensity calculation for better contrast
          const intensity =
            day.count > 0 ? Math.min(0.1 + (day.count / maxCount) * 0.9, 1) : 0;

          const dayDate = new Date(day.date);
          const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

          return (
            <div
              key={day.date}
              className={cn(
                'aspect-square rounded-sm border backdrop-blur-sm',
                'border-pink-300/30 dark:border-cyan-900/10',
                day.count > 0
                  ? 'bg-pink-500/40 dark:bg-cyan-500/50' // Reduced light mode opacity
                  : 'bg-gray-300/20 dark:bg-gray-700/20', // Reduced light mode background
                isWeekend ? '!bg-gray-900/20' : ''
              )}
              style={{
                opacity: day.count > 0 ? 0.2 + intensity * 0.8 : undefined, // Adjusted opacity range
              }}
              title={`${format(dayDate, 'MMM d')}: ${day.count} commits`}
            />
          );
        })}
      </div>
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
