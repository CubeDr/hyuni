import styles from './AppBar.module.css';
import home from '../../../public/images/home.png';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

export default function AppBar({ title = '현이의 개발 이야기', children }: PropsWithChildren<Props>) {
  return (
    <div className={styles.AppBar}>
      <a className={styles.Home} href="/" title="홈">
        <Image
          src={home}
          alt="홈"
          loading='eager'
          className={styles.HomeIcon}
        />
      </a>
      <h1 className={styles.Title}>{title}</h1>
      {children}
    </div>
  );
}