import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Preview.module.css';

interface Props {
  content: string;
}

export default function Preview({ content }: Props) {
  return (
    <div className={styles.Preview}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {content.replaceAll('\n', '\\\n')}
      </ReactMarkdown>
    </div>
  );
}