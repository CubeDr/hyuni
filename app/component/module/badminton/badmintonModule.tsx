import Module, { DefaultModuleProps } from '../module';
import styles from './badminton.module.css';
import HistoryItem from './historyItem';

export default function BadmintonModule({ className }: DefaultModuleProps) {
    return (
        <Module title='Badminton' className={className}>
            <div className={styles.Body}>
                <img className={styles.Image} src='https://placehold.co/90x120' />
                <div className={styles.Content}>
                    <div className={styles.Current}>Nationwide 20 B</div>
                    <div className={styles.History}>
                        <div className={styles.HistoryTitle}>
                            Competition Records
                        </div>
                        <HistoryItem
                            result='1st place'
                            group='20 C'
                            date='23.12.03'
                            competition='Nationwide' />
                        <HistoryItem
                            result='2nd place'
                            group='20 C'
                            date='23.10.22'
                            competition='Districtwide' />
                        <HistoryItem
                            result='2nd place'
                            group='20 D'
                            date='23.03.12'
                            competition='Nationwide' />
                    </div>
                </div>
                <iframe className={styles.Video} src="https://www.youtube.com/embed/FN8oDCLz5o8?si=kPVvkGHivTF8WQHy" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </Module>
    );
}