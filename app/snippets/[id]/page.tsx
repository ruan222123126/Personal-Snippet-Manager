import { prisma } from '@/lib/prisma';
import { CodeBlock } from '@/components/ui/CodeBlock';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import { DeleteButton } from './DeleteButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 代码片段详情页
 *
 * 显示单个代码片段的完整信息，包括：
 * - 标题、描述、语言
 * - 完整代码（带语法高亮）
 * - 标签列表
 * - 创建和更新时间
 * - 操作按钮（返回、编辑、删除）
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return {
      title: '代码片段未找到',
    };
  }

  return {
    title: `${snippet.title} - 代码片段`,
    description: snippet.description || snippet.code.slice(0, 160),
  };
}

export default async function SnippetDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 获取代码片段详情
  const snippet = await prisma.snippet.findUnique({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true,
        },
        orderBy: {
          assignedAt: 'asc',
        },
      },
    },
  });

  // 如果代码片段不存在，返回 404
  if (!snippet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>返回列表</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* 编辑按钮 */}
            <Link
              href={`/snippets/${id}/edit`}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              编辑
            </Link>

            {/* 删除按钮 */}
            <DeleteButton snippetId={id} />
          </div>
        </div>

        {/* 详情卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* 头部信息 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {snippet.title}
              </h1>
              <span className="shrink-0 px-3 py-1 text-xs font-medium uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md">
                {snippet.language}
              </span>
            </div>

            {snippet.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {snippet.description}
              </p>
            )}

            {/* 元信息 */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              <div>
                创建时间：{new Date(snippet.createdAt).toLocaleString('zh-CN')}
              </div>
              {snippet.updatedAt !== snippet.createdAt && (
                <div>
                  更新时间：{new Date(snippet.updatedAt).toLocaleString('zh-CN')}
                </div>
              )}
            </div>
          </div>

          {/* 代码块 */}
          <div className="p-6">
            <CodeBlock code={snippet.code} language={snippet.language} />
          </div>

          {/* 标签 */}
          {snippet.tags.length > 0 && (
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map(({ tag }) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1.5 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
