import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/metadata
 *
 * 返回系统中可用的元数据：
 * - 所有唯一的编程语言
 * - 所有标签
 *
 * 用于初始化筛选器选项
 */
export async function GET() {
  try {
    // 获取所有唯一的编程语言
    const languages = await prisma.snippet.findMany({
      select: { language: true },
      distinct: ['language'],
      orderBy: { language: 'asc' },
    });

    // 获取所有标签
    const tags = await prisma.tag.findMany({
      select: { id: true, name: true, color: true },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({
      languages: languages.map(l => l.language),
      tags,
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
