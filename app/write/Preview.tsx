import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Preview.module.css';
import PostViewer from '../posts/[id]/PostViewer';

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