import Intro from './component/intro/intro';
import AuthoredModule from './component/module/authored/authoredModule';
import ExperienceModule from './component/module/experience/experienceModule';
import InterviewModule from './component/module/interview/interviewModule';
import SkillsModule from './component/module/skills/skillsModule';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <div className='row'>
        <ExperienceModule className={styles.ExperienceModule} />
        <div className={styles.CenterModulesBlock}>
          <SkillsModule />
          <AuthoredModule />
        </div>
        <InterviewModule className={styles.ExperienceModule} />
      </div>
    </div>
  )
};
