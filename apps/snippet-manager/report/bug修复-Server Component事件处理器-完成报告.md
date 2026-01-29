# Bug 修复报告 #2

**日期**: 2026-01-24
**任务**: 修复详情页中的 Server Component 事件处理器问题
**状态**: ✅ 已修复

## 问题描述

在控制台中出现了以下错误：

### 错误信息
```
Event handlers cannot be passed to Client Component props.
<button type="submit" onClick={function onClick} className=... children=...>
```

### 错误原因
`app/snippets/[id]/page.tsx` 是一个 **Server Component**，但在删除按钮中使用了 `onClick` 事件处理器。在 Next.js 中，Server Component 不能包含交互式的事件处理器（如 `onClick`、`onChange` 等）。

**问题代码**：
```tsx
// Server Component 中不能有 onClick
export default async function SnippetDetailPage({ params }: PageProps) {
  // ...

  return (
    <form action={`/api/snippets/${id}`} method="DELETE" className="inline">
      <button
        type="submit"
        onClick={(e) => {  // ❌ 错误：Server Component 中不能有事件处理器
          if (!confirm('删除后无法恢复，确定要删除这个代码片段吗？')) {
            e.preventDefault();
          }
        }}
      >
        删除
      </button>
    </form>
  );
}
```

## 修复方案

### 解决思路
将需要交互的部分（删除按钮和确认对话框）提取到单独的 **Client Component** 中，然后在 Server Component 中引用它。

### 修复内容

#### 1. 创建 Client Component：`DeleteButton.tsx`

新建文件：`app/snippets/[id]/DeleteButton.tsx`

```tsx
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
        className="..."
      >
        <TrashIcon className="w-4 h-4" />
        删除
      </button>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {/* 对话框内容 */}
        </div>
      )}
    </>
  );
}
```

**关键点**：
- 使用 `'use client'` 指令声明为 Client Component
- 使用 `useState` 管理确认对话框状态
- 使用 `useTransition` 处理删除操作
- 使用 Server Actions (`deleteSnippet`) 执行删除
- 删除成功后使用 `router.push('/')` 跳转到首页

#### 2. 更新 Server Component：`page.tsx`

修改：`app/snippets/[id]/page.tsx`

**修改前**：
```tsx
export default async function SnippetDetailPage({ params }: PageProps) {
  // ...

  return (
    <form action={`/api/snippets/${id}`} method="DELETE" className="inline">
      <button
        type="submit"
        onClick={(e) => { /* ❌ Server Component 中不能有 onClick */ }}
      >
        删除
      </button>
    </form>
  );
}
```

**修改后**：
```tsx
import { DeleteButton } from './DeleteButton';

export default async function SnippetDetailPage({ params }: PageProps) {
  // ...

  return (
    <div className="flex items-center gap-2">
      {/* 编辑按钮 */}
      <Link href={`/snippets/${id}/edit`}>
        编辑
      </Link>

      {/* 删除按钮 - 使用 Client Component */}
      <DeleteButton snippetId={id} />
    </div>
  );
}
```

**关键点**：
- 移除带有 `onClick` 的 `<form>` 和 `<button>`
- 导入并使用 `DeleteButton` Client Component
- 传递 `snippetId` prop

## 技术要点

### 1. Server Components vs Client Components

**Server Components**:
- 在服务器上渲染
- 不能使用交互式功能（useState、useEffect、事件处理器等）
- 适合静态内容和数据获取

**Client Components**:
- 在客户端（浏览器）上渲染
- 可以使用所有 React 功能（hooks、事件处理器等）
- 需要 `'use client'` 指令

### 2. 组件组合原则
- Server Component 可以导入并渲染 Client Component
- Client Component **不能** 导入 Server Component（除非通过 children 传递）
- 尽量将交互部分隔离到 Client Component 中

### 3. Server Actions
- 在 Client Component 中可以直接调用 Server Actions
- Server Actions 提供了类型安全的 API 调用方式
- 自动处理表单提交和数据变更

### 4. 错误处理和用户反馈
- 使用 `try-catch` 捕获删除错误
- 使用 `alert()` 显示错误提示
- 使用 `disabled` 状态防止重复提交
- 删除成功后自动跳转

## 验证结果

### TypeScript 类型检查
```bash
✅ npx tsc --noEmit 通过，无类型错误
```

### 构建测试
```bash
✅ npm run build 成功
✅ 无事件处理器错误
✅ 所有路由正确生成
```

### 功能测试清单
- ✅ 点击删除按钮显示确认对话框
- ✅ 确认删除后成功删除并跳转到首页
- ✅ 取消删除后对话框关闭
- ✅ 删除中显示加载状态
- ✅ 删除失败显示错误提示
- ✅ 详情页其他功能正常（返回、编辑、代码显示）

## 修改文件清单

1. **app/snippets/[id]/DeleteButton.tsx** (新建)
   - Client Component，包含删除按钮和确认对话框
   - 使用 Server Actions 执行删除
   - 管理状态和导航

2. **app/snippets/[id]/page.tsx** (修改)
   - 移除内联的删除表单和按钮
   - 导入并使用 `DeleteButton` 组件
   - 保持 Server Component 特性

## 总结

本次修复成功解决了 Server Component 中使用事件处理器的问题。通过将交互部分提取到 Client Component 中，实现了：

1. **符合 Next.js 规范**：Server Component 不包含事件处理器
2. **代码组织清晰**：交互逻辑封装在独立的 Client Component 中
3. **类型安全**：使用 TypeScript 和 Server Actions
4. **良好的用户体验**：确认对话框、加载状态、错误处理

修复后的代码已通过所有测试，可以正常使用。

## 相关知识

- [Next.js: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-and-client-components)
- [Next.js: Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React: Client Components](https://react.dev/reference/react/use-client)
