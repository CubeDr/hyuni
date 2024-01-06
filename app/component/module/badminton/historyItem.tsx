import styles from './badminton.module.css';
import Image from 'next/image';
import goldMedalImage from '../../../../public/images/gold-medal.png';
import silverMedalImage from '../../../../public/images/silver-medal.png';

interface HistoryItem {
    result: 'gold' | 'silver';
    group: string;
    date: string;
    competition: string;
}

export default function HistoryItem({ result, group, date, competition }: HistoryItem) {
    return (
        <div className={styles.HistoryItem}>
            <div>
                <Image className={styles.MedalIcon} src={result === 'gold' ? goldMedalImage : silverMedalImage} alt={result === 'gold' ? 'gold medal' : 'silver medal'} width={16} height={16} />
                {group} · {competition}
            </div>
            <span className={styles.HistoryItemDate}>{date}</span>
        </div>
    );
}