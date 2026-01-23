import { getSnippets } from '@/lib/data';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { SearchBar } from '@/components/ui/SearchBar';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

interface PageProps {
  searchParams: {
    q?: string;
    tag?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  const snippets = await getSnippets(searchParams.q, searchParams.tag);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              代码片段管理器
            </h1>
            <SearchBar />
          </div>
          <Link
            href="/snippets/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-5 h-5" />
            <span>新建</span>
          </Link>
        </div>

        {/* Snippets Grid */}
        {snippets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {searchParams.q || searchParams.tag
                ? '未找到匹配的代码片段'
                : '暂无代码片段'}
            </p>
            {!searchParams.q && !searchParams.tag && (
              <Link
                href="/snippets/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              >
                <PlusIcon className="w-5 h-5" />
                创建第一个代码片段
              </Link>
            )}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="break-inside-avoid bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {snippet.title}
                  </h2>
                  {snippet.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {snippet.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      {snippet.language}
                    </span>
                    <span>
                      {new Date(snippet.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>

                {/* Code Block */}
                <div className="p-4">
                  <CodeBlock code={snippet.code} language={snippet.language} />
                </div>

                {/* Tags */}
                {snippet.tags.length > 0 && (
                  <div className="px-4 pb-4 flex flex-wrap gap-2">
                    {snippet.tags.map(({ tag }) => (
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
