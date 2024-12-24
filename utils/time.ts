import { format } from 'date-fns-tz';

export function timestampToString(timestamp: number, showTime: boolean = true) {
  return format(timestamp, 'yyyy. MM. dd.' + (showTime ? ' HH:mm' : ''));
}
