import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { SnippetActions } from '@/components/SnippetActions';
import { type SnippetWithTags, type Tag } from '@/lib/data';
import { highlightKeywords, extractKeywords } from '@/lib/highlight';

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
 * - 操作按钮（编辑、删除）
 * - 搜索关键词高亮（当提供 query 时）
 *
 * 点击卡片可跳转到详情页
 */
export function SnippetCard({ snippet, query }: SnippetCardProps) {
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
    <div className="break-inside-avoid bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300 ease-in-out overflow-hidden flex flex-col group relative">
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
        <CodeBlock code={snippet.code} language={snippet.language} />
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
    </div>
  );
}
