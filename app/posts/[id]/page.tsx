import { getPost } from '@/firebase/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import strip from 'strip-markdown';
import PostViewer from './PostViewer';
import AppBar from '@/app/component/appbar/AppBar';

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

  const { title, category, blocks } = post;
  const description = await remark().use(strip).process(blocks[0].content);
  return {
    title,
    description: description.toString().replaceAll('\n\n', '\n').trim(),
    authors: { 'name': 'Hyuni Kim', url: 'https://hyuni.dev' },
    category,
    creator: 'Hyuni Kim',
  };
}

export default async function PostPage({ params: { id } }: Props) {
  // TODO - Find a way to deduplicate the `getPost` call.
  const post = await getPost(id);

  if (post == null) {
    notFound();
  }

  return (
    <>
      <AppBar />
      <PostViewer post={post} />
    </>
  );
}