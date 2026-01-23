'use client';

import { useState } from 'react';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      title={copied ? '已复制' : '复制代码'}
    >
      {copied ? (
        <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
      ) : (
        <DocumentDuplicateIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}
