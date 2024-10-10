'use client';

import { useState } from 'react';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  return (
    <div className={styles.WritePage}>
      <div>
        <Editor value={title} onChange={setTitle} multiline={false} className={styles.Title} />
        <Editor value={value} onChange={setValue} className={styles.Content} />
      </div>
      <Preview content={value} />
    </div>
  );
}