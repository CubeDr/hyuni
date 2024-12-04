'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DropdownSelect from '../component/DropdownSelect';
import { useEffect, useState } from 'react';

interface Props {
  categories: string[];
}

export default function CategoryDropdownSelect({ categories }: Props) {
  const [category, setCategory] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setCategory(searchParams.get('category') ?? '전체');
  }, [searchParams]);

  return (
    <DropdownSelect
      label="카테고리"
      item={category}
      items={['전체', ...categories]}
      defaultText="전체"
      setItem={(category) => {
        if (category === '전체') {
          router.push(pathname);
        } else {
          router.push(pathname + '?category=' + category);
        }
      }}
    />
  );
}