'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, TagIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { type SuggestionItem } from '@/lib/search-suggestions';

interface SearchSuggestionsProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSelect: (query: string) => void;
}

/**
 * 搜索建议下拉组件
 *
 * 功能：
 * - 防抖加载（300ms）
 * - 键盘导航（上下箭头、Enter、ESC）
 * - 分组显示（标题、标签、语言）
 */
export function SearchSuggestions({ query, onQueryChange, onSelect }: SearchSuggestionsProps) {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQueryRef = useRef<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 防抖处理搜索查询
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== debouncedQueryRef.current) {
        debouncedQueryRef.current = query;
        if (query.length >= 1) {
          loadSuggestions(query);
        } else {
          setSuggestions([]);
          setIsOpen(false);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // 加载搜索建议
  const loadSuggestions = async (q: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(q)}&limit=5`);
      const data = await response.json();
      setSuggestions(data);
      setIsOpen(data.length > 0);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        if (isOpen && suggestions.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        }
        break;
      case 'ArrowUp':
        if (isOpen && suggestions.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && selectedIndex >= 0 && selectedIndex < suggestions.length) {
          // 选中建议项
          handleSelect(suggestions[selectedIndex]);
        } else {
          // 执行搜索（包括空搜索，显示全部）
          onSelect(query.trim());
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
        }
        break;
    }
  };

  // 选择建议项
  const handleSelect = (item: SuggestionItem) => {
    onSelect(item.text);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 按类型分组建议
  const groupedSuggestions = {
    title: suggestions.filter(s => s.type === 'title'),
    tag: suggestions.filter(s => s.type === 'tag'),
    language: suggestions.filter(s => s.type === 'language'),
  };

  const typeLabels = {
    title: { label: '标题', icon: MagnifyingGlassIcon },
    tag: { label: '标签', icon: TagIcon },
    language: { label: '语言', icon: CodeBracketIcon },
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query.length >= 1 && suggestions.length > 0) {
            setIsOpen(true);
          }
        }}
        placeholder="搜索代码片段..."
        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />

      {/* 搜索图标 */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

      {/* 下拉建议 */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              加载中...
            </div>
          )}

          {!loading && (
            <>
              {Object.entries(groupedSuggestions).map(([type, items]) =>
                items.length > 0 ? (
                  <div key={type} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                      {typeLabels[type as keyof typeof typeLabels].label}
                    </div>
                    {items.map((item, index) => {
                      const globalIndex = suggestions.indexOf(item);
                      const isSelected = selectedIndex === globalIndex;
                      const Icon = typeLabels[item.type].icon;

                      return (
                        <button
                          key={`${item.type}-${item.text}`}
                          onClick={() => handleSelect(item)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                            isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                            {item.text}
                          </span>
                          {item.count !== undefined && (
                            <span className="text-xs text-gray-400">
                              {item.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : null
              )}
            </>
          )}

          {/* 快捷键提示 */}
          <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <span className="inline-flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">↑↓</kbd>
              导航
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px] ml-2">Enter</kbd>
              选择
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px] ml-2">ESC</kbd>
              关闭
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
