import styles from './page.module.css'
import { Courgette } from 'next/font/google'

const courgette = Courgette({ subsets: ['latin'], weight: '400' });

export default function Page() {
  return (
    <div className='main-column'>
      <div className={styles.Intro}>
        <div className={styles.IntroMain}>
          <div className={styles.Hi}>Greetings!</div>
          <div>I'm <b>Hyuni</b>,<br />a software engineer believing</div>
          <div className={styles.IntroQuote + ' ' + courgette.className}>a Good Code<br />makes<br />a Good Product</div>
        </div>
        <img
          className={styles.IntroImage}
          src='https://firebasestorage.googleapis.com/v0/b/hyuni-website.appspot.com/o/hyuni.jpg?alt=media&token=49a8927a-7606-457d-8107-da0fce03b3ff' />
      </div>
    </div>
  )
};
