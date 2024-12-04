import styles from './ShortLinks.module.css';
import github from '../public/images/github.png';
import instagram from '../public/images/instagram.png';
import mail from '../public/images/mail.png';
import Image from 'next/image';

export default function ShortLinks() {
  return (
    <div className={styles.ShortLinks}>
      <a className={styles.Button} href="https://github.com/CubeDr" title="Github">
        <Image
          src={github}
          alt='깃헙'
          className={styles.Image}
          loading='eager'
        />
      </a>
      <a className={styles.Button} href="https://github.com/CubeDr" title="Instagram">
        <Image
          src={instagram}
          alt='Instagram'
          className={styles.Image}
          loading='eager'
        />
      </a>
      <div className={styles.Divider} />
      <a className={styles.Button} href="mailto:jbhyunikim@gmail.com" title="jbhyunikim@gmail.com">
        <Image
          src={mail}
          alt='Send an email'
          className={styles.Image}
          loading='eager'
        />
      </a>
    </div>
  );
}