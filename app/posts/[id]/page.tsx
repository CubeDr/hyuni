import AppBar from '@/app/component/appbar/AppBar';
import { getPost, getPosts } from '@/firebase/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import strip from 'strip-markdown';
import CommentsBlock from './CommentsBlock';
import PostNavigator from './PostNavigator';
import PostViewer from './PostViewer';

interface Props {
  params: {
    id: string;
  }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  // TODO - Find a way to deduplicate the `getPost` call.
  const post = await getPost(id);

  if (post == null) {
    notFound();
  }

  const { title, category, series, blocks, thumbnailImageSrc } = post;
  const description = await remark().use(strip).process(blocks[0].content);
  return {
    title: series ? `[${category}] ${series} :: ${title}` : `[${category}] ${title}`,
    description: description.toString().replaceAll('\n\n', '\n').trim(),
    authors: { 'name': '김현이 (Hyuni Kim)', url: 'https://hyuni.dev' },
    category,
    creator: '김현이 (Hyuni Kim)',
    openGraph: {
      url: 'https://www.hyuni.dev/posts/' + id,
      type: 'website',
      images: {
        url: thumbnailImageSrc,
      },
    },
  };
}

export default async function PostPage({ params: { id } }: Props) {
  // TODO - Find a way to deduplicate the `getPost` call.
  const post = await getPost(id);

  if (post == null) {
    notFound();
  }

  const seriesPosts = post.series != null ? await getPosts(post.category, post.series) : [];
  const index = seriesPosts.findIndex((post) => post.id === id);
  const prevPost = seriesPosts[index + 1];
  const nextPost = seriesPosts[index - 1];

  return (
    <>
      <AppBar />
      <PostViewer post={post} />
      {(prevPost != null || nextPost != null) &&
        <PostNavigator prevPost={prevPost} nextPost={nextPost} />
      }
      <CommentsBlock postId={id} />
    </>
  );
}