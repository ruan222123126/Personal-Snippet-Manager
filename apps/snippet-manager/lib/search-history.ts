import { prisma } from '@/lib/prisma';

/**
 * 搜索历史管理
 */

export interface SearchFilters {
  languages?: string[];
  tags?: string[];
  dateRange?: string;
  sortBy?: string;
  sortOrder?: string;
}

/**
 * 添加搜索历史记录
 * 同时更新 SearchStats 表
 */
export async function addSearchHistory(
  query: string,
  filters?: SearchFilters,
  resultCount: number = 0
) {
  const filtersJson = filters ? JSON.stringify(filters) : null;

  // 在事务中同时更新历史和统计
  await prisma.$transaction([
    // 添加历史记录
    prisma.searchHistory.create({
      data: {
        query,
        filters: filtersJson,
        resultCount,
      },
    }),
    // 更新或创建统计记录
    prisma.searchStats.upsert({
      where: { query },
      create: {
        query,
        searchCount: 1,
      },
      update: {
        searchCount: { increment: 1 },
        lastSearchedAt: new Date(),
      },
    }),
  ]);
}

/**
 * 获取搜索历史（最新的 N 条）
 */
export async function getSearchHistory(limit: number = 10) {
  return prisma.searchHistory.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * 获取热门搜索（按搜索次数排序）
 */
export async function getPopularSearches(limit: number = 10) {
  return prisma.searchStats.findMany({
    orderBy: { searchCount: 'desc' },
    take: limit,
  });
}

/**
 * 清空搜索历史
 */
export async function clearSearchHistory() {
  return prisma.searchHistory.deleteMany({});
}

/**
 * 删除单条搜索历史
 */
export async function removeSearchHistoryItem(id: string) {
  return prisma.searchHistory.delete({
    where: { id },
  });
}
