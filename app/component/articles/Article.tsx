import styles from './Articles.module.css';

interface Props {
  title: string;
  date: string;
  imageUrl: string;
  link: string;
  source: string;
}

export default function Article({title, date, imageUrl, link, source}: Props) {
  return (
    <a className={styles.Article} href={link} style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imageUrl}')`
    }}>
      <span className={styles.ArticleTitle}>{title}</span>
      <div className={styles.ArticleFooter}>
        <span>{source}</span>
        <span>{date}</span>
      </div>
    </a>
  );
}