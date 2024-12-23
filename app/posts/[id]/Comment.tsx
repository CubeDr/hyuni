'use client';

import { AuthContext } from '@/firebase/AuthContext';
import Image from 'next/image';
import { FormEvent, useCallback, useContext, useState } from 'react';
import styles from './Comment.module.css';

export default function Comment() {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  const isActive = comment.trim() !== '';

  const onChange = useCallback((e: FormEvent<HTMLDivElement>) => {
    setComment(e.currentTarget.innerText);
  }, []);

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
            onInput={onChange} />
        </div>
      </div>
      <div className={styles.Button + (isActive ? '' : ' ' + styles.Inactive)}>등록</div>
    </>
  );
}