'use client';

import { getCategories } from '@/firebase/categories';
import { useEffect, useState } from 'react';

interface Props {
  category: string;
  setCategory: (category: string) => void;
}

export default function CategorySelect({ category, setCategory }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option disabled value={'null'}> 카테고리 선택 </option>
      {categories.map((category) => (<option value={category} key={category}>{category}</option>))}
    </select>
  );
}
