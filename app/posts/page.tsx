import { Metadata } from 'next';
import AppBar from '../component/appbar/AppBar';
import PostGrid from './PostGrid';

export const metadata: Metadata = {
  title: 'Posts :: 현이의 개발 이야기',
  description: '"좋은 코드가 좋은 제품을 만든다"를 믿는 개발자입니다.',
  authors: [{ name: '김현이 (Hyuni Kim)', url: 'https://hyuni.dev' }],
  creator: '김현이 (Hyuni Kim)',
}

export default async function Posts() {
  return (
    <>
      <AppBar title="Posts" />
      <PostGrid />
    </>
  );
}