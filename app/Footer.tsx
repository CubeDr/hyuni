import styles from './Footer.module.css';
import Login from './Login';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <span className={styles.Login}>
        <Login />
      </span>
      <div className={styles.Copyright}>
        Copyright &copy; {new Date().getFullYear()} Hyuni Kim. All rights reserved
      </div>
    </footer>
  );
}