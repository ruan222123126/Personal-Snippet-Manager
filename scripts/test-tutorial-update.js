import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testTutorialUpdate() {
  try {
    // 1. 查找一个 snippet
    const snippet = await prisma.snippet.findFirst();
    console.log('✅ 找到 snippet:', snippet.id, snippet.title);

    // 2. 尝试更新它，添加 tutorial
    const tutorial = '# 这是一个测试教程\n\n## 使用方法\n\n测试内容...';

    console.log('\n🔄 尝试更新 tutorial...');
    const updated = await prisma.snippet.update({
      where: { id: snippet.id },
      data: {
        tutorial: tutorial
      }
    });

    console.log('✅ 更新成功！tutorial 长度:', updated.tutorial?.length);
    console.log('✅ tutorial 内容预览:', updated.tutorial?.substring(0, 50));

  } catch (error) {
    console.error('❌ 错误:', error);
    console.error('错误详情:', error.message);
    console.error('错误堆栈:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testTutorialUpdate();
