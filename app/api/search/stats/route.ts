import { NextResponse } from 'next/server';
import { getPopularSearches } from '@/lib/search-history';

/**
 * GET /api/search/stats
 * 返回热门搜索（按搜索次数排序）
 *
 * Query parameters:
 *   - limit: 返回结果数量（默认 10）
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const popularSearches = await getPopularSearches(limit);
    return NextResponse.json(popularSearches);
  } catch (error) {
    console.error('Error fetching search stats:', error);
    return NextResponse.json({ error: 'Failed to fetch search stats' }, { status: 500 });
  }
}
