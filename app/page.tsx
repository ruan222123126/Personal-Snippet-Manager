import { getSnippets, type SnippetWithTags, type SnippetFilters } from "@/lib/data";
import { SnippetCard } from "@/components/SnippetCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { AdvancedSearchPanel } from "@/components/AdvancedSearchPanel";
import { FilterChips } from "@/components/FilterChips";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    languages?: string;
    tags?: string;
    dateRange?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q;
  const tag = params.tag;

  // 解析筛选参数
  const filters: SnippetFilters = {
    languages: params.languages?.split(',').map(s => s.trim()),
    tags: params.tags?.split(',').map(s => s.trim()),
    dateRange: params.dateRange as SnippetFilters['dateRange'],
    sortBy: params.sortBy as SnippetFilters['sortBy'],
    sortOrder: params.sortOrder as SnippetFilters['sortOrder'],
  };

  const snippets = await getSnippets(q, tag, filters);

  // 获取元数据（语言和标签列表）
  const metadataResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/metadata`, {
    cache: 'force-cache', // 缓存 10 分钟
    next: { revalidate: 600 },
  });
  const metadata = await metadataResponse.json();

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

        {/* 筛选面板 */}
        <AdvancedSearchPanel metadata={metadata} />

        {/* 筛选条件标签 */}
        <FilterChips
          languages={filters.languages}
          tags={filters.tags}
          dateRange={filters.dateRange}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
        />

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
              <SnippetCard key={snippet.id} snippet={snippet} query={q} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
