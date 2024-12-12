import { Metadata } from 'next';
import AppBar from '../component/appbar/AppBar';
import CategoryDropdownSelect from './CategoryDropdownSelect';
import PostGrid from './PostGrid';
import { getCategories } from '@/firebase/categories';

export function generateMetadata({ searchParams }: { searchParams: any }): Metadata {
  return {
    title: `${searchParams.category ?? 'Posts'} :: 현이의 개발 이야기`,
    description: '"좋은 코드가 좋은 제품을 만든다"를 믿는 개발자입니다.',
    authors: [{ name: '김현이 (Hyuni Kim)', url: 'https://hyuni.dev' }],
    creator: '김현이 (Hyuni Kim)',
    openGraph: {
      url: 'https://www.hyuni.dev/posts',
      type: 'website',
      images: {
        url: 'https://www.hyuni.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhyuni-compressed.2bc011b3.jpg&w=384&q=75',
      },
    },
  };
}

export default async function Posts({ searchParams }: { searchParams: any }) {
  const category = searchParams.category;
  const categories = await getCategories();

  return (
    <>
      <AppBar title="Posts">
        <CategoryDropdownSelect categories={categories} />
      </AppBar>
      <PostGrid category={category} />
    </>
  );
}