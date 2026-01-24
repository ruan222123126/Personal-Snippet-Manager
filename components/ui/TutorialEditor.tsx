'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore - rehype-raw may not have full type definitions
import rehypeRaw from 'rehype-raw';

interface TutorialEditorProps {
  /** 当前 Markdown 内容 */
  value: string;
  /** 内容变化回调 */
  onChange: (value: string) => void;
  /** 占位符提示 */
  placeholder?: string;
}

/**
 * Markdown 教学内容编辑器
 *
 * 提供分屏预览的 Markdown 编辑器
 * 左侧编辑，右侧实时预览
 */
export function TutorialEditor({
  value,
  onChange,
  placeholder = '使用 Markdown 编写教学说明...'
}: TutorialEditorProps) {
  const [showPreview, setShowPreview] = useState(true);

  // 插入 Markdown 语法辅助函数
  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = document.querySelector('textarea[name="tutorial"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end) || placeholder;
    const afterText = text.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    onChange(newText);

    // 恢复焦点并设置光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  return (
    <div className="space-y-4">
      {/* 工具栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertMarkdown('**', '**', '粗体文本')}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="粗体"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('*', '*', '斜体文本')}
            className="px-3 py-1.5 text-sm italic text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="斜体"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('#### ', '', '标题')}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="标题"
          >
            H
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('`', '`', '代码')}
            className="px-3 py-1.5 text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="行内代码"
          >
            &lt;/&gt;
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('\n```\n', '\n```\n', '代码块')}
            className="px-3 py-1.5 text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="代码块"
          >
            {'{ }'}
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('\n- ', '', '列表项')}
            className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="列表"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('\n> ', '', '引用文本')}
            className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="引用"
          >
            &quot;
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('[', '](url)', '链接文本')}
            className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="链接"
          >
            🔗
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
        >
          {showPreview ? '隐藏预览' : '显示预览'}
        </button>
      </div>

      {/* 编辑器区域 */}
      <div className={`grid gap-4 ${showPreview ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* 编辑区 */}
        <div className="flex flex-col">
          <label
            htmlFor="tutorial"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            教学说明 (Markdown)
          </label>
          <textarea
            id="tutorial"
            name="tutorial"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-h-[400px] p-4 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            spellCheck={false}
          />
        </div>

        {/* 预览区 */}
        {showPreview && (
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              预览
            </label>
            <div className="flex-1 min-h-[400px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-y-auto prose prose-sm dark:prose-invert max-w-none">
              {value ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1({ children }) {
                      return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
                    },
                    h2({ children }) {
                      return <h2 className="text-xl font-bold mb-3 mt-6">{children}</h2>;
                    },
                    h3({ children }) {
                      return <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc list-inside space-y-1 my-3">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal list-inside space-y-1 my-3">{children}</ol>;
                    },
                    li({ children }) {
                      return <li className="text-gray-700 dark:text-gray-300">{children}</li>;
                    },
                    p({ children }) {
                      return <p className="my-3 leading-7">{children}</p>;
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
                          {children}
                        </blockquote>
                      );
                    },
                  }}
                >
                  {value}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic">预览将显示在这里...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Markdown 语法提示 */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Markdown 语法提示：
        </p>
        <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <li><code className="font-mono"># 标题</code> - 一级标题到 <code className="font-mono">###### 六级标题</code></li>
          <li><code className="font-mono">**粗体**</code> 或 <code className="font-mono">*斜体*</code></li>
          <li><code className="font-mono">`代码`</code> - 行内代码，<code className="font-mono">```代码块```</code> - 代码块</li>
          <li><code className="font-mono">- 列表项</code> 或 <code className="font-mono">1. 有序列表</code></li>
          <li><code className="font-mono">[链接文本](url)</code> - 创建链接</li>
          <li><code className="font-mono">&gt; 引用文本</code> - 引用块</li>
        </ul>
      </div>
    </div>
  );
}
