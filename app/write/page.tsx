'use client';

import { useState } from 'react';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';

export default function WritePage() {
  const [value, setValue] = useState('');

  return (
    <div className={styles.WritePage}>
      <Editor value={value} onChange={setValue} />
      <Preview content={value} />
    </div>
  );
}