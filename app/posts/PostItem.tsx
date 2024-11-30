import { timestampToString } from '@/utils/time';
import styles from './PostItem.module.css';

interface Props {
  post: Post;
}

export default function PostItem({ post }: Props) {
  return (
    <a href={`/posts/${post.id}`} className={styles.PostItem}>
      <img className={styles.Thumbnail} src='https://picsum.photos/200/100' />
      <div className={styles.Category}>{post.category} &gt; 게임 만들기</div>
      <h2 className={styles.Title}>{post.title}</h2>
      <div className={styles.Content}>{post.blocks[0].content}</div>
      <div className={styles.Timestamp}>{timestampToString(post.timestamp)}</div>
    </a>
  );
}