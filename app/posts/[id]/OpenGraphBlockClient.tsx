'use client';
import { useEffect, useState } from 'react';
import OpenGraphBlock, { OgObject } from './OpenGraphBlock';

interface Props {
  url: string;
}

const cache = new Map<string, OgObject>();

export default function OpenGraphBlockClient({ url }: Props) {
  const [ogData, setOgData] = useState<OgObject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cache.has(url)) {
        setOgData(cache.get(url)!);
        return;
      }

      try {
        const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        cache.set(url, data);
        setOgData(data);
      } catch (error) {
        console.error('Error fetching OG data:', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <OpenGraphBlock url={url} ogObject={ogData} />
  );
}