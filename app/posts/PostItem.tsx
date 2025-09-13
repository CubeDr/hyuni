import markdownToTxt from 'markdown-to-txt';
import Image from 'next/image';
import { MdOutlineModeComment } from "react-icons/md";
import Timestamp from '../component/Timestamp';
import styles from './PostItem.module.css';

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
      <div className={styles.ThumbnailContainer}>
        <Image className={styles.Thumbnail} src={post.thumbnailImageSrc} alt={post.title} fill />
      </div>
      <div className={styles.Metadata}>
        <div className={styles.Category}>{post.category}{post.series ? <> &gt; {post.series}</> : ''}{post.tags?.map((tag) => ` #${tag}`)}</div>
        <h2 className={styles.Title}>{post.title}</h2>
        <div className={styles.Content}>{markdownToPlainText(post.blocks[0].content)}</div>
        <div className={styles.Bottom}>
          <span><MdOutlineModeComment className={styles.CommentIcon} />{post.commentsCount ?? 0}</span>
          <span><Timestamp timestamp={post.timestamp} showTime={false} /></span>
        </div>
      </div>
    </a>
  );
}