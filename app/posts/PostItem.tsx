import { timestampToString } from '@/utils/time';
import styles from './PostItem.module.css';

interface Props {
  post: Post;
}

export default function PostItem({ post }: Props) {
  return (
    <a href={`/posts/${post.id}`} className={styles.PostItem}>
      <h2 className={styles.Title}>{post.title}</h2>
      <div className={styles.Content}>{post.blocks[0].content}</div>
      <div className={styles.Footer}>
        <span className={styles.Category}>{post.category}</span>
        <span className={styles.Timestamp}>{timestampToString(post.timestamp)}</span>
      </div>
    </a>
  );
}