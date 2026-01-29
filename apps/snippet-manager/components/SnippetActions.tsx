'use client';

import { useState, useTransition, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteSnippet } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface SnippetActionsProps {
  snippetId: string;
}

/**
 * 代码片段操作按钮组件
 *
 * 提供编辑和删除功能：
 * - 编辑按钮：跳转到编辑页面
 * - 删除按钮：显示确认对话框，确认后删除
 */
export function SnippetActions({ snippetId }: SnippetActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // 确保组件已挂载，才能使用 Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      startTransition(async () => {
        await deleteSnippet(snippetId);
        // 删除成功后刷新页面
        router.refresh();
      });
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请稍后重试');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setIsDeleting(false);
  };

  // 阻止事件冒泡，避免触发卡片点击跳转
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 不要调用 preventDefault()，否则会阻止链接的默认导航行为
  };

  return (
    <>
      <div className="flex items-center gap-1" onClick={stopPropagation}>
        {/* 编辑按钮 */}
        <Link
          href={`/snippets/${snippetId}/edit`}
          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200 relative z-20"
          title="编辑"
          onClick={(e) => e.stopPropagation()}
        >
          <PencilIcon className="w-4 h-4" />
        </Link>

        {/* 删除按钮 */}
        <button
          onClick={(e) => {
            stopPropagation(e);
            handleDeleteClick();
          }}
          disabled={isDeleting || isPending}
          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
          title="删除"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && mounted && createPortal(
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              确认删除
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              删除后无法恢复，确定要删除这个代码片段吗？
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting || isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting || isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting || isPending ? '删除中...' : '删除'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
