import { getPosts } from '@/firebase/posts';
import PostItem from './PostItem';
import styles from './page.module.css';

export default async function Posts() {
  const posts = await getPosts();

  return (
    <>
      <h1>Posts</h1>
      <div className={styles.PostGroup}>
        {
          posts.map((post, i) => <PostItem key={i} post={post} />)
        }
      </div>
    </>
  );
}