import { format } from 'date-fns-tz';

export function timestampToString(timestamp: number) {
  return format(timestamp, 'yyyy. MM. dd. HH:mm', { timeZone: 'Asia/Seoul' });
}
