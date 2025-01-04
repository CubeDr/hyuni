'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DropdownSelect from '../component/DropdownSelect';

interface Props {
  category: string;
  seriesList: string[];
}

export default function SeriesDropdownSelect({ category, seriesList }: Props) {
  const [series, setSeries] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSeries(searchParams.get('series') ?? '-');
  }, [searchParams]);

  return (
    <DropdownSelect
      label="시리즈"
      item={series}
      items={['-', ...seriesList]}
      defaultText="-"
      disabled={seriesList.length === 0}
      setItem={(series) => {
        const base = pathname + '?category=' + category;
        if (series === '-') {
          router.push(base);
        } else {
          router.push(base + '&series=' + series);
        }
      }}
    />
  );
}