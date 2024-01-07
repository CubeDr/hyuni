import Chip from '../../chip/chip';
import styles from './jbtimer.module.css';
import Image from 'next/image';
import HomeImage from '../../../../public/images/jbtimer-home-compressed.png';
import RecordsImage from '../../../../public/images/jbtimer-records-compressed.png';
import GraphImage from '../../../../public/images/jbtimer-graph-compressed.png';

export default function JBTimer() {
    return (
        <div className={styles.JBTimer}>
            <div className={styles.Header}>
                <a className={styles.Link} href='https://hy-cs-team.github.io/jbtimer/'>https://hy-cs-team.github.io/jbtimer/</a>
                <div className={styles.Stacks}>
                    <Chip text='Flutter' fontSize={12} />
                </div>
            </div>
            <p>
                JBTimer is a <b>cube timer application</b> available on Web.
            </p>
            <div className={styles.Body}>
                <Image
                    src={HomeImage}
                    className={styles.Image}
                    alt='JBTimer home' />
                <Image
                    src={RecordsImage}
                    className={styles.Image}
                    alt='JBTimer records' />
                <Image
                    src={GraphImage}
                    className={styles.Image}
                    alt='JBTimer graph' />
                <div className={styles.Content}>
                    <div className={styles.Description}>
                        This is a renewal version of my old JBTimer, the most valuable project that led me to the path of a software engineer.
                        <br /><br />
                        JBTimer supports many useful features for speedcube-solving, such as statistics, scramble, graph, storage, etc.
                    </div>
                    <div className={styles.Footer}>
                        <a
                            href='https://github.com/hy-cs-team/jbtimer'
                            target='_blank'>
                            View on Github →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}