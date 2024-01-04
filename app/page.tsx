import Intro from './component/intro/intro';
import ExperienceModule from './component/module/experience/experienceModule';
import InterviewModule from './component/module/interview/interviewModule';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <div className='row'>
        <ExperienceModule className={styles.ExperienceModule} />
        <div style={{flexGrow: 1}} />
        <InterviewModule className={styles.ExperienceModule} />
      </div>
    </div>
  )
};
