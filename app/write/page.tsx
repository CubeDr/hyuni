'use client';

import { addPost } from '@/firebase/posts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useRef, useState } from 'react';
import CategorySelect from './CategorySelect';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const [open, setOpen] = useState(false);
  const uploadedPostId = useRef('');

  const router = useRouter();

  const submit = useCallback(async () => {
    if (title === '' || value === '' || category === '') return;

    try {
      const docid = await addPost({
        title,
        category,
        blocks: [
          { type: 'markdown', content: value },
        ],
      });

      uploadedPostId.current = docid;

      setOpen(true);
    } catch (e) {
      console.error(e);
    }
  }, [title, value, category]);

  return (
    <>
      <div className={styles.WritePage}>
        <div className={styles.WriteContainer}>
          <div>
            <Editor value={title} onChange={setTitle} multiline={false} className={styles.Title} />
            <Editor value={value} onChange={setValue} className={styles.Content} />
          </div>
          <Preview post={{
            title,
            category,
            blocks: [
              { type: 'markdown', content: value },
            ],
            timestamp: new Date().getTime(),
          }} />
        </div>
        <div className={styles.ControlRow}>
          <CategorySelect category={category} setCategory={setCategory} />
          <Button variant="contained" onClick={submit}>게시</Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          게시 성공
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            게시글을 성공적으로 등록했습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.replace('/posts/' + uploadedPostId.current)} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}