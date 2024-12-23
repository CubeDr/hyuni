import Comment from './Comment';
import styles from './CommentsBlock.module.css';

interface Props {
  postId: string;
}

export default function CommentsBlock({ postId }: Props) {
  return (
    <div className={styles.CommentsBlock}>
      <div className={styles.Title}>댓글 4</div>
      <hr />
      <Comment postId={postId} />
    </div>
  );
}