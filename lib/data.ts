import { prisma } from '@/lib/prisma';
import { Snippet, Tag, TagOnSnippet, Prisma } from '@prisma/client';

export type { Tag };

export type SnippetWithTags = Snippet & {
  tags: (TagOnSnippet & { tag: Tag })[];
};

/**
 * 代码片段筛选选项
 */
export interface SnippetFilters {
  /** 语言筛选（多个） */
  languages?: string[];
  /** 标签筛选（多个） */
  tags?: string[];
  /** 时间范围筛选 */
  dateRange?: 'today' | 'week' | 'month' | 'quarter' | 'all';
  /** 排序字段 */
  sortBy?: 'createdAt' | 'updatedAt';
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc';
}

/**
 * 计算时间范围的起始日期
 */
function getDateRangeStartDate(range: SnippetFilters['dateRange']): Date | undefined {
  if (!range || range === 'all') return undefined;

  const now = new Date();
  const start = new Date();

  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(now.getDate() - 7);
      break;
    case 'month':
      start.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      start.setMonth(now.getMonth() - 3);
      break;
  }

  return start;
}

/**
 * 获取排序配置
 */
function getOrderConfig(
  sortBy?: 'createdAt' | 'updatedAt',
  sortOrder?: 'asc' | 'desc'
): Prisma.SnippetOrderByWithRelationInput {
  const field = sortBy || 'createdAt';
  const direction = sortOrder || 'desc';
  return { [field]: direction };
}

/**
 * 获取代码片段列表
 *
 * 支持多种查询模式：
 * 1. FTS5 全文搜索（当提供 query 时）
 * 2. 高级筛选（语言、标签、时间范围、排序）
 * 3. 默认最新列表（都不提供时）
 *
 * @param query - 搜索关键词（FTS5 全文搜索）
 * @param tag - 标签名称过滤（向后兼容）
 * @param filters - 高级筛选选项
 * @returns 包含关联标签的代码片段列表
 */
export async function getSnippets(
  query?: string,
  tag?: string,
  filters?: SnippetFilters
): Promise<SnippetWithTags[]> {
  // 构建 Prisma 查询条件
  const where: Prisma.SnippetWhereInput = {};

  // 语言筛选
  if (filters?.languages && filters.languages.length > 0) {
    where.language = { in: filters.languages };
  }

  // 标签筛选
  if (tag) {
    // 向后兼容的单标签筛选
    where.tags = { some: { tag: { name: tag } } };
  } else if (filters?.tags && filters.tags.length > 0) {
    // 多标签筛选（AND 逻辑：必须包含所有标签）
    where.tags = {
      every: { tag: { name: { in: filters.tags } } },
    };
  }

  // 时间范围筛选
  const startDate = getDateRangeStartDate(filters?.dateRange);
  if (startDate) {
    where.createdAt = { gte: startDate };
  }

  // 排序配置
  const orderBy = getOrderConfig(filters?.sortBy, filters?.sortOrder);

  if (query) {
    // 1. FTS5 全文搜索 + 筛选
    const rawIds = await prisma.$queryRaw<{ id: string }[]>`
      SELECT s.id FROM Snippet s
      INNER JOIN SnippetFTS fts ON s.rowid = fts.rowid
      WHERE SnippetFTS MATCH ${query}
      ORDER BY rank;
    `;
    const ids = rawIds.map((row) => row.id);
    if (ids.length === 0) return [];

    return prisma.snippet.findMany({
      where: { ...where, id: { in: ids } },
      include: { tags: { include: { tag: true } } },
      orderBy,
    });
  }

  // 2. 筛选查询或默认列表
  return prisma.snippet.findMany({
    where,
    take: 50,
    include: { tags: { include: { tag: true } } },
    orderBy,
  });
}
