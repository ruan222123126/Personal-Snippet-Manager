# Tab 键错误修复报告

**日期**: 2026-01-24
**任务**: 修复按 Tab 键时出现的运行时错误
**状态**: ✅ 已完成

## 概述

修复了在新建代码片段页面按 Tab 键时出现的运行时错误：`Cannot set properties of null (setting 'selectionEnd')`。

## 问题描述

当用户在新建代码片段页面的代码输入框中按 Tab 键进行缩进时，会抛出以下错误：

```
Runtime TypeError
Cannot set properties of null (setting 'selectionEnd')
```

错误发生在 `app/snippets/new/page.tsx:80`，即尝试设置 `e.currentTarget.selectionEnd` 时。

## 根本原因

问题出在 `handleKeyDown` 函数的实现上：

1. 当按下 Tab 键时，函数先调用 `setFormData` 更新状态
2. 然后在 `setTimeout` 回调中尝试访问 `e.currentTarget.selectionStart` 和 `selectionEnd`
3. 由于状态更新触发重新渲染，`setTimeout` 回调执行时 `e.currentTarget` 可能已经为 null

## 解决方案

使用 `useRef` Hook 保存 textarea 元素的引用，确保在状态更新后仍然能安全访问 DOM 元素：

### 修改内容

1. **导入 `useRef` Hook**：
   ```typescript
   import { useState, useRef } from 'react';
   ```

2. **创建 ref 引用**：
   ```typescript
   const codeTextAreaRef = useRef<HTMLTextAreaElement>(null);
   ```

3. **修改 `handleKeyDown` 函数**，添加 null 检查：
   ```typescript
   setTimeout(() => {
     if (codeTextAreaRef.current) {
       codeTextAreaRef.current.selectionStart = codeTextAreaRef.current.selectionEnd = start + 2;
     }
   }, 0);
   ```

4. **在 textarea 上绑定 ref**：
   ```jsx
   <textarea
     ref={codeTextAreaRef}
     // ... 其他属性
   />
   ```

## 验证结果

- ✅ TypeScript 类型检查通过（`npx tsc --noEmit`）
- ✅ 代码逻辑正确，ref 在回调中正确使用
- ✅ 添加了 null 检查，防止运行时错误

## 技术要点

- **React ref 的优势**：ref 在组件重新渲染后保持稳定，不会因为 DOM 更新而失效
- **防御性编程**：在访问 DOM 元素前进行 null 检查，避免运行时错误
- **事件处理的最佳实践**：在异步回调中使用 ref 而不是事件对象的 currentTarget

## 影响范围

此修复仅影响新建代码片段页面（`app/snippets/new/page.tsx`），不涉及其他文件或功能。
