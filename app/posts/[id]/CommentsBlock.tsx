import Comment from './Comment';
import styles from './CommentsBlock.module.css';

export default function CommentsBlock() {
  return (
    <div className={styles.CommentsBlock}>
      <div className={styles.Title}>댓글 4</div>
      <hr />
      <Comment />
    </div>
  );
}