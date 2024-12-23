'use client';

import { AuthContext } from '@/firebase/AuthContext';
import Image from 'next/image';
import { FormEvent, KeyboardEvent, useCallback, useContext, useState } from 'react';
import styles from './CommentWrite.module.css';
import { addComment } from '@/firebase/comments';

interface Props {
  postId: string;
}

export default function CommentWrite({ postId }: Props) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  const isActive = comment.trim() !== '';

  const onChange = useCallback((e: FormEvent<HTMLDivElement>) => {
    setComment(e.currentTarget.innerText);
  }, []);

  const onSubmit = useCallback(() => {
    if (user == null) return;

    const trimmed = comment.trim();
    if (trimmed === '') return;

    addComment(trimmed, postId, user.uid);
  }, [comment, postId, user?.uid]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  }, [onSubmit]);

  if (user == null) {
    return (
      <div className={styles.Comment}>
        로그인이 필요합니다.
      </div>
    );
  }

  return (
    <>
      <div className={styles.Comment}>
        <Image
          className={styles.Photo}
          src={user!.photoURL!}
          width={44}
          height={44}
          alt={user!.displayName ?? user.email ?? '유저'} />
        <div className={styles.Box}>
          <span className={styles.DisplayName}>{user?.displayName}</span>
          <div
            className={styles.Input + (isActive ? '' : ' ' + styles.Empty)}
            contentEditable
            onInput={onChange}
            onKeyDown={onKeyDown} />
        </div>
      </div>
      <div
        className={styles.Button + (isActive ? '' : ' ' + styles.Inactive)}
        onClick={onSubmit}>
        등록
      </div>
    </>
  );
}