import Articles from "@/app/component/articles/Articles";
import { Metadata } from 'next';
import Intro from './component/intro/intro';
import Modules from './component/module/modules';
import PostGrid from './posts/PostGrid';
import Section from './Section';
import ShortLinks from './ShortLinks';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  other: {
    'naver-site-verification': '58dca89ab063aa7d6f8a110cbb6c27218e7ac05a',
  },
};

export default function Page() {
  return (
    <>
      <ShortLinks />
      <Intro />
      <Modules />
      <Section title='Articles'>
        <Articles />
      </Section>
      <Section title='Recent Posts' moreLink='/posts'>
        <PostGrid options={{ limit: 12 }} />
      </Section>
    </>
  )
};
