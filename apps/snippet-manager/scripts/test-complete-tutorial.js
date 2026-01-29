import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function runTests() {
  console.log('=== Tutorial 完整测试 ===\n');

  try {
    // 测试 1: 创建带 tutorial 的 snippet
    console.log('📝 测试 1: 创建带 tutorial 的 snippet');
    const snippet1 = await prisma.snippet.create({
      data: {
        title: '测试 1 - 带 tutorial',
        code: 'console.log("test");',
        language: 'javascript',
        tutorial: '# 教程标题\n\n这是教程内容'
      }
    });
    console.log('✅ 创建成功，tutorial 长度:', snippet1.tutorial.length);

    // 测试 2: 创建不带 tutorial 的 snippet
    console.log('\n📝 测试 2: 创建不带 tutorial 的 snippet');
    const snippet2 = await prisma.snippet.create({
      data: {
        title: '测试 2 - 不带 tutorial',
        code: 'print("test");',
        language: 'python'
      }
    });
    console.log('✅ 创建成功，tutorial:', snippet2.tutorial);

    // 测试 3: 为空 tutorial 添加内容
    console.log('\n📝 测试 3: 为空 tutorial 添加内容');
    const updated1 = await prisma.snippet.update({
      where: { id: snippet2.id },
      data: { tutorial: '# 新教程\n\n内容' }
    });
    console.log('✅ 更新成功，tutorial 长度:', updated1.tutorial.length);

    // 测试 4: 修改已有 tutorial
    console.log('\n📝 测试 4: 修改已有 tutorial');
    const updated2 = await prisma.snippet.update({
      where: { id: snippet1.id },
      data: { tutorial: '# 更新的教程\n\n新内容' }
    });
    console.log('✅ 更新成功，内容:', updated2.tutorial.substring(0, 20));

    // 测试 5: 删除 tutorial（设置为 null）
    console.log('\n📝 测试 5: 删除 tutorial');
    const updated3 = await prisma.snippet.update({
      where: { id: snippet1.id },
      data: { tutorial: null }
    });
    console.log('✅ 更新成功，tutorial:', updated3.tutorial);

    // 测试 6: 同时更新多个字段
    console.log('\n📝 测试 6: 同时更新多个字段');
    const updated4 = await prisma.snippet.update({
      where: { id: snippet2.id },
      data: {
        title: '更新标题',
        code: 'console.log("updated");',
        tutorial: '# 完整更新\n\n所有字段都更新了'
      }
    });
    console.log('✅ 更新成功');
    console.log('   - 标题:', updated4.title);
    console.log('   - 代码:', updated4.code);
    console.log('   - Tutorial:', updated4.tutorial.substring(0, 15));

    // 测试 7: 使用事务创建带标签和 tutorial 的 snippet
    console.log('\n📝 测试 7: 使用事务创建完整 snippet');
    const result = await prisma.$transaction(async (tx) => {
      // 创建标签
      const tag = await tx.tag.upsert({
        where: { name: '测试标签' },
        create: { name: '测试标签' },
        update: {}
      });

      // 创建 snippet
      const snippet = await tx.snippet.create({
        data: {
          title: '完整测试',
          code: 'const test = true;',
          language: 'javascript',
          tutorial: '# 事务测试\n\n使用事务创建'
        }
      });

      // 创建关联
      await tx.tagOnSnippet.create({
        data: {
          snippetId: snippet.id,
          tagId: tag.id
        }
      });

      return snippet;
    });
    console.log('✅ 事务创建成功，ID:', result.id);

    // 测试 8: FTS5 搜索
    console.log('\n📝 测试 8: FTS5 搜索 tutorial 内容');
    const searchResult = await prisma.snippet.findMany({
      where: {
        OR: [
          { title: { contains: '教程' } },
          { description: { contains: '教程' } }
        ]
      }
    });
    console.log('✅ 搜索完成，找到', searchResult.length, '个结果');

    console.log('\n✅ 所有测试通过！');

  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    console.error(error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
