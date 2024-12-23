import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      Copyright &copy; {new Date().getFullYear()} Hyuni Kim. All rights reserved.
    </footer>
  );
}