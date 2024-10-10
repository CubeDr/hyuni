'use client';

import { addPost } from '@/firebase/posts';
import { useCallback, useState } from 'react';
import CategorySelect from './CategorySelect';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('null');

  const submit = useCallback(async () => {
    try {
      addPost({
        title,
        category,
        blocks: [
          { type: 'markdown', content: value },
        ],
      });
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