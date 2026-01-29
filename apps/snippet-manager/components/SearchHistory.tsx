'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClockIcon, FireIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface HistoryItem {
  id: string;
  query: string;
  filters: string | null;
  resultCount: number;
  createdAt: string;
}

interface StatsItem {
  id: string;
  query: string;
  searchCount: number;
  lastSearchedAt: string;
}

/**
 * 搜索历史组件
 *
 * 显示：
 * - 搜索历史记录
 * - 热门搜索（从 SearchStats 获取）
 */
export function SearchHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'popular'>('history');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [popular, setPopular] = useState<StatsItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 加载数据
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'history') {
        const response = await fetch('/api/search/history?limit=10');
        const data = await response.json();
        // 确保 data 是数组
        setHistory(Array.isArray(data) ? data : []);
      } else {
        const response = await fetch('/api/search/stats?limit=10');
        const data = await response.json();
        // 确保 data 是数组
        setPopular(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error loading search data:', error);
      // 出错时设置为空数组
      if (activeTab === 'history') {
        setHistory([]);
      } else {
        setPopular([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // 快速重新搜索
  const quickSearch = (query: string) => {
    const params = new URLSearchParams();
    params.set('q', query);
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  // 删除单条历史
  const deleteHistoryItem = async (id: string) => {
    try {
      await fetch(`/api/search/history?id=${id}`, { method: 'DELETE' });
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  // 清空所有历史
  const clearAllHistory = async () => {
    try {
      await fetch('/api/search/history', { method: 'DELETE' });
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="relative">
      {/* 切换按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        title="搜索历史"
      >
        <ClockIcon className="w-5 h-5" />
      </button>

      {/* 下拉面板 */}
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 面板内容 */}
          <div className="absolute right-0 top-12 z-20 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  历史记录
                </button>
                <button
                  onClick={() => setActiveTab('popular')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'popular'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  热门搜索
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* 内容区域 */}
            <div className="max-h-96 overflow-y-auto p-2">
              {loading ? (
                <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                  加载中...
                </div>
              ) : (
                <>
                  {activeTab === 'history' ? (
                    <>
                      {history.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                          暂无搜索历史
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-2 px-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">最近搜索</span>
                            {history.length > 0 && (
                              <button
                                onClick={clearAllHistory}
                                className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1"
                              >
                                <TrashIcon className="w-3 h-3" />
                                清空
                              </button>
                            )}
                          </div>
                          <div className="space-y-1">
                            {history.map(item => (
                              <div
                                key={item.id}
                                className="group flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <ClockIcon className="w-4 h-4 text-gray-400 shrink-0" />
                                <button
                                  onClick={() => quickSearch(item.query)}
                                  className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 truncate"
                                >
                                  {item.query}
                                </button>
                                <button
                                  onClick={() => deleteHistoryItem(item.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
                                >
                                  <XMarkIcon className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {popular.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                          暂无热门搜索
                        </div>
                      ) : (
                        <>
                          <div className="mb-2 px-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">热门搜索</span>
                          </div>
                          <div className="space-y-1">
                            {popular.map((item, index) => (
                              <button
                                key={item.id}
                                onClick={() => quickSearch(item.query)}
                                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                              >
                                <span className={`text-sm font-bold w-5 ${
                                  index < 3 ? 'text-orange-500' : 'text-gray-400'
                                }`}>
                                  {index + 1}
                                </span>
                                <FireIcon className="w-4 h-4 text-orange-500 shrink-0" />
                                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                                  {item.query}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {item.searchCount} 次
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
