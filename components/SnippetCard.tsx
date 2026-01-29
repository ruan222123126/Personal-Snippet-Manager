'use client';

import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { SnippetActions } from '@/components/SnippetActions';
import { TutorialView } from '@/components/ui/TutorialView';
import { type SnippetWithTags, type Tag } from '@/lib/data';
import { highlightKeywords, extractKeywords } from '@/lib/highlight';
import { useState } from 'react';

interface SnippetCardProps {
  snippet: SnippetWithTags;
  /** 搜索查询字符串，用于高亮匹配的关键词 */
  query?: string;
}

/**
 * 代码片段卡片组件
 *
 * 显示单个代码片段的摘要信息，包括：
 * - 标题、描述、语言标签
 * - 代码预览（带语法高亮）
 * - 标签列表
 * - 创建时间
 * - 操作按钮（编辑、删除、教学说明）
 * - 搜索关键词高亮（当提供 query 时）
 *
 * 点击卡片可跳转到详情页
 */
export function SnippetCard({ snippet, query }: SnippetCardProps) {
  const [showTutorial, setShowTutorial] = useState(false);

  // 提取搜索关键词用于高亮
  const keywords = query ? extractKeywords(query) : [];

  // 生成高亮的 HTML
  const highlightedTitle = keywords.length > 0
    ? highlightKeywords(snippet.title, keywords)
    : snippet.title;

  const highlightedDescription = snippet.description && keywords.length > 0
    ? highlightKeywords(snippet.description, keywords)
    : snippet.description;
  return (
    <div className="break-inside-avoid bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300 ease-in-out overflow-hidden flex flex-col group relative h-fit">
      {/* Link overlay - 点击整个卡片跳转 */}
      <Link
        href={`/snippets/${snippet.id}`}
        className="absolute inset-0 z-0"
        aria-label={`查看 ${snippet.title} 详情`}
      />

      {/* Card Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h2
            className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1 flex-1 pr-2"
            title={snippet.title}
            dangerouslySetInnerHTML={{ __html: highlightedTitle }}
          />
          <div className="flex items-center gap-2 shrink-0">
            {/* 教学说明按钮 - 只在有教学说明时显示 */}
            {snippet.tutorial && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowTutorial(true);
                }}
                className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                title="查看教学说明"
                aria-label="查看教学说明"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </button>
            )}
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
              {snippet.language}
            </span>
            <SnippetActions snippetId={snippet.id} />
          </div>
        </div>
        {snippet.description && (
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2"
            dangerouslySetInnerHTML={{ __html: highlightedDescription || '' }}
          />
        )}
        <div className="text-xs text-gray-400 font-mono">
          {new Date(snippet.createdAt).toLocaleDateString('zh-CN')}
        </div>
      </div>

      {/* Code Block */}
      <div className="p-4 flex-1 relative z-10 pointer-events-none">
        <CodeBlock code={snippet.code} language={snippet.language} maxLines={8} />
      </div>

      {/* Tags */}
      {snippet.tags.length > 0 && (
        <div className="px-4 pb-4 flex flex-wrap gap-2 relative z-10 pointer-events-none">
          {snippet.tags.map(({ tag }: { tag: Tag }) => (
            <span
              key={tag.id}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Tutorial Modal */}
      {showTutorial && snippet.tutorial && (
        <TutorialView
          tutorial={snippet.tutorial}
          language={snippet.language}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </div>
  );
}
