'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { deleteSnippet } from '@/app/actions';

interface DeleteButtonProps {
  snippetId: string;
}

/**
 * 删除按钮组件
 *
 * 显示删除按钮，点击后显示确认对话框，确认后删除代码片段
 */
export function DeleteButton({ snippetId }: DeleteButtonProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      startTransition(async () => {
        await deleteSnippet(snippetId);
        // 删除成功后跳转到首页
        router.push('/');
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

  return (
    <>
      {/* 删除按钮 */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting || isPending}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <TrashIcon className="w-4 h-4" />
        删除
      </button>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
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
        </div>
      )}
    </>
  );
}
