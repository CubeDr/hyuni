import React, { useRef, useEffect } from 'react';
import styles from './Editor.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
}

export default function Editor({ value, onChange, multiline = true, className }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

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
      />
    </div>
  );
};
