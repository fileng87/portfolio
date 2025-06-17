import { Avatar } from '@/components/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PersonalInfoCardProps {
  cardClassName: string;
}

export function PersonalInfoCards({ cardClassName }: PersonalInfoCardProps) {
  return (
    <Card className={cn(cardClassName, 'h-full')}>
      <CardHeader>
        <CardTitle>./personal_info.txt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row md:gap-6">
          {/* Avatar Section */}
          <div className="flex justify-center md:justify-start">
            <div className="relative size-32 shrink-0 group">
              {/* 雙重邊框線條 */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-300/60 dark:border-cyan-400/60 transition-all duration-300 group-hover:border-pink-400/80 dark:group-hover:border-cyan-300/80">
                <div className="absolute inset-1 rounded-full border border-pink-400/40 dark:border-cyan-500/40 transition-all duration-300 group-hover:border-pink-500/60 dark:group-hover:border-cyan-400/60">
                  {/* 頭像容器 */}
                  <div className="absolute inset-2 rounded-full bg-pink-50/50 dark:bg-gray-800/50 overflow-hidden">
                    <Avatar
                      email="oscarcoll.930714@gmail.com"
                      className="size-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              {/* 裝飾角落線條 - 帶動畫 */}
              <div className="absolute -top-1 -right-1 size-4 border-r-2 border-t-2 border-pink-400 dark:border-cyan-400 rounded-tr-lg transition-all duration-500 group-hover:scale-110 group-hover:border-pink-500 dark:group-hover:border-cyan-300"></div>
              <div className="absolute -bottom-1 -left-1 size-4 border-l-2 border-b-2 border-pink-400 dark:border-cyan-400 rounded-bl-lg transition-all duration-500 group-hover:scale-110 group-hover:border-pink-500 dark:group-hover:border-cyan-300"></div>

              {/* 半圓弧線動畫 */}
              <div
                className="absolute -inset-1 animate-spin"
                style={{ animationDuration: '20s' }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-400/80 dark:border-t-cyan-400/80"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-pink-500/70 dark:border-b-cyan-500/70"></div>
              </div>
              <div
                className="absolute inset-1 animate-spin"
                style={{
                  animationDuration: '15s',
                  animationDirection: 'reverse',
                }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-l-pink-500/80 dark:border-l-cyan-500/80"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-r-pink-600/70 dark:border-r-cyan-300/80"></div>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="flex-1 space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              🤖{' '}
              <span className="font-mono text-pink-500 dark:text-cyan-500">
                奇怪東西研究員
              </span>{' '}
              -
              就是會去搞一些很奇怪的東西，像會罵人的機器人什麼的。看到有趣的東西就想玩玩看，反正閒著也是閒著。
            </p>
            <p>
              🎨{' '}
              <span className="font-mono text-pink-500 dark:text-cyan-500">
                偶爾畫家
              </span>{' '}
              -
              有時候手會癢想畫畫，但就真的只是偶爾。而且我想畫才畫，所以不要叫我畫圖，我會裝死。
            </p>
            <p>
              ✨{' '}
              <span className="font-mono text-pink-500 dark:text-cyan-500">
                完美主義強迫症患者
              </span>{' '}
              - 做東西的時候每個細節都要調到完美，不管是 code 還是
              UI，不調好就會很不舒服。
            </p>
            <p className="text-right text-sm text-gray-500 dark:text-gray-400">
              文筆很爛但 code 還可以(也許)的工程師 - 2025/06/17
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
