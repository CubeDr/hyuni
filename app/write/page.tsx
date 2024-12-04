'use client';

import { addPost } from '@/firebase/posts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useEffect, useRef, useState } from 'react';
import DropdownSelect from './DropdownSelect';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';
import { useRouter } from 'next/navigation';
import { addCategory, getCategories } from '@/firebase/categories';
import { addSeries, getSeriesList } from '@/firebase/series';

const IMAGE_REGEX = /!\[[^\]]*\]\(([^)]+)\)/g;

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [series, setSeries] = useState('');

  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const [pageState, setPageState] = useState<'edit' | 'preview'>('edit');
  const [open, setOpen] = useState(false);
  const uploadedPostId = useRef('');

  const router = useRouter();

  const submit = useCallback(async () => {
    if (title === '' || content === '' || category === '' || mainImage == null) {
      window.alert(`
        title: ${title},
        content: ${content.length}자,
        category: ${category},
        series: ${series},
        mainImage: ${mainImage}
        `);
    }

    try {
      const docid = await addPost({
        title,
        category,
        series,
        blocks: [
          { type: 'markdown', content: content },
        ],
        thumbnailImageSrc: mainImage!,
      });

      uploadedPostId.current = docid;

      setOpen(true);
    } catch (e) {
      console.error(e);
    }
  }, [title, content, category, mainImage]);

  const onImageClick = useCallback((src: string) => {
    setMainImage(src);
  }, []);

  const togglePageState = useCallback(() => {
    setPageState((pageState) => pageState === 'edit' ? 'preview' : 'edit');
  }, [setPageState]);

  const onCategoryAddClick = useCallback(() => {
    const category = window.prompt('추가할 카테고리');
    if (category == null) return;

    addCategory(category).then(() => {
      setCategories((categories) => [...categories, category]);
      setCategory(category);
    });
  }, [setCategories, setCategory]);

  const onSeriesAddClick = useCallback(() => {
    if (category === '') return;

    const series = window.prompt('추가할 시리즈');
    if (series == null) return;

    addSeries(category, series).then(() => {
      setSeriesList((seriesList) => [...seriesList, series]);
      setSeries(series);
    });
  }, [category, setSeriesList, setSeries]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setSeries('');
    setSeriesList([]);

    if (category === '') {
      return;
    }

    getSeriesList(category).then(setSeriesList);
  }, [category, setSeries, setSeriesList]);

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
            <DropdownSelect
              label='카테고리'
              item={category}
              items={categories}
              setItem={setCategory}
              onAddClick={onCategoryAddClick} />
            <DropdownSelect
              label='시리즈'
              item={series}
              items={seriesList}
              setItem={setSeries}
              onAddClick={onSeriesAddClick}
              disabled={category === ''} />
            <Editor value={content} onChange={setContent} className={styles.Content} />
            <div className={styles.ImageRow}>
              {images.map((src) =>
                <img className={styles.Image + (src === mainImage ? ' ' + styles.MainImage : '')} key={src} src={src} onClick={() => onImageClick(src)} />
              )}
            </div>
          </>
        }
        {
          pageState === 'preview' && <>
            <Preview post={{
              title,
              category,
              series,
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