import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWakaTime(timeStr: string) {
  return timeStr.replace(/ mins?/, 'm').replace(' hrs', 'h');
}
