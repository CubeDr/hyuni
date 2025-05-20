import { ClipboardEvent, useCallback, useEffect, useRef } from 'react';
import styles from './Editor.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
}

function getClipboardImageFileName(file: File) {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

  const now = new Date();

  const padToTwoDigits = (num: number) => num.toString().padStart(2, '0');

  const year = now.getFullYear();
  const month = padToTwoDigits(now.getMonth() + 1);
  const day = padToTwoDigits(now.getDate());
  const hours = padToTwoDigits(now.getHours());
  const minutes = padToTwoDigits(now.getMinutes());
  const seconds = padToTwoDigits(now.getSeconds());

  return `${year}${month}${day}_${hours}${minutes}${seconds}_c.${extension}`;
}

export default function Editor({ value, onChange, multiline = true, className }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const onPaste = useCallback(async (e: ClipboardEvent) => {
    let item = null;
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === 0) {
        item = items[i];

        break;
      }
    }
    if (item == null) return;

    const file = item.getAsFile();
    if (file == null) return;

    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file, getClipboardImageFileName(file));

    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    onChange(value + `\n![](https://lh3.googleusercontent.com/d/${data.id})`);
  }, [value, onChange]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (textarea && lineNumbers) {
      const updateLineNumbers = () => {
        const lines = textarea.value.split('\n');
        const lineNumbersContent = lines.map((_, index) => index + 1).join('<br />');
        lineNumbers.innerHTML = lineNumbersContent;
      };

      updateLineNumbers();

      textarea.addEventListener('input', updateLineNumbers);
      textarea.addEventListener('scroll', () => {
        lineNumbers.scrollTop = textarea.scrollTop;
      });

      return () => {
        textarea.removeEventListener('input', updateLineNumbers);
        textarea.removeEventListener('scroll', () => {
          lineNumbers.scrollTop = textarea.scrollTop;
        });
      };
    }
  }, [value]);

  return (
    <div className={styles.EditorContainer + ' ' + className}>
      {multiline
        &&
        <div className={styles.LineNumbers} ref={lineNumbersRef} />
      }
      <textarea
        className={styles.Textarea}
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={multiline ? undefined : 1}
        onPaste={onPaste}
      />
    </div>
  );
};
