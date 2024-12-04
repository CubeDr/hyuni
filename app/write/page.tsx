'use client';

import { addPost } from '@/firebase/posts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useEffect, useRef, useState } from 'react';
import CategorySelect from './CategorySelect';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';
import { useRouter } from 'next/navigation';
import { pages } from 'next/dist/build/templates/app-page';

const IMAGE_REGEX = /!\[[^\]]*\]\(([^)]+)\)/g;

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const [pageState, setPageState] = useState<'edit' | 'preview'>('edit');
  const [open, setOpen] = useState(false);
  const uploadedPostId = useRef('');

  const router = useRouter();

  const submit = useCallback(async () => {
    if (title === '' || content === '' || category === '' || mainImage == null) return;

    try {
      const docid = await addPost({
        title,
        category,
        blocks: [
          { type: 'markdown', content: content },
        ],
        thumbnailImageSrc: mainImage,
      });

      uploadedPostId.current = docid;

      setOpen(true);
    } catch (e) {
      console.error(e);
    }
  }, [title, content, category]);

  const onImageClick = useCallback((src: string) => {
    setMainImage(src);
  }, []);

  const togglePageState = useCallback(() => {
    setPageState((pageState) => pageState === 'edit' ? 'preview' : 'edit');
  }, [setPageState]);

  // Parse images on the content.
  useEffect(() => {
    const matches = content.matchAll(IMAGE_REGEX);

    setImages(Array.from(matches.map((match) => match[1])));
  }, [content]);

  return (
    <>
      <div className={styles.WritePage}>
        {
          pageState === 'edit' && <>
            <Editor value={title} onChange={setTitle} multiline={false} className={styles.Title} />
            <CategorySelect category={category} setCategory={setCategory} />
            <Editor value={content} onChange={setContent} className={styles.Content} />
            <div className={styles.ImageRow}>
              {images.map((src) => <>
                <img className={styles.Image + (src === mainImage ? ' ' + styles.MainImage : '')} key={src} src={src} onClick={() => onImageClick(src)} />
              </>)}
            </div>
          </>
        }
        {
          pageState === 'preview' && <>
            <Preview post={{
              title,
              category,
              blocks: [
                { type: 'markdown', content: content },
              ],
              timestamp: new Date().getTime(),
              thumbnailImageSrc: mainImage ?? '',
            }} />
          </>
        }

        <div className={styles.ControlRow}>
          <Button variant="outlined" onClick={togglePageState}>{pageState === 'edit' ? '미리보기' : '편집'}</Button>
          <Button variant="contained" onClick={submit} className={styles.SubmitButton}>게시</Button>
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