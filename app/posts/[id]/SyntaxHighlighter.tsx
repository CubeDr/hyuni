'use client';

import './androidstudio.css';

import hljs from 'highlight.js';
import { useEffect } from 'react';

export default function SyntaxHighlighter() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return <></>;
}