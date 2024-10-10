import AuthoredModule from './authored/authoredModule';
import ExperienceModule from './experience/experienceModule';
import InterviewModule from './interview/interviewModule';
import styles from './modules.module.css';
import SkillsModule from './skills/skillsModule';

export default function Modules() {
  return (
    <div className={styles.Modules}>
      <ExperienceModule className={styles.ExperienceModule} />
      <SkillsModule className={styles.SkillsModule} />
      <AuthoredModule className={styles.AuthoredModule} />
      <InterviewModule className={styles.InterviewModule} />
    </div>
  );
}