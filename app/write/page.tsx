'use client';

import { AuthContext } from '@/firebase/AuthContext';
import { addCategory, getCategories } from '@/firebase/categories';
import { addPost, getPost, updatePost } from '@/firebase/posts';
import { addSeries, getSeriesList } from '@/firebase/series';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { redirect, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import DropdownSelect from '../component/DropdownSelect';
import { IMAGE_REGEX } from '../posts/PostItem';
import Editor from './Editor';
import styles from './page.module.css';
import Preview from './Preview';

export default function WritePage({ searchParams }: { searchParams: any }) {
  const id = searchParams.id as string | null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [series, setSeries] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const [pageState, setPageState] = useState<'edit' | 'preview'>('edit');
  const [open, setOpen] = useState(false);
  const uploadedPostId = useRef('');

  const [timestamp, setTimestamp] = useState<number | null>(null);

  const router = useRouter();
  const { member, isLoaded } = useContext(AuthContext);

  const submit = useCallback(async () => {
    if (title === '' || content === '' || category === '' || mainImage == null) {
      window.alert(`
        title: ${title},
        content: ${content.length}자,
        category: ${category},
        series: ${series},
        tags: ${tags},
        mainImage: ${mainImage}
        `);
      return;
    }

    const postData: Omit<Post, 'timestamp' | 'lastUpdated' | 'commentsCount'> = {
      title,
      category,
      series,
      tags,
      blocks: [
        { type: 'markdown', content: content },
      ],
      thumbnailImageSrc: mainImage!,
    };

    try {
      if (id == null) {
        uploadedPostId.current = await addPost(postData);
        setOpen(true);
      } else {
        uploadedPostId.current = await updatePost(id, { timestamp: timestamp!, ...postData });
        setOpen(true);
      }
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

  const onAddTag = useCallback(() => {
    const tag = window.prompt('추가할 태그');
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  }, [tags]);

  const convertGoogleDriveImageLink = useCallback(() => {
    const originalLink = window.prompt('구글 드라이브 이미지 링크 입력. 변환된 링크가 복사됩니다.');
    if (originalLink == null) return;

    const url = new URL(originalLink);
    const path = url.pathname;

    if (!path.startsWith('/file/d/')) {
      window.alert('링크 형식이 올바르지 않습니다. /file/d/ 로 경로가 시작되어야 합니다.');
      return;
    }

    const idPart = path.slice(8);
    console.log(idPart);

    const slashIndex = idPart.indexOf('/');
    const id = slashIndex !== -1 ? idPart.slice(0, slashIndex) : idPart;
    const imageSrc = `![](https://lh3.googleusercontent.com/d/${id})`;
    navigator.clipboard.writeText(imageSrc);
    window.alert('복사 완료');
  }, []);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (id == null) return;

    getPost(id).then((post) => {
      if (post == null) return;

      setTitle(post.title);
      setContent(post.blocks[0].content);
      setCategory(post.category);
      setSeries(post.series);
      setMainImage(post.thumbnailImageSrc);
      setTimestamp(post.timestamp);
      setTags(post.tags ?? []);
    });
  }, [id]);

  useEffect(() => {
    if (isLoaded && member?.role !== 'owner') {
      window.alert('접근 권한이 없습니다.');
      redirect('/');
    }
  }, [member, isLoaded]);

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

    setImages(Array.from(matches).map((match) => match[1]));
  }, [content]);

  return (
    <>
      {member?.role === 'owner' && <>
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
              <DropdownSelect
                label="태그"
                item=""
                items={tags}
                setItem={() => { }}
                onAddClick={onAddTag}
              />
              <div>
                {tags.map((tag) => (
                  <span key={tag}>{"#" + tag}</span>
                ))}
              </div>
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
                tags,
                blocks: [
                  { type: 'markdown', content: content },
                ],
                timestamp: timestamp ?? new Date().getTime(),
                lastUpdated: new Date().getTime(),
                thumbnailImageSrc: mainImage ?? '',
                commentsCount: 0,
              }} />
            </>
          }

          <div className={styles.ControlRow}>
            <Button variant="outlined" onClick={convertGoogleDriveImageLink}>구귿 드라이브 이미지 변환</Button>
            <div>
              <Button variant="outlined" onClick={togglePageState}>{pageState === 'edit' ? '미리보기' : '편집'}</Button>
              <Button variant="contained" onClick={submit} className={styles.SubmitButton}>게시</Button>
            </div>
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
      </>}
    </>
  );
}