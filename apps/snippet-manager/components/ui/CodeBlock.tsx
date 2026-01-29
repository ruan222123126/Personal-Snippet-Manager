'use client';

import { useState, useEffect } from 'react';
import { highlightCode } from '@/lib/shiki';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language: string;
  /** 最大显示行数，超出部分截断 */
  maxLines?: number;
}

export function CodeBlock({ code, language, maxLines }: CodeBlockProps) {
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

  // 计算固定高度（基于行数）
  const height = maxLines ? `${maxLines * 1.5}rem` : undefined;

  // 加载中状态显示纯代码
  if (!html) {
    return (
      <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#0d1117]" style={height ? { height } : undefined}>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <CopyButton code={code} />
        </div>
        <pre className="text-sm font-mono overflow-hidden p-4 h-full">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#0d1117]" style={height ? { height } : undefined}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <CopyButton code={code} />
      </div>
      <div
        className="text-sm font-mono overflow-hidden p-4 h-full [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
