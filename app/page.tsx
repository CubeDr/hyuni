import Intro from './component/intro/intro';
import AuthoredModule from './component/module/authored/authoredModule';
import BadmintonModule from './component/module/badminton/badmintonModule';
import CubeModule from './component/module/cube/cubeModule';
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
      <div className={styles.TwoColumnGrid}>
        <BadmintonModule />
        <CubeModule />
      </div>
      <Projects />
    </div>
  )
};
