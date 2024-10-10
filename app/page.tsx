import Articles from "@/app/component/articles/Articles";
import Intro from './component/intro/intro';
import AuthoredModule from './component/module/authored/authoredModule';
import ExperienceModule from './component/module/experience/experienceModule';
import InterviewModule from './component/module/interview/interviewModule';
import SkillsModule from './component/module/skills/skillsModule';
import Projects from './component/projects/projects';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <div className={styles.ThreeColumnGrid}>
        <ExperienceModule className={styles.ExperienceModule} />
        <div>
          <SkillsModule />
          <AuthoredModule />
        </div>
        <InterviewModule />
      </div>
      <Articles />
      <Projects />
    </div>
  )
};
