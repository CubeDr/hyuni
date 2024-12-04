'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCallback } from 'react';

const ADD_ITEM_VALUE = '!<add>!';

interface Props {
  label: string;
  item: string;
  items: string[];
  setItem: (item: string) => void;
  onAddClick: () => void;
  disabled?: boolean;
}

export default function DropdownSelect({ label, item, items, setItem, onAddClick, disabled = false }: Props) {
  const onChange = useCallback((value: string) => {
    if (value === ADD_ITEM_VALUE) {
      onAddClick();
    } else {
      setItem(value);
    }
  }, [onAddClick, setItem]);

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
      >{label}</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={item}
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
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}>
        <MenuItem value="" key={label + ' default'}>
          <em>{label}를 선택해 주세요</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem value={item} key={item}>{item}</MenuItem>
        ))}
        <MenuItem value={ADD_ITEM_VALUE} key={label + ' new'}>
          <em>새 {label} 추가</em>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
