import { NextResponse } from 'next/server';
import { generateSearchSuggestions } from '@/lib/search-suggestions';

/**
 * GET /api/search/suggestions
 *
 * Query parameters:
 *   - q: 搜索查询前缀
 *   - limit: 每种类型返回的最大建议数量（默认 5）
 *
 * 返回搜索建议列表，包含：
 * - 代码片段标题
 * - 标签
 * - 编程语言
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '5');

  try {
    const suggestions = await generateSearchSuggestions(query, limit);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error generating search suggestions:', error);
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
  }
}
