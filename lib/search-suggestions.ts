import { prisma } from '@/lib/prisma';

/**
 * 搜索建议类型
 */
export interface SuggestionItem {
  type: 'title' | 'tag' | 'language';
  text: string;
  count?: number;
}

/**
 * 生成搜索建议
 *
 * 基于以下内容生成建议：
 * - 代码片段标题（前缀匹配）
 * - 标签（前缀匹配）
 * - 编程语言（前缀匹配）
 *
 * @param query - 搜索查询前缀
 * @param limit - 每种类型返回的最大建议数量
 * @returns 搜索建议列表
 */
export async function generateSearchSuggestions(
  query: string,
  limit: number = 5
): Promise<SuggestionItem[]> {
  if (!query || query.length < 1) {
    return [];
  }

  const suggestions: SuggestionItem[] = [];
  const queryLower = query.toLowerCase();

  // 1. 标题建议（前缀匹配）
  const titleSuggestions = await prisma.snippet.findMany({
    where: {
      title: {
        startsWith: query,
      },
    },
    select: {
      title: true,
    },
    take: limit,
    distinct: ['title'],
  });

  for (const item of titleSuggestions) {
    if (item.title.toLowerCase().startsWith(queryLower)) {
      suggestions.push({
        type: 'title',
        text: item.title,
      });
    }
  }

  // 2. 标签建议（前缀匹配）
  const tagSuggestions = await prisma.tag.findMany({
    where: {
      name: {
        startsWith: query,
      },
    },
    select: {
      name: true,
      _count: {
        select: {
          snippets: true,
        },
      },
    },
    take: limit,
  });

  for (const item of tagSuggestions) {
    if (item.name.toLowerCase().startsWith(queryLower)) {
      suggestions.push({
        type: 'tag',
        text: item.name,
        count: item._count.snippets,
      });
    }
  }

  // 3. 语言建议（前缀匹配）
  const languages = await prisma.snippet.findMany({
    where: {
      language: {
        startsWith: query,
      },
    },
    select: {
      language: true,
    },
    take: limit,
    distinct: ['language'],
  });

  for (const item of languages) {
    if (item.language.toLowerCase().startsWith(queryLower)) {
      suggestions.push({
        type: 'language',
        text: item.language,
      });
    }
  }

  return suggestions;
}
