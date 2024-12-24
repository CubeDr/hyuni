'use client';

import Login from '@/app/Login';
import { AuthContext } from '@/firebase/AuthContext';
import { addComment } from '@/firebase/comments';
import { useRouter } from 'next/navigation';
import { FormEvent, KeyboardEvent, useCallback, useContext, useRef, useState } from 'react';
import ProfileImage from './CommentProfileImage';
import styles from './CommentWrite.module.css';

interface Props {
  postId: string;
}

export default function CommentWrite({ postId }: Props) {
  const { user } = useContext(AuthContext);
  const commentRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState('');

  const router = useRouter();

  const isNotEmpty = comment.trim() !== '';
  const isActive = user == null || isNotEmpty;

  const onChange = useCallback((e: FormEvent<HTMLDivElement>) => {
    setComment(e.currentTarget.innerText);
  }, []);

  const onSubmit = useCallback(() => {
    if (user == null) return;

    const trimmed = comment.trim();
    if (trimmed === '') return;

    addComment(trimmed, postId, user.uid).then(() => {
      commentRef.current!.innerText = '';
      setComment('');
      router.refresh();
    });
  }, [comment, postId, user?.uid]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  }, [onSubmit]);

  return (
    <>
      <div className={styles.Comment}>
        <ProfileImage src={user?.photoURL} className={styles.Photo} />
        <div className={styles.Box}>
          <span className={styles.DisplayName}>{user ? (user.displayName ?? '익명 유저') : '로그인이 필요합니다.'}</span>
          <div
            ref={commentRef}
            className={styles.Input + (isNotEmpty ? '' : ' ' + styles.Empty)}
            contentEditable={!!user}
            onInput={user ? onChange : undefined}
            onKeyDown={user ? onKeyDown : undefined} />
        </div>
      </div>
      <div className={styles.Control}>
        <span
          className={styles.Button + (isActive ? '' : ' ' + styles.Inactive)}
          onClick={user ? onSubmit : undefined}>
          {user ? '등록' : <Login />}
        </span>
      </div>
    </>
  );
}