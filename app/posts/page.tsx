import AppBar from '../component/appbar/AppBar';
import PostGrid from './PostGrid';

export default async function Posts() {
  return (
    <>
      <AppBar title="Posts" />
      <PostGrid />
    </>
  );
}