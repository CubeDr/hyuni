'use client';

import { timestampToString } from '@/utils/time';

interface Props {
  timestamp: number;
  showTime?: boolean;
}

export default function Timestamp({ timestamp, showTime = true }: Props) {
  return <>{timestampToString(timestamp, showTime)}</>;
}