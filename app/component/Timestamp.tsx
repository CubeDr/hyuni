'use client';

import { timestampToString } from '@/utils/time';

interface Props {
  timestamp: number;
}

export default function Timestamp({ timestamp }: Props) {
  return <>{timestampToString(timestamp)}</>;
}