'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';

interface Metadata {
  languages: string[];
  tags: Array<{ id: string; name: string; color?: string | null }>;
}

interface AdvancedSearchPanelProps {
  metadata: Metadata;
}

/**
 * 高级搜索面板组件
 *
 * 可折叠的筛选面板，提供以下功能：
 * - 语言多选器
 * - 标签多选器
 * - 时间范围选择器
 * - 排序选择器
 */
export function AdvancedSearchPanel({ metadata }: AdvancedSearchPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // 当前选中的筛选条件
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('desc');

  // 从 URL 初始化筛选条件
  useEffect(() => {
    const languages = searchParams.get('languages')?.split(',').filter(Boolean) || [];
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const range = searchParams.get('dateRange') || 'all';
    const sort = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('sortOrder') || 'desc';

    setSelectedLanguages(languages);
    setSelectedTags(tags);
    setDateRange(range);
    setSortBy(sort);
    setSortOrder(order);
  }, [searchParams]);

  // 应用筛选
  const applyFilters = () => {
    const params = new URLSearchParams();

    // 保留搜索查询
    const q = searchParams.get('q');
    if (q) params.set('q', q);

    // 设置筛选条件
    if (selectedLanguages.length > 0) {
      params.set('languages', selectedLanguages.join(','));
    }
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    if (dateRange !== 'all') {
      params.set('dateRange', dateRange);
    }
    if (sortBy !== 'createdAt') {
      params.set('sortBy', sortBy);
    }
    if (sortOrder !== 'desc') {
      params.set('sortOrder', sortOrder);
    }

    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  // 切换语言选择
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="mb-6">
      {/* 切换按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300"
      >
        <Icon icon="lucide:sliders-horizontal" className="w-5 h-5" />
        <span>高级筛选</span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>

      {/* 面板内容 */}
      {isOpen && (
        <div className="mt-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm space-y-6">
          {/* 语言筛选 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Icon icon="lucide:code-2" className="w-4 h-4" />
              编程语言
            </h3>
            <div className="flex flex-wrap gap-2">
              {metadata.languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguages.includes(lang)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* 标签筛选 */}
          {metadata.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Icon icon="lucide:tag" className="w-4 h-4" />
                标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.name)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag.name)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 时间范围筛选 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Icon icon="lucide:calendar" className="w-4 h-4" />
              时间范围
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: '全部' },
                { value: 'today', label: '今天' },
                { value: 'week', label: '最近一周' },
                { value: 'month', label: '最近一月' },
                { value: 'quarter', label: '最近三月' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setDateRange(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    dateRange === option.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 排序选项 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Icon icon="lucide:arrow-up-down" className="w-4 h-4" />
              排序方式
            </h3>
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">创建时间</option>
                <option value="updatedAt">更新时间</option>
              </select>

              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">降序</option>
                <option value="asc">升序</option>
              </select>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={applyFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Icon icon="lucide:check" className="w-4 h-4" />
              应用筛选
            </button>
            <button
              onClick={() => {
                setSelectedLanguages([]);
                setSelectedTags([]);
                setDateRange('all');
                setSortBy('createdAt');
                setSortOrder('desc');
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
            >
              <Icon icon="lucide:rotate-ccw" className="w-4 h-4" />
              重置
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
