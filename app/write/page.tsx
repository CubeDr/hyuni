'use client';

import { useState } from 'react';
import Editor from './Editor';

export default function WritePage() {
  const [value, setValue] = useState('');

  return (
    <>
      <Editor value={value} onChange={setValue} />
    </>
  );
}