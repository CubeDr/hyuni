import Intro from './component/intro/intro';
import ExperienceModule from './component/module/experience/experienceModule';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className='main-column'>
      <Intro />
      <div>
        <ExperienceModule className={styles.ExperienceModule} />
      </div>
    </div>
  )
};
