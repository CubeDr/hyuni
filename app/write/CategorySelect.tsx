'use client';

import { getCategories } from '@/firebase/categories';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
    <FormControl variant="filled" sx={{
      minWidth: 180,
      backgroundColor: 'var(--theme-color-4)',
    }}>
      <InputLabel
        id="demo-simple-select-filled-label"
        sx={{
          color: 'var(--theme-color-0)'
        }}
      >카테고리 선택</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={category}
        variant="filled"
        sx={{
          color: 'var(--theme-color-0)',
        }}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              color: "var(--theme-color-1)",
            },
          },
        }}
        onChange={(e) => setCategory(e.target.value)}>
        <MenuItem value="">
          <em>카테고리 선택</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem value={category} key={category}>{category}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
