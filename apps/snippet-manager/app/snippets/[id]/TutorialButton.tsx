'use client';

import { useState } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { TutorialView } from '@/components/ui/TutorialView';

interface TutorialButtonProps {
  tutorial: string;
  language: string;
}

/**
 * 教学说明按钮组件
 *
 * 在详情页右上角显示教学说明按钮
 * 点击后打开模态框查看完整的教学内容
 */
export function TutorialButton({ tutorial, language }: TutorialButtonProps) {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowTutorial(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
      >
        <BookOpenIcon className="w-4 h-4" />
        教学说明
      </button>

      {showTutorial && (
        <TutorialView
          tutorial={tutorial}
          language={language}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </>
  );
}
