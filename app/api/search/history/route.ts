import { NextResponse } from 'next/server';
import {
  addSearchHistory,
  getSearchHistory,
  clearSearchHistory,
  removeSearchHistoryItem,
} from '@/lib/search-history';

/**
 * GET /api/search/history
 * 返回最近的搜索历史
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const history = await getSearchHistory(limit);
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return NextResponse.json({ error: 'Failed to fetch search history' }, { status: 500 });
  }
}

/**
 * POST /api/search/history
 * 添加搜索历史记录
 *
 * Request body:
 * {
 *   query: string;
 *   filters?: object;
 *   resultCount?: number;
 * }
 */
export async function POST(request: Request) {
  try {
    const { query, filters, resultCount } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'query is required' }, { status: 400 });
    }

    await addSearchHistory(query, filters, resultCount || 0);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding search history:', error);
    return NextResponse.json({ error: 'Failed to add search history' }, { status: 500 });
  }
}

/**
 * DELETE /api/search/history
 * 清空搜索历史
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // 删除单条历史
      await removeSearchHistoryItem(id);
    } else {
      // 清空所有历史
      await clearSearchHistory();
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting search history:', error);
    return NextResponse.json({ error: 'Failed to delete search history' }, { status: 500 });
  }
}
