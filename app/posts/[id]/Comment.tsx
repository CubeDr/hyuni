'use client';

import { AuthContext } from '@/firebase/AuthContext';
import { useContext } from 'react';
import styles from './Comment.module.css';
import Image from 'next/image';

export default function Comment() {
  const { user } = useContext(AuthContext);

  if (user == null) {
    return (
      <div className={styles.Comment}>
        로그인이 필요합니다.
      </div>
    );
  }

  return (
    <div className={styles.Comment}>
      <Image
        className={styles.Photo}
        src={user!.photoURL!}
        width={50}
        height={50}
        alt={user!.displayName ?? user.email ?? '유저'} />
      <div className={styles.Box}>
        <span className={styles.DisplayName}>{user?.displayName}</span>
      </div>
    </div>
  );
}