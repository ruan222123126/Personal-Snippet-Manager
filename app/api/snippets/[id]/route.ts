import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/snippets/:id
 * 获取单个代码片段的详细信息
 *
 * Returns the snippet with associated tags or 404 if not found
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true },
          orderBy: { assignedAt: 'asc' },
        },
      },
    });

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json(snippet);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 });
  }
}

/**
 * PUT /api/snippets/:id
 * 更新指定的代码片段
 *
 * Request body:
 * {
 *   title: string;
 *   code: string;
 *   language: string;
 *   description?: string;
 *   tags: string[];
 * }
 */
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { title, code, language, description, tags } = body;

    // Validate required fields
    if (!title || !code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: title, code, language' },
        { status: 400 }
      );
    }

    if (!Array.isArray(tags)) {
      return NextResponse.json({ error: 'tags must be an array' }, { status: 400 });
    }

    // 先检查代码片段是否存在
    const existingSnippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!existingSnippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    // 使用事务处理更新
    const result = await prisma.$transaction(async (tx) => {
      // 首先，确保所有标签存在（不存在则创建）
      const tagRecords = await Promise.all(
        tags.map((tagName: string) =>
          tx.tag.upsert({
            where: { name: tagName },
            create: { name: tagName },
            update: {},
          })
        )
      );

      // 准备代码片段数据
      const snippetData: any = {
        title,
        code,
        language,
      };
      if (description !== undefined) {
        snippetData.description = description;
      }

      // 更新代码片段
      const snippet = await tx.snippet.update({
        where: { id },
        data: snippetData,
      });

      // 删除旧的标签关联
      await tx.tagOnSnippet.deleteMany({
        where: { snippetId: id },
      });

      // 创建新的标签关联
      await Promise.all(
        tagRecords.map((tag) =>
          tx.tagOnSnippet.create({
            data: {
              snippetId: id,
              tagId: tag.id,
            },
          })
        )
      );

      // 返回更新后的完整代码片段
      return tx.snippet.findUnique({
        where: { id },
        include: {
          tags: {
            include: { tag: true },
          },
        },
      });
    });

    // 重新验证相关页面的缓存
    revalidatePath('/');
    revalidatePath(`/snippets/${id}`);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating snippet:', error);
    return NextResponse.json({ error: 'Failed to update snippet' }, { status: 500 });
  }
}

/**
 * DELETE /api/snippets/:id
 * 删除指定的代码片段
 *
 * 删除成功后会重新验证首页缓存
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    // 先检查代码片段是否存在
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    // 删除代码片段（关联的标签记录会通过数据库级联删除自动处理）
    await prisma.snippet.delete({
      where: { id },
    });

    // 重新验证首页缓存
    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    return NextResponse.json({ error: 'Failed to delete snippet' }, { status: 500 });
  }
}
