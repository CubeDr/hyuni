import { getPosts } from '@/firebase/posts';
import styles from './PostGrid.module.css';
import PostItem from './PostItem';

export default async function PostGrid() {
  const posts = await getPosts();

  return (
    <div className={styles.PostGrid}>
      {
        posts.map((post, i) => <PostItem key={i} post={post} />)
      }
    </div>
  );
}