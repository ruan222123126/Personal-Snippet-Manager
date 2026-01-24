'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchSuggestions } from '@/components/SearchSuggestions';
import { SearchHistory } from '@/components/SearchHistory';

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // 更新本地状态当 URL 参数变化时
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSelect = (term: string) => {
    setQuery(term);
    const params = new URLSearchParams(searchParams);
    params.set('q', term);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <SearchSuggestions
          query={query}
          onQueryChange={setQuery}
          onSelect={handleSelect}
        />
      </div>
      <SearchHistory />
    </div>
  );
}
