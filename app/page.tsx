import Articles from "@/app/component/articles/Articles";
import Intro from './component/intro/intro';
import Modules from './component/module/modules';
import Projects from './component/projects/projects';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <Modules />
      <Articles />
      <Projects />
    </div>
  )
};
