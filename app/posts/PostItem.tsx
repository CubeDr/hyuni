import { timestampToString } from '@/utils/time';
import styles from './PostItem.module.css';
import markdownToTxt from 'markdown-to-txt';

export const IMAGE_REGEX = /!\[[^\]]*\]\(([^)]+)\)/g;

interface Props {
  post: Post;
}

function markdownToPlainText(content: string) {
  const imageRemoved = content.replaceAll(IMAGE_REGEX, '');
  return markdownToTxt(imageRemoved);
}

export default function PostItem({ post }: Props) {
  return (
    <a href={`/posts/${post.id}`} className={styles.PostItem}>
      <img className={styles.Thumbnail} src={post.thumbnailImageSrc} />
      <div>
        <div className={styles.Category}>{post.category}</div>
        <h2 className={styles.Title}>{post.title}</h2>
        <div className={styles.Content}>{markdownToPlainText(post.blocks[0].content)}</div>
        <div className={styles.Timestamp}>{timestampToString(post.timestamp)}</div>
      </div>
    </a>
  );
}