'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TagInput } from '@/components/ui/TagInput';
import { TutorialEditor } from '@/components/ui/TutorialEditor';
import { Icon } from '@iconify/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
];

export default function CreateSnippetPage() {
  const router = useRouter();
  const codeTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    language: 'javascript',
    description: '',
    tutorial: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create snippet');
      }

      router.refresh();
      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        formData.code.substring(0, start) + '  ' + formData.code.substring(end);
      setFormData({ ...formData, code: newValue });
      // Set cursor position after the inserted tabs using ref to avoid null reference
      setTimeout(() => {
        if (codeTextAreaRef.current) {
          codeTextAreaRef.current.selectionStart = codeTextAreaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Icon icon="lucide:plus-circle" className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                新建代码片段
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                创建并保存您的代码片段
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Icon icon="lucide:heading" className="w-4 h-4" />
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              required
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="输入代码片段标题"
            />
          </div>

          {/* Language & Tags Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="language" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Icon icon="lucide:code-2" className="w-4 h-4" />
                编程语言 <span className="text-red-500">*</span>
              </label>
              <select
                id="language"
                className="w-full p-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.language}
                onChange={e => setFormData({ ...formData, language: e.target.value })}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Icon icon="lucide:tag" className="w-4 h-4" />
                标签
              </label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Icon icon="lucide:align-left" className="w-4 h-4" />
              描述
            </label>
            <textarea
              id="description"
              rows={3}
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="输入代码片段描述（可选）"
            />
          </div>

          {/* Code */}
          <div>
            <label htmlFor="code" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Icon icon="lucide:file-code" className="w-4 h-4" />
              代码 <span className="text-red-500">*</span>
            </label>
            <textarea
              ref={codeTextAreaRef}
              id="code"
              required
              rows={12}
              className="w-full p-3 border rounded-md font-mono text-sm dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              value={formData.code}
              onChange={e => setFormData({ ...formData, code: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="粘贴或输入代码..."
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              提示：使用 Tab 键缩进
            </p>
          </div>

          {/* Tutorial */}
          <TutorialEditor
            value={formData.tutorial}
            onChange={(value) => setFormData({ ...formData, tutorial: value })}
            placeholder="使用 Markdown 编写教学说明，帮助理解代码的使用方法、原理和实践..."
          />

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              disabled={isSubmitting}
              type="submit"
              className="inline-flex items-center justify-center gap-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon="lucide:save" className="w-4 h-4" />
              {isSubmitting ? '保存中...' : '创建片段'}
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
            >
              <Icon icon="lucide:x" className="w-4 h-4" />
              取消
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
