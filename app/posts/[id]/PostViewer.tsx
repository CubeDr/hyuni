import { timestampToString } from '@/utils/time';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import OpenGraphBlock from './OpenGraphBlock';
import styles from './PostViewer.module.css';
import { visit } from 'unist-util-visit';

interface Props {
  post: Post;
}

export default function PostViewer({ post: {
  title,
  category,
  series,
  timestamp,
  blocks,
} }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <div className={styles.HeaderRow}>
        <span><a href={`/posts?category=${category}`}>{category}</a> {series && <>&gt; {series}</>}</span>
        <span>{timestampToString(timestamp)}</span>
      </div>
      <hr className={styles.Divider} />
      <div className={styles.Content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, highlightedQuoteBlock]}
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

interface MarkdownNode {
  type: string;
  children?: MarkdownNode[];
  value?: string;
  data?: {
    hProperties?: {
      className?: string;
    };
  };
}

function highlightedQuoteBlock() {
  return (tree: MarkdownNode) => {
    visit(tree, 'paragraph', (node: MarkdownNode) => {
      if (node.children && node.children[0]?.type === 'text' && node.children[0].value?.startsWith('" ')) {
        node.children[0].value = node.children[0].value.slice(2);
        Object.assign(node, {
          type: 'quote',
          data: {
            hProperties: {
              className: styles.HighlightedQuote,
            },
          },
        });
      }
    });
  };
}