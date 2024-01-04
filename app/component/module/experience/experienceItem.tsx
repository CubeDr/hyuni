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
            <div className={styles.Progress}>
                <div className={styles.Indicator + ' ' + (isOngoing ? styles.Active : styles.Deactive)}></div>
                <br />
                <div className={styles.Line}></div>
            </div>
            <div className={styles.Body}>
                {title}
                <div className={styles.BodyFooter}>
                    {role} · {type}
                    <br />
                    {period}
                </div>
            </div>
        </div>
    );
}