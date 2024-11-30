import { PropsWithChildren } from 'react';
import styles from './Section.module.css';

interface Props {
  title: string;
  moreLink?: string;
}

export default function Section({ title, moreLink, children }: PropsWithChildren<Props>) {
  return (
    <section className={styles.Section}>
      <div className={styles.Header}>
        <h1 className={styles.Title}>{title}</h1>
        {moreLink && <>
          <a href={moreLink} className={styles.MoreLink}>더 보기 &gt;</a>
        </>}
      </div>
      {children}
    </section>
  );
}