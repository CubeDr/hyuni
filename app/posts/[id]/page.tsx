import { getPost } from '@/firebase/posts';
import styles from './page.module.css';
import { timestampToString } from '@/utils/time';

interface Props {
  params: {
    id: string;
  }
}

export default async function PostPage({ params: { id } }: Props) {
  const { title, category, blocks, timestamp } = await getPost(id);

  return (
    <div>
      <h1>{title}</h1>
      <div className={styles.HeaderRow}>
        <span>&gt; {category}</span>
        <span>{timestampToString(timestamp)}</span>
      </div>
      <hr className={styles.Divider} />
    </div>
  );
}