import styles from './intro.module.css';
import { Courgette } from 'next/font/google'

const courgette = Courgette({ subsets: ['latin'], weight: '400' });

export default function Intro() {
    return (
        <div className={styles.Intro}>
            <div className={styles.IntroMain}>
                <div className={styles.Hi}>Greetings!</div>
                <div>I'm <b>Hyuni</b>,<br />a software engineer believing</div>
                <div className={styles.IntroQuote + ' ' + courgette.className}>a Good Code<br />makes<br />a Good Product</div>
            </div>
            <img
                className={styles.IntroImage}
                src='https://firebasestorage.googleapis.com/v0/b/hyuni-website.appspot.com/o/hyuni-compressed.jpg?alt=media&token=f62875f8-d497-47cf-a75a-986b61fe420b' />
        </div>
    );
}