'use client';

import { useState, useEffect } from 'react';
import { highlightCode } from '@/lib/shiki';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    highlightCode(code, language).then((highlightedHtml) => {
      if (!cancelled) {
        setHtml(highlightedHtml);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  // 加载中状态显示纯代码
  if (!html) {
    return (
      <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#0d1117]">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <CopyButton code={code} />
        </div>
        <pre className="text-sm font-mono overflow-x-auto p-4">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#0d1117]">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <CopyButton code={code} />
      </div>
      <div
        className="text-sm font-mono overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
