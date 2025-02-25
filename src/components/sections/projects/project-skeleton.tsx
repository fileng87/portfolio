import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProjectSkeletonProps {
  className?: string;
}

export const ProjectSkeleton = ({ className }: ProjectSkeletonProps) => {
  return (
    <Card
      className={cn(
        className,
        'relative border-pink-300/50 bg-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-sm dark:border-cyan-900/50 dark:bg-gray-800/10 dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]',
        'flex h-full max-h-[28rem] min-h-[28rem] flex-col'
      )}
    >
      <CardHeader className="flex flex-none flex-row items-start justify-between space-y-0 pb-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="size-10 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="mt-auto flex flex-col justify-end gap-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-2">
            <div className="mb-1 flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid w-full auto-cols-fr grid-flow-col grid-rows-5 gap-1">
              {Array.from({ length: 70 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="aspect-square rounded-sm border-pink-300/50 dark:bg-gray-700/20"
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
      </CardFooter>
    </Card>
  );
};
