import styles from './interviewItem.module.css';

interface InterviewItemProps {
    title: string;
    attribution: string;
    date: string;
    linkUrl: string;
}

export default function InterviewItem({ title, attribution, linkUrl, date }: InterviewItemProps) {
    return (
        <a href={linkUrl} className={styles.InterviewItem}>
            <div className={styles.Content}>
                <div className={styles.Title}>{title}</div>
                <div className={styles.Footer}>{attribution} · {date}</div>
            </div>
            <img src="https://placehold.co/72x84" className={styles.Image}/>
        </a>
    );
}