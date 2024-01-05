import styles from './badminton.module.css';

interface HistoryItem {
    result: string;
    group: string;
    date: string;
    competition: string;
}

export default function HistoryItem({ result, group, date, competition }: HistoryItem) {
    return (
        <div className={styles.HistoryItem}>
            <div className={styles.HistoryItemTitle}>
                {result} · {group} · {competition}<span className={styles.HistoryItemDate}>{date}</span>
            </div>
        </div>
    );
}