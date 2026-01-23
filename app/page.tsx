import { getSnippets, type SnippetWithTags, type Tag } from "@/lib/data";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SearchBar } from "@/components/ui/SearchBar";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    tag?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q;
  const tag = params.tag;
  const snippets = await getSnippets(q, tag);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] relative">
      {/* 背景装饰光晕 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 标题区域 */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Snippet<span className="text-blue-600 dark:text-blue-400">Manager</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            全栈代码片段管理系统 · FTS5 全文检索 · 语义化标签
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <SearchBar />
            <Link
              href="/snippets/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <PlusIcon className="w-5 h-5" />
              <span>新建</span>
            </Link>
          </div>
        </div>

        {/* Snippets Grid */}
        {snippets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {q || tag ? "未找到匹配的代码片段" : "暂无代码片段"}
            </p>
            {!q && !tag && (
              <Link
                href="/snippets/new"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <PlusIcon className="w-5 h-5" />
                创建第一个代码片段
              </Link>
            )}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {snippets.map((snippet: SnippetWithTags) => (
              <div
                key={snippet.id}
                className="break-inside-avoid bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1" title={snippet.title}>
                      {snippet.title}
                    </h2>
                    <span className="shrink-0 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                      {snippet.language}
                    </span>
                  </div>
                  {snippet.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                      {snippet.description}
                    </p>
                  )}
                  <div className="text-xs text-gray-400 font-mono">
                    {new Date(snippet.createdAt).toLocaleDateString('zh-CN')}
                  </div>
                </div>

                {/* Code Block */}
                <div className="p-4 flex-1">
                  <CodeBlock code={snippet.code} language={snippet.language} />
                </div>

                {/* Tags */}
                {snippet.tags.length > 0 && (
                  <div className="px-4 pb-4 flex flex-wrap gap-2">
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
