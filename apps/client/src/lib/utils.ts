import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isToday(date: Date, referenceDate: Date = new Date()): boolean {
  return new Date(date).setHours(0,0,0,0) === new Date(referenceDate).setHours(0,0,0,0);
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isToday(date, yesterday);
}
