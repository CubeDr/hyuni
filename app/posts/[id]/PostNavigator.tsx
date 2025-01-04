import Image from 'next/image';
import styles from './PostNavigator.module.css';

interface Props {
  prevPost: Post;
  nextPost: Post;
}

export default function PostNavigator({ prevPost, nextPost }: Props) {
  return (
    <div className={styles.PostNavigator}>
      {nextPost && <>
        <a className={styles.Post} href={'/posts/' + nextPost.id}>
          <Image className={styles.Image} src={nextPost.thumbnailImageSrc} width={200} height={200} alt={nextPost.title} />
          <div className={styles.Content}>
            <span className={styles.Meta}>{nextPost.series} 다음 포스트</span>
            <span className={styles.Title}>{nextPost.title}</span>
          </div>
        </a>
      </>}
      {!nextPost && <div></div>}
      {prevPost && <>
        <a className={styles.Post + ' ' + styles.Right} href={'/posts/' + prevPost.id}>
          <div className={styles.Content}>
            <span className={styles.Meta}>{prevPost.series} 이전 포스트</span>
            <span className={styles.Title}>{prevPost.title}</span>
          </div>
          <Image className={styles.Image} src={prevPost.thumbnailImageSrc} width={200} height={200} alt={prevPost.title} />
        </a>
      </>}
    </div>
  );
}