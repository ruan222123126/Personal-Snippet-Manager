#!/usr/bin/env node
/**
 * CLI 测试脚本
 * 用于验证 CLI 功能（无需交互式输入）
 */

import { searchSnippets, createSnippet } from './api.js';
import chalk from 'chalk';

async function testSearch() {
  console.log(chalk.blue('🔍 Testing search functionality...'));
  try {
    const snippets = await searchSnippets('');
    console.log(chalk.green(`✅ Found ${snippets.length} snippets`));
    if (snippets.length > 0) {
      console.log(chalk.dim('First snippet:'), snippets[0].title);
    }
    return true;
  } catch (error) {
    console.error(chalk.red('❌ Search failed:'), error.message);
    return false;
  }
}

async function testCreate() {
  console.log(chalk.blue('\n📝 Testing create functionality...'));
  try {
    const testSnippet = {
      title: 'CLI Test Snippet',
      code: 'console.log("Hello from CLI!");',
      language: 'javascript',
      tags: ['cli', 'test']
    };
    const result = await createSnippet(testSnippet);
    console.log(chalk.green(`✅ Created snippet with ID: ${result.id}`));
    return true;
  } catch (error) {
    console.error(chalk.red('❌ Create failed:'), error.message);
    return false;
  }
}

async function main() {
  console.log(chalk.bold('\n🧪 CLI Testing Script\n'));

  // 检查服务器连接
  console.log(chalk.yellow('检查 API 服务器连接...'));
  const searchOk = await testSearch();

  if (searchOk) {
    console.log(chalk.green('\n✅ CLI API 客户端工作正常！'));
    console.log(chalk.dim('\n你可以使用以下命令：'));
    console.log(chalk.dim('  node cli/index.js search [query]  - 搜索代码片段'));
    console.log(chalk.dim('  node cli/index.js add           - 添加新代码片段'));
  } else {
    console.log(chalk.red('\n❌ 请确保开发服务器正在运行：npm run dev'));
  }
}

main();
