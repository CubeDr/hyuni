import { Comment as CommentData } from '@/types/comment';
import { timestampToString } from '@/utils/time';
import Image from 'next/image';
import styles from './Comment.module.css';
import CommentControl from './CommentControl';

interface Props {
  comment: CommentData;
}

export default function Comment({ comment }: Props) {
  return (
    <>
      <div className={styles.Comment}>
        <Image
          src={'https://lh3.googleusercontent.com/a/ACg8ocJe_4E4asTmvPQqozMu-zbbzbihpIoFUrGtGAWE-gLwdLv3sez4jA=s288-c-no'}
          width={44}
          height={44}
          alt={'Profile image'}
          className={styles.Image} />
        <div className={styles.Content}>
          <div className={styles.Metadata}>
            <span className={styles.UserName}>{comment.userId}</span>
            <span className={styles.Timestamp}>{timestampToString(comment.timestamp)}</span>
          </div>
          <div className={styles.Comment}>{comment.comment}</div>
          <CommentControl userId={comment.userId} postId={comment.postId} commentId={comment.id} />
        </div>
      </div>
      <div className={styles.Divider} />
    </>
  );
}