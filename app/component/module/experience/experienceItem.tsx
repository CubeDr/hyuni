import styles from './experienceItem.module.css';

interface ExperienceModuleItemProps {
    title: string;
    role: string;
    type: string;
    period: string;
    isOngoing: boolean;
}

export default function ExperienceItem({ title, role, type, period, isOngoing }: ExperienceModuleItemProps) {
    return (
        <div className={styles.ExperienceItem}>
            <div className={styles.Progress + ' ' + (isOngoing ? styles.Active : styles.Deactive)}>
                <div className={styles.Indicator}></div>
                <br />
                <div className={styles.Line}></div>
            </div>
            <div className={styles.Body + ' ' + (isOngoing ? styles.Ongoing : '')}>
                <span className={styles.Title}>{title}</span>
                <div className={styles.BodyFooter}>
                    {role} · {type}
                    <br />
                    {period}
                </div>
            </div>
        </div>
    );
}