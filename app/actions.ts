'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * 删除代码片段
 *
 * @param id - 代码片段 ID
 * @throws Error 如果代码片段不存在
 */
export async function deleteSnippet(id: string) {
  try {
    // 先检查代码片段是否存在
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      throw new Error('代码片段不存在');
    }

    // 删除代码片段（关联的标签记录会通过级联删除自动处理）
    await prisma.snippet.delete({
      where: { id },
    });

    // 重新验证首页缓存
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('删除代码片段失败:', error);
    throw error;
  }
}

/**
 * 删除代码片段并重定向
 *
 * 这个版本用于表单提交，删除成功后自动重定向到首页
 *
 * @param id - 代码片段 ID
 */
export async function deleteSnippetAndRedirect(id: string) {
  await deleteSnippet(id);
  redirect('/');
}
