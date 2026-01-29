import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditSnippetForm from './EditSnippetForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 代码片段编辑页
 *
 * 获取代码片段数据并传递给编辑表单
 */
export default async function EditSnippetPage({ params }: PageProps) {
  const { id } = await params;

  // 获取代码片段详情
  const snippet = await prisma.snippet.findUnique({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true,
        },
        orderBy: {
          assignedAt: 'asc',
        },
      },
    },
  });

  // 如果代码片段不存在，返回 404
  if (!snippet) {
    notFound();
  }

  // 提取标签名称数组
  const tags = snippet.tags.map(({ tag }) => tag.name);

  // 将数据传递给客户端表单组件
  return <EditSnippetForm snippet={snippet} tags={tags} />;
}
