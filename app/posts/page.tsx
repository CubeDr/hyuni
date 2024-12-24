import { getCategories } from '@/firebase/categories';
import { getPostsCount } from '@/firebase/posts';
import { Metadata } from 'next';
import AppBar from '../component/appbar/AppBar';
import CategoryDropdownSelect from './CategoryDropdownSelect';
import PostGrid from './PostGrid';

export const dynamic = 'force-dynamic';

function getMetadataTitle(category: string | null) {
  if (category == null) {
    return '전체 게시글 목록 :: 현이의 개발 이야기';
  }

  return `${category} 카테고리의 게시글 목록 :: 현이의 개발 이야기`;
}

function getMetadataDescription(category: string | null, postsCount: number) {
  if (category == null) {
    return `게시글 총 ${postsCount}개. 김현이 - "좋은 코드가 좋은 제품을 만든다"를 믿는 개발자입니다.`;
  }

  return `${category} 카테고리의 게시글 총 ${postsCount}개. 김현이 - "좋은 코드가 좋은 제품을 만든다"를 믿는 개발자입니다.`;
}

export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
  const category = searchParams.category;
  const postsCount = await getPostsCount(category);

  return {
    title: getMetadataTitle(category),
    description: getMetadataDescription(category, postsCount),
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
  const postsCount = await getPostsCount(category);

  return (
    <>
      <AppBar title={`게시글 - ${postsCount}개`}>
        <CategoryDropdownSelect categories={categories} />
      </AppBar>
      <PostGrid category={category} />
    </>
  );
}