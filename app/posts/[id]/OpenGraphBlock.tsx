'use client';

import { OgObject } from 'open-graph-scraper/types';
import { useEffect, useState } from 'react';
import styles from './OpenGraphBlock.module.css';

interface Props {
  url: string;
}

export default function OpenGraphBlock({ url }: Props) {
  const [ogData, setOgData] = useState<OgObject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setOgData(data);
      } catch (error) {
        console.error('Error fetching OG data:', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      {ogData && (
        <a className={styles.OpenGraphBlock} href={ogData.ogUrl}>
          {ogData.ogImage && ogData.ogImage.length > 0 &&
            <img src={ogData.ogImage[0].url} alt={ogData.ogTitle} className={styles.Image} />
          }
          <div className={styles.Content}>
            <h2>{ogData.ogTitle}</h2>
            <p>{ogData.ogDescription}</p>
            <span>{ogData.ogUrl}</span>
          </div>
        </a>
      )}
    </>
  );
}