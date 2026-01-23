'use client';

import { useState, KeyboardEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export function TagInput({ tags, setTags }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md focus-within:ring-2 ring-blue-500 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      {tags.map(tag => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
        >
          #{tag}
          <button
            onClick={() => removeTag(tag)}
            className="hover:text-blue-600 dark:hover:text-blue-300"
            type="button"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? 'Add tags (press Enter)...' : ''}
        className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
      />
    </div>
  );
}
