import { getPosts } from '@/firebase/posts';
import styles from './PostGrid.module.css';
import PostItem from './PostItem';

interface Props {
  category?: string;
}

export default async function PostGrid({ category }: Props) {
  const posts = await getPosts(category);

  return (
    <div className={styles.PostGrid}>
      {
        posts.map((post, i) => <PostItem key={i} post={post} />)
      }
    </div>
  );
}