import styles from './intro.module.css';
import { Courgette } from 'next/font/google'
import hyuniImage from '../../../public/images//hyuni-compressed.jpg';
import Image from 'next/image';

const courgette = Courgette({ subsets: ['latin'], weight: '400' });

export default function Intro() {
    return (
        <div className={styles.Intro}>
            <div className={styles.IntroMain}>
                <div className={styles.Hi}>Greetings!</div>
                <div>I&rsquo;m <b className={styles.Name}>Hyuni</b>,<br />a software engineer believing:</div>
                <div className={styles.IntroQuote + ' ' + courgette.className}>a Good Code<br />makes<br />a Good Product</div>
            </div>
            <Image
                src={hyuniImage}
                alt='Hyuni'
                className={styles.IntroImage}
                width={270}
                priority
            />
        </div>
    );
}