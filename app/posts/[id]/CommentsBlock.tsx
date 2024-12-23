import { getComments } from '@/firebase/comments';
import Comment from './Comment';
import CommentWrite from './CommentWrite';
import styles from './CommentsBlock.module.css';

interface Props {
  postId: string;
}

export default async function CommentsBlock({ postId }: Props) {
  const comments = await getComments(postId);

  return (
    <div className={styles.CommentsBlock}>
      <div className={styles.Title}>댓글 {comments.length}</div>
      <hr />
      {
        comments.map((comment, i) => (
          <Comment key={'comment ' + i} comment={comment} />
        ))
      }
      <CommentWrite postId={postId} />
    </div>
  );
}