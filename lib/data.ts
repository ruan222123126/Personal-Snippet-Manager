import { prisma } from '@/lib/prisma';
import { Snippet, Tag, TagOnSnippet } from '@prisma/client';

export type { Tag };

export type SnippetWithTags = Snippet & {
  tags: (TagOnSnippet & { tag: Tag })[];
};

/**
 * 获取代码片段列表
 *
 * 支持三种查询模式：
 * 1. FTS5 全文搜索（当提供 query 时）
 * 2. 按标签过滤（当提供 tag 时）
 * 3. 默认最新列表（都不提供时）
 *
 * @param query - 搜索关键词（FTS5 全文搜索）
 * @param tag - 标签名称过滤
 * @returns 包含关联标签的代码片段列表
 */
export async function getSnippets(query?: string, tag?: string): Promise<SnippetWithTags[]> {
  if (query) {
    // 1. FTS5 全文搜索
    const rawIds = await prisma.$queryRaw<{ id: string }[]>`
      SELECT s.id FROM Snippet s
      INNER JOIN SnippetFTS fts ON s.rowid = fts.rowid
      WHERE SnippetFTS MATCH ${query}
      ORDER BY rank;
    `;
    const ids = rawIds.map((row) => row.id);
    if (ids.length === 0) return [];

    return prisma.snippet.findMany({
      where: { id: { in: ids } },
      include: { tags: { include: { tag: true } } },
    });
  }

  if (tag) {
    // 2. 按标签过滤
    return prisma.snippet.findMany({
      where: { tags: { some: { tag: { name: tag } } } },
      orderBy: { createdAt: 'desc' },
      include: { tags: { include: { tag: true } } },
    });
  }

  // 3. 默认列表：最新的 50 条
  return prisma.snippet.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: { tags: { include: { tag: true } } },
  });
}
