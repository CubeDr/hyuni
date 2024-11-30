import Articles from "@/app/component/articles/Articles";
import Intro from './component/intro/intro';
import Modules from './component/module/modules';
import Posts from './posts/page';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <Modules />
      <Articles />
      <Posts />
    </div>
  )
};
