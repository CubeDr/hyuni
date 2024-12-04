import { getPosts } from '@/firebase/posts';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://hyuni.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const postIds = posts.map((post) => post.id).filter((id) => id != null);

  return [
    {
      url: BASE_URL,
    },
    {
      url: BASE_URL + '/posts',
    },
    ...postIds.map((id) => ({
      url: BASE_URL + '/posts/' + id,
    })),
  ];
}
