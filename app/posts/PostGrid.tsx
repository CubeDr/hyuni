import { getPosts, GetPostsOptions } from '@/firebase/posts';
import styles from './PostGrid.module.css';
import PostItem from './PostItem';

interface Props {
  category?: string;
  series?: string;
  options?: GetPostsOptions;
}

export default async function PostGrid({ category, series, options = {} }: Props) {
  const posts = await getPosts(category, series, options);

  return (
    <div className={styles.PostGrid}>
      {
        posts.map((post, i) => <PostItem key={i} post={post} />)
      }
    </div>
  );
}