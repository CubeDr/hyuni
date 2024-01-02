import Image from 'next/image'
import styles from './page.module.css'

export default function Page() {
  return (
    <div className='main-column'>
      <div className={styles.intro}>
        <div className={styles.introMain}>
          <div className={styles.hi}>Greetings!</div>
          <div>I'm Hyuni, a software engineer believing a good code makes a good product.</div>
        </div>
        <img src='https://placehold.co/150x180' />
      </div>
    </div>
  )
}
