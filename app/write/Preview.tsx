import PostViewer from '../posts/[id]/PostViewer';
import styles from './Preview.module.css';

interface Props {
  post: Post;
}

export default function Preview({ post }: Props) {
  return (
    <div className={styles.Preview}>
      <PostViewer post={post} />
    </div>
  );
}