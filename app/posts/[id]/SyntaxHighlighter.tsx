'use client';

import './androidstudio.css';

import hljs from 'highlight.js';
import java from "highlight.js/lib/languages/java";
import { useEffect } from 'react';

export default function SyntaxHighlighter() {
  useEffect(() => {
    // hljs.registerLanguage("javascript", javascript);
    // hljs.registerLanguage("typescript", typescript);
    // hljs.registerLanguage("js", javascript);
    // hljs.registerLanguage("ts", typescript);
    hljs.registerLanguage("java", java);
    // hljs.registerLanguage("kotlin", kotlin);
    // hljs.registerLanguage("json", json);
    // hljs.registerLanguage("html", xml);
    // hljs.registerLanguage("xml", xml);
    // hljs.registerLanguage("python", python);
    // hljs.registerLanguage("css", css);
    // hljs.registerLanguage("sql", sql);
    // hljs.registerLanguage("yaml", yaml);

    hljs.highlightAll();
  }, []);

  return <></>;
}