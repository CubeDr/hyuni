'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DropdownSelect from '../component/DropdownSelect';
import { useEffect, useState } from 'react';

interface Props {
  tags: string[];
}

export default function TagDropdownSelect({ tags }: Props) {
  const [tag, setTag] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setTag(searchParams.get('tag') ?? '전체');
  }, [searchParams]);

  return (
    <DropdownSelect
      label="태그"
      item={tag}
      items={['전체', ...tags]}
      defaultText="전체"
      setItem={(tag) => {
        if (tag === '전체') {
          router.push(pathname);
        } else {
          router.push(pathname + '?tag=' + tag);
        }
      }}
    />
  );
}
