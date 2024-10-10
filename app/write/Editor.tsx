import React, { useRef, useEffect, useCallback, ClipboardEvent } from 'react';
import styles from './Editor.module.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/firebaseClient';

interface Props {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
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

    const blob = item.getAsFile();
    if (blob == null) return;

    e.preventDefault();

    const filename = new Date().getTime().toString() + '.' + blob.name;
    const snapshot = await uploadBytes(ref(storage, 'posts/images/' + filename), blob);
    const url = await getDownloadURL(snapshot.ref);
    onChange(value + `\n![캡션 텍스트](${url})`);
  }, []);

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
