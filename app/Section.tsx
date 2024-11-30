import { PropsWithChildren } from 'react';
import styles from './Section.module.css';

interface Props {
  title: string;
}

export default function Section({ title, children }: PropsWithChildren<Props>) {
  return (
    <section className={styles.Section}>
      <h1 className={styles.Title}>{title}</h1>
      {children}
    </section>
  );
}