import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testAPI() {
  try {
    // 1. 创建测试数据
    console.log('1. 创建测试 snippet...');
    const snippet = await prisma.snippet.create({
      data: {
        title: 'API 测试片段',
        code: 'console.log("test");',
        language: 'javascript',
        description: '测试描述',
        tutorial: '# 测试教程\n\n这是教程内容'
      }
    });
    console.log('✅ 创建成功:', snippet.id);

    // 2. 模拟 API 调用更新
    console.log('\n2. 模拟 API 更新...');
    const updateData = {
      title: '更新的标题',
      code: 'console.log("updated");',
      language: 'javascript',
      description: '更新的描述',
      tutorial: '# 更新的教程\n\n更多内容',
      tags: []
    };

    const result = await prisma.$transaction(async (tx) => {
      // 确保 tags 是数组
      if (!Array.isArray(updateData.tags)) {
        throw new Error('tags must be an array');
      }

      // 准备代码片段数据
      const snippetData = {
        title: updateData.title,
        code: updateData.code,
        language: updateData.language,
      };

      if (updateData.description !== undefined) {
        snippetData.description = updateData.description;
      }
      if (updateData.tutorial !== undefined) {
        snippetData.tutorial = updateData.tutorial;
      }

      // 更新代码片段
      const updated = await tx.snippet.update({
        where: { id: snippet.id },
        data: snippetData,
      });

      // 删除旧的标签关联
      await tx.tagOnSnippet.deleteMany({
        where: { snippetId: snippet.id },
      });

      return updated;
    });

    console.log('✅ 更新成功!');
    console.log('   - 标题:', result.title);
    console.log('   - Tutorial 长度:', result.tutorial?.length);

  } catch (error) {
    console.error('❌ 错误:', error.message);
    console.error('错误类型:', error.constructor.name);
    if (error.cause) {
      console.error('原因:', error.cause);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
