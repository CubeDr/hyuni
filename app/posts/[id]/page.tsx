import { getPost } from '@/firebase/posts';
import { timestampToString } from '@/utils/time';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import strip from 'strip-markdown';
import styles from './page.module.css';

interface Props {
  params: {
    id: string;
  }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { title, category, blocks } = await getPost(id);
  const description = await remark().use(strip).process(blocks[0].content);
  return {
    title,
    description: description.toString().replaceAll('\n\n', '\n').trim(),
    authors: { 'name': 'Hyuni Kim', url: 'https://hyuni.dev' },
    category,
    creator: 'Hyuni Kim',
  };
}

export default async function PostPage({ params: { id } }: Props) {
  const { title, category, blocks, timestamp } = await getPost(id);

  return (
    <div>
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
    </div>
  );
}