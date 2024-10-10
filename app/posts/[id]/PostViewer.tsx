import { timestampToString } from '@/utils/time';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import OpenGraphBlock from './OpenGraphBlock';
import styles from './PostViewer.module.css';

interface Props {
  post: Post;
}

export default function PostViewer({ post: {
  title,
  category,
  timestamp,
  blocks,
} }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <div className={styles.HeaderRow}>
        <span>&gt; {category}</span>
        <span>{timestampToString(timestamp)}</span>
      </div>
      <hr className={styles.Divider} />
      <div className={styles.Content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a({ href, children }) {
              if (href != null && href === children?.toString()) {
                return <OpenGraphBlock url={href} />
              } else {
                return <a href={href}>{children}</a>
              }
            },
            img(props) {
              return (
                <>
                  <img src={props.src} alt={props.alt} className={styles.Image} />
                  <span className={styles.Caption}>{props.alt}</span>
                </>
              );
            }
          }}
        >
          {blocks[0].content}
        </ReactMarkdown>
      </div>
    </>
  );
}