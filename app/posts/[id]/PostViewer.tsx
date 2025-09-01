import Timestamp from '@/app/component/Timestamp';
import 'highlight.js/styles/atom-one-dark.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import OpenGraphBlockClient from './OpenGraphBlockClient';
import OpenGraphBlockServer from './OpenGraphBlockServer';
import styles from './PostViewer.module.css';

interface Props {
  post: Post;
}

export default function PostViewer({ post: {
  title,
  category,
  series,
  tags,
  timestamp,
  blocks,
} }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <div className={styles.HeaderRow}>
        <span>
          <a href={`/posts?category=${category}`}>{category}</a>
          {series && <>&gt; <a href={`/posts?category=${category}&series=${series}`}>{series}</a></>}
          {tags && tags.map((tag) => (
            <a key={tag} href={`/posts?tag=${tag}`}>
              &nbsp; { "#" + tag}
            </a>
          ))}
        </span>
        <span><Timestamp timestamp={timestamp} /></span>
      </div>
      <hr className={styles.Divider} />
      <div className={styles.Content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, highlightedQuoteBlock, centerText, remarkRehype]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            p: ({ node, ...props }) => <div className={styles.Paragraph} {...props} />,
            a({ href, children }) {
              if (href != null && href === children?.toString()) {
                if (typeof window == 'undefined') {
                  return <OpenGraphBlockServer url={href} />
                } else {
                  return <OpenGraphBlockClient url={href} />
                }
              } else {
                return <a href={href} className={styles.Anchor}>{children}</a>
              }
            },
            img(props) {
              return (
                <>
                  <img
                    {...props}
                    className={styles.Image + (props.className ? ' ' + props.className : '')}
                  />
                  <span className={styles.Caption}>{props.alt}</span>
                </>
              );
            },
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

function centerText() {
  return (tree: MarkdownNode) => {
    visit(tree, 'paragraph', (node: MarkdownNode) => {
      if (node.children && node.children[0]?.type === 'text' && node.children[0].value?.startsWith(':: ') && node.children[0].value.endsWith(' ::')) {
        node.children[0].value = node.children[0].value.slice(3, -3);

        Object.assign(node, {
          type: 'div',
          data: {
            hProperties: {
              className: styles.CenterText,
            },
          },
        });
      }
    });
  };
}
