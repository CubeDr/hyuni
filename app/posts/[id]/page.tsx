import { getPost } from '@/firebase/posts';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { remark } from 'remark';
import strip from 'strip-markdown';
import PostViewer from './PostViewer';
import AppBar from '@/app/component/appbar/AppBar';
import SyntaxHighlighter from './SyntaxHighlighter';

// Legacy redirections to keep backwards compatibility from Tistory.
const REDIRECT_IDS: { [key: string]: string } = {
  '4': 'HAkjznuIRlQnBprqvFOB',
  '5': 'xZ7GrXXW94VzT2Lyiz5a',
  '6': '8Jf3g1fgtVA2KrZBkRDQ',
  '7': 'qqK2tlLCrOyYAuahj8FY',
  '9': 'gaF6qaCBBNrWbNgGhFCh',
  '10': 'xvMcnSaFFBBWgfQEiGlU',
  '11': 'JjpxTwTInJLiMpZrRrMU',
  '12': 'sWic09o4Fj0zM9CCIfvW',
  '13': 'W1SN6GS4sKkEpiR9z49j',
  '14': 'mErpELpkjbtMhLJqnEf3',
  '15': 'DM6Cu4G17WtCL45Thv6h',
  '16': 'C6o9S7cMT2ZgSp5HBWv6',
  '17': 'PnunbcBXkULQcxlkji6t',
  '20': '2WPSgdK3zIhf3lmKBqnM',
  '21': '3V4WDdO0M0R4BYcf9Nys',
  '22': 'wBOH6VGYojfO7rRaMspE',
  '23': 'nDxAw1VfvoW8fB9VAemO',
  '24': '71Zll7tsmkfJVcNB3vrm',
  '25': 'xqj8mhTDg9DezzRv8PQs',
  '26': 'm6D7DxBNSDacQn80fJCT',
  '27': 'oq9LfgXh1dxt7uQ46yPS',
  '28': '6DfarGbSppjAMB2AHkY6',
  '29': 'iGsBxcX6PtrYUDhd8t0k',
  '30': '9eusHFxdLOuZdBj4QvrA',
  '31': 'oerJQXugtDUhMy1GSvoJ',
};

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

  const { title, category, series, blocks } = post;
  const description = await remark().use(strip).process(blocks[0].content);
  return {
    title: series ? `[${category}] ${series} :: ${title}` : `[${category}] ${title}`,
    description: description.toString().replaceAll('\n\n', '\n').trim(),
    authors: { 'name': '김현이 (Hyuni Kim)', url: 'https://hyuni.dev' },
    category,
    creator: '김현이 (Hyuni Kim)',
  };
}

export default async function PostPage({ params: { id } }: Props) {
  if (id in REDIRECT_IDS) {
    redirect(`/posts/${REDIRECT_IDS[id]}`);
  }

  // TODO - Find a way to deduplicate the `getPost` call.
  const post = await getPost(id);

  if (post == null) {
    notFound();
  }

  return (
    <>
      <AppBar />
      <PostViewer post={post} />
      <SyntaxHighlighter />
    </>
  );
}