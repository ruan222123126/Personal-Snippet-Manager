'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore - rehype-raw may not have full type definitions
import rehypeRaw from 'rehype-raw';
import { highlightCode } from '@/lib/shiki';
import { createPortal } from 'react-dom';

interface TutorialViewProps {
  /** Markdown 格式的教学内容 */
  tutorial: string;
  /** 关闭回调 */
  onClose: () => void;
  /** 代码语言 (用于代码块高亮) */
  language?: string;
}

/**
 * 教学内容展示组件
 *
 * 以模态框形式展示 Markdown 格式的教学文档
 * 支持代码高亮、GFM 语法和响应式设计
 */
export function TutorialView({ tutorial, onClose, language = 'text' }: TutorialViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">教学说明</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="关闭"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeLang = match ? match[1] : language;
                  const codeContent = String(children).replace(/\n$/, '');

                  if (codeContent.includes('\n')) {
                    return (
                      <div className="relative group">
                        <pre className={className} {...props}>
                          <code>{children}</code>
                        </pre>
                      </div>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1({ children }) {
                  return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-xl font-bold mb-3 mt-6">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>;
                },
                ul({ children }) {
                  return <ul className="list-disc list-inside space-y-1 my-3">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal list-inside space-y-1 my-3">{children}</ol>;
                },
                li({ children }) {
                  return <li className="text-gray-700 dark:text-gray-300">{children}</li>;
                },
                p({ children }) {
                  return <p className="my-3 leading-7">{children}</p>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {tutorial}
            </ReactMarkdown>
          </article>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            关闭
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
