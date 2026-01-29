import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createSamples() {
  try {
    // 创建标签
    const tag1 = await prisma.tag.upsert({
      where: { name: 'JavaScript' },
      create: { name: 'JavaScript' },
      update: {}
    });

    const tag2 = await prisma.tag.upsert({
      where: { name: '教程' },
      create: { name: '教程' },
      update: {}
    });

    // 创建示例代码片段
    const snippet1 = await prisma.snippet.create({
      data: {
        title: '示例片段 1 - 带 Tutorial',
        code: 'function hello() {\n  console.log("Hello, World!");\n}',
        language: 'javascript',
        description: '这是一个包含教学说明的示例',
        tutorial: '# 教学说明\n\n## 使用方法\n\n这个函数演示了如何打印 "Hello, World!"。\n\n## 代码解释\n\n- `function`: 定义函数\n- `console.log()`: 打印到控制台'
      }
    });

    // 关联标签
    await prisma.tagOnSnippet.createMany({
      data: [
        { snippetId: snippet1.id, tagId: tag1.id },
        { snippetId: snippet1.id, tagId: tag2.id }
      ]
    });

    // 创建另一个片段
    const snippet2 = await prisma.snippet.create({
      data: {
        title: '示例片段 2 - 无 Tutorial',
        code: 'const x = 42;\nconsole.log(x);',
        language: 'javascript',
        description: '没有教学说明的示例',
      }
    });

    console.log('✅ 创建成功!');
    console.log('\n示例数据:');
    console.log('1. 片段 1 (带 Tutorial):', `http://localhost:3002/snippets/${snippet1.id}/edit`);
    console.log('2. 片段 2 (无 Tutorial):', `http://localhost:3002/snippets/${snippet2.id}/edit`);

  } catch (error) {
    console.error('❌ 错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSamples();
