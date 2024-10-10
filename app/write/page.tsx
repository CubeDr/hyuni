'use client';

import { useCallback, useState } from 'react';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import CategorySelect from './CategorySelect';
import { addPostToCategory } from '@/firebase/categories';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('null');

  const submit = useCallback(async () => {
    try {
      const postDocRef = await addDoc(collection(db, 'posts'), {
        title,
        category,
        blocks: [
          {
            type: 'markdown',
            content: value,
          }
        ],
        timestamp: new Date().getTime(),
      });

      await addPostToCategory(postDocRef, category);
    } catch (e) {
      console.error(e);
    }
  }, [value, category]);

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
        <CategorySelect category={category} setCategory={setCategory} />
        <button className={styles.SubmitButton} onClick={submit}>게시</button>
      </div>
    </div>
  );
}