import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createTestSnippet() {
  try {
    // 创建一个测试 snippet
    const snippet = await prisma.snippet.create({
      data: {
        title: '测试代码片段',
        code: 'console.log("Hello, World!");',
        language: 'javascript',
        description: '这是一个测试片段',
        tutorial: null
      }
    });

    console.log('✅ 创建成功:', snippet.id);

    // 测试添加 tutorial
    console.log('\n🔄 测试添加 tutorial...');
    const updated = await prisma.snippet.update({
      where: { id: snippet.id },
      data: {
        tutorial: '# 教程\n\n这是教程内容'
      }
    });

    console.log('✅ 更新成功！');
    console.log('Tutorial:', updated.tutorial);

  } catch (error) {
    console.error('❌ 错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestSnippet();
