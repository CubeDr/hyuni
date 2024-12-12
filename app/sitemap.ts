import { getCategories } from '@/firebase/categories';
import { getPosts } from '@/firebase/posts';
import { timestampToString } from '@/utils/time';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://hyuni.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const categories = await getCategories();

  return [
    {
      url: BASE_URL,
      lastModified: timestampToString(
        Math.max(...posts.map((post) => post.lastUpdated ?? post.timestamp))
      ),
    },
    {
      url: BASE_URL + '/posts',
      lastModified: timestampToString(
        Math.max(...posts.map((post) => post.lastUpdated ?? post.timestamp))
      ),
    },
    ...posts.map(({ id, timestamp, lastUpdated }) => ({
      url: BASE_URL + '/posts/' + id,
      lastModified: timestampToString(lastUpdated ?? timestamp),
    })),
    ...categories.map((category) => ({
      url: BASE_URL + '/posts?category=' + category,
      lastModified: timestampToString(
        Math.max(
          ...posts
            .filter((post) => post.category === category)
            .map((post) => post.lastUpdated ?? post.timestamp)
        )
      ),
    })),
  ];
}
