import { getCategories } from '@/firebase/categories';
import { getPosts } from '@/firebase/posts';
import { getSeriesList } from '@/firebase/series';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://hyuni.dev';

export const dynamic = 'force-dynamic';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const offset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(
    2,
    '0'
  );
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
  const offsetSign = offset >= 0 ? '+' : '-';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const categories = await getCategories();

  const series = await Promise.all(
    categories.map((category) => getSeriesList(category))
  );

  return [
    {
      url: BASE_URL,
      lastModified: formatDate(
        Math.max(...posts.map((post) => post.lastUpdated ?? post.timestamp))
      ),
    },
    {
      url: BASE_URL + '/posts',
      lastModified: formatDate(
        Math.max(...posts.map((post) => post.lastUpdated ?? post.timestamp))
      ),
    },
    ...categories.map((category) => ({
      url: BASE_URL + '/posts?category=' + category,
      lastModified: formatDate(
        Math.max(
          ...posts
            .filter((post) => post.category === category)
            .map((post) => post.lastUpdated ?? post.timestamp)
        )
      ),
    })),
    ...series.flatMap((seriesList, i) =>
      seriesList.map((series) => ({
        url:
          BASE_URL +
          '/posts?category=' +
          categories[i] +
          '&amp;series=' +
          series,
        lastModified: formatDate(
          Math.max(
            ...posts
              .filter((post) => post.series === series)
              .map((post) => post.lastUpdated ?? post.timestamp)
          )
        ),
      }))
    ),
    ...posts.map(({ id, timestamp, lastUpdated }) => ({
      url: BASE_URL + '/posts/' + id,
      lastModified: formatDate(lastUpdated ?? timestamp),
    })),
  ];
}
