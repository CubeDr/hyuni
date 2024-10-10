'use client';

import { useCallback, useState } from 'react';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const submit = useCallback(async () => {
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        blocks: [
          {
            type: 'markdown',
            content: value,
          }
        ],
        timestamp: new Date().getTime(),
      });
    } catch (e) {
      console.error(e);
    }
  }, [value]);

  return (
    <div className={styles.WritePage}>
      <div className={styles.WriteContainer}>
        <div>
          <Editor value={title} onChange={setTitle} multiline={false} className={styles.Title} />
          <Editor value={value} onChange={setValue} className={styles.Content} />
        </div>
        <Preview content={value} />
      </div>
      <div className={styles.ControlRow}>
        <input placeholder='카테고리' />
        <button className={styles.SubmitButton} onClick={submit}>게시</button>
      </div>
    </div>
  );
}