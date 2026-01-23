import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/snippets
 * Query parameters:
 *   - q: Search query for full-text search (FTS5)
 *   - tag: Filter by tag name
 *
 * Returns snippets with associated tags
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const tag = searchParams.get('tag');

  try {
    let snippets: any[] = [];

    if (q) {
      // 1. FTS full-text search using SQLite FTS5
      // Note: SnippetFTS uses rowid (INTEGER), need to join with Snippet
      const results = await prisma.$queryRaw<
        { id: string }[]
      >`
        SELECT s.id FROM Snippet s
        INNER JOIN SnippetFTS fts ON s.rowid = fts.rowid
        WHERE SnippetFTS MATCH ${q}
        ORDER BY rank;
      `;

      const ids = results.map((row) => row.id);

      if (ids.length > 0) {
        snippets = await prisma.snippet.findMany({
          where: { id: { in: ids } },
          include: { tags: { include: { tag: true } } },
        });
      }
    } else if (tag) {
      // 2. Filter by tag name
      snippets = await prisma.snippet.findMany({
        where: {
          tags: { some: { tag: { name: tag } } },
        },
        orderBy: { createdAt: 'desc' },
        include: { tags: { include: { tag: true } } },
      });
    } else {
      // 3. Default: return latest snippets
      snippets = await prisma.snippet.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { tags: { include: { tag: true } } },
      });
    }

    return NextResponse.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 });
  }
}

/**
 * POST /api/snippets
 * Creates a new snippet with tags
 *
 * Request body:
 * {
 *   title: string;
 *   code: string;
 *   language: string;
 *   description?: string;
 *   tags: string[];
 * }
 *
 * Uses transaction to ensure atomicity of snippet and tag creation
 */
export async function POST(request: Request) {
  try {
    const { title, code, language, description, tags } = await request.json();

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

    // Use transaction to handle complex relational creation atomically
    const result = await prisma.$transaction(async (tx) => {
      // First, ensure all tags exist (create if not exist)
      const tagRecords = await Promise.all(
        tags.map((tagName: string) =>
          tx.tag.upsert({
            where: { name: tagName },
            create: { name: tagName },
            update: {},
          })
        )
      );

      // Prepare snippet data, excluding undefined optional fields
      const snippetData: any = {
        title,
        code,
        language,
      };
      if (description !== undefined) {
        snippetData.description = description;
      }

      // Then create the snippet
      const snippet = await tx.snippet.create({
        data: snippetData,
      });

      // Finally, create the junction table entries
      await Promise.all(
        tagRecords.map((tag) =>
          tx.tagOnSnippet.create({
            data: {
              snippetId: snippet.id,
              tagId: tag.id,
            },
          })
        )
      );

      // Return the complete snippet with tags
      return tx.snippet.findUnique({
        where: { id: snippet.id },
        include: {
          tags: {
            include: { tag: true },
          },
        },
      });
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating snippet:', error);
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 });
  }
}
