import Articles from "@/app/component/articles/Articles";
import Intro from './component/intro/intro';
import Modules from './component/module/modules';
import PostGrid from './posts/PostGrid';
import Section from './Section';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <Modules />
      <Section title='Articles'>
        <Articles />
      </Section>
      <Section title='Recent Posts' moreLink='/posts'>
        <PostGrid />
      </Section>
    </div>
  )
};
