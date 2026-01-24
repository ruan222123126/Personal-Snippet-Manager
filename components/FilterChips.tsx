'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';

interface FilterChipsProps {
  languages?: string[];
  tags?: string[];
  dateRange?: string;
  sortBy?: string;
  sortOrder?: string;
}

/**
 * 筛选条件标签组件
 *
 * 显示当前激活的筛选条件，允许用户快速移除单个筛选或清除所有筛选
 */
export function FilterChips({
  languages,
  tags,
  dateRange,
  sortBy,
  sortOrder,
}: FilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 移除单个筛选条件
  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // 对于数组类型的筛选（语言、标签），移除特定值
      const currentValues = params.get(key)?.split(',').filter(v => v !== value) || [];
      if (currentValues.length > 0) {
        params.set(key, currentValues.join(','));
      } else {
        params.delete(key);
      }
    } else {
      // 对于单个值的筛选，直接删除
      params.delete(key);
    }

    router.push(`/?${params.toString()}`);
  };

  // 清除所有筛选
  const clearAllFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get('q');
    if (q) params.set('q', q);
    router.push(`/?${params.toString()}`);
  };

  // 检查是否有激活的筛选
  const hasFilters =
    (languages && languages.length > 0) ||
    (tags && tags.length > 0) ||
    dateRange ||
    sortBy ||
    sortOrder;

  if (!hasFilters) return null;

  // 日期范围显示名称
  const dateRangeLabels: Record<string, string> = {
    today: '今天',
    week: '最近一周',
    month: '最近一月',
    quarter: '最近三月',
    all: '全部',
  };

  // 排序显示名称
  const sortByLabels: Record<string, string> = {
    createdAt: '创建时间',
    updatedAt: '更新时间',
  };

  const sortOrderLabels: Record<string, string> = {
    asc: '升序',
    desc: '降序',
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">筛选条件：</span>

      {/* 语言筛选 */}
      {languages?.map(lang => (
        <button
          key={lang}
          onClick={() => removeFilter('languages', lang)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <Icon icon="lucide:code-2" className="w-3.5 h-3.5" />
          <span>{lang}</span>
          <XMarkIcon className="w-3.5 h-3.5 ml-0.5" />
        </button>
      ))}

      {/* 标签筛选 */}
      {tags?.map(tag => (
        <button
          key={tag}
          onClick={() => removeFilter('tags', tag)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          <Icon icon="lucide:tag" className="w-3.5 h-3.5" />
          <span>{tag}</span>
          <XMarkIcon className="w-3.5 h-3.5 ml-0.5" />
        </button>
      ))}

      {/* 时间范围筛选 */}
      {dateRange && (
        <button
          onClick={() => removeFilter('dateRange')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          <Icon icon="lucide:calendar" className="w-3.5 h-3.5" />
          <span>{dateRangeLabels[dateRange]}</span>
          <XMarkIcon className="w-3.5 h-3.5 ml-0.5" />
        </button>
      )}

      {/* 排序筛选 */}
      {(sortBy || sortOrder) && (
        <button
          onClick={() => {
            if (sortBy) removeFilter('sortBy');
            if (sortOrder) removeFilter('sortOrder');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
        >
          <Icon icon="lucide:arrow-up-down" className="w-3.5 h-3.5" />
          <span>
            {sortBy && sortByLabels[sortBy]}
            {sortOrder && ` · ${sortOrderLabels[sortOrder]}`}
          </span>
          <XMarkIcon className="w-3.5 h-3.5 ml-0.5" />
        </button>
      )}

      {/* 清除所有按钮 */}
      <button
        onClick={clearAllFilters}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-2"
      >
        <Icon icon="lucide:trash-2" className="w-3.5 h-3.5" />
        <span>清除全部</span>
      </button>
    </div>
  );
}
