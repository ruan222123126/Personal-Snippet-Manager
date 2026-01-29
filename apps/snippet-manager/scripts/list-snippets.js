// 验证和显示代码片段

async function getSnippets() {
  const response = await fetch('http://localhost:3002/api/snippets?languages=python');
  return await response.json();
}

async function main() {
  try {
    const snippets = await getSnippets();
    console.log(`\n✅ 已成功添加 ${snippets.length} 个 Python 代码片段：\n`);

    snippets.forEach((s, i) => {
      const tags = s.tags.map(t => t.tag.name).join(', ');
      console.log(`${i + 1}. ${s.title}`);
      console.log(`   标签: ${tags}`);
      console.log(`   描述: ${s.description}`);
      console.log('');
    });

    console.log('总计: ' + snippets.length + ' 个片段\n');
  } catch (error) {
    console.error('错误:', error.message);
  }
}

main();
