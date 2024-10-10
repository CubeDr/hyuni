import Module, { DefaultModuleProps } from '../module';
import ExperienceItem from './experienceItem';
import styles from './ExperienceModule.module.css';

export default function ExperienceModule({ className }: DefaultModuleProps) {
    return (
        <Module title='Experience' className={className}>
            <div className={styles.Body}>
                <div className={styles.Item}>
                    <ExperienceItem title='Google' role='Software Engineer' type='FTE' period='2020 Jun~NOW' isOngoing={true} />
                </div>
                <div className={styles.Item}>
                    <ExperienceItem title='Line Studio' role='Backend Engineer' type='Intern' period='2020 Jan~Feb' isOngoing={false} />
                </div>
                <div className={styles.Item}>
                    <ExperienceItem title='Line Studio' role='Frontend Engineer' type='Intern' period='2019 Jan~Feb' isOngoing={false} />
                </div>
                <div className={styles.Item}>
                    <ExperienceItem title='Samsung Electronics' role='VR Engineer' type='Intern' period='2016 Jan~Feb' isOngoing={false} />
                </div>
            </div>
        </Module>
    );
}