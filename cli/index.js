#!/usr/bin/env node
/**
 * Personal Snippet Manager CLI
 * 命令行工具入口文件
 */

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { searchSnippets, createSnippet } from './api.js';
import { copyToClipboard } from './utils/clipboard.js';

program
  .version('1.0.0')
  .description('Personal Snippet Manager CLI');

// --- Search Command ---
program
  .command('search [query]')
  .alias('s')
  .description('Search snippets and copy to clipboard')
  .action(async (query) => {
    try {
      const snippets = await searchSnippets(query);

      if (snippets.length === 0) {
        console.log(chalk.yellow('No snippets found.'));
        return;
      }

      const { selectedId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedId',
          message: 'Select a snippet to copy:',
          choices: snippets.map(s => ({
            name: `${chalk.bold(s.title)} ${chalk.dim(`(${s.language})`)}`,
            value: s.id
          })),
          pageSize: 10
        }
      ]);

      const selectedSnippet = snippets.find(s => s.id === selectedId);
      await copyToClipboard(selectedSnippet.code);
      console.log(chalk.green(`\n✅ Copied "${selectedSnippet.title}" to clipboard!`));

    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
    }
  });

// --- Add Command ---
program
  .command('add')
  .alias('new')
  .description('Create a new snippet')
  .action(async () => {
    const answers = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Title:' },
      {
        type: 'list',
        name: 'language',
        message: 'Language:',
        choices: ['javascript', 'typescript', 'python', 'bash', 'sql', 'text']
      },
      {
        type: 'editor',
        name: 'code',
        message: 'Press <Enter> to open editor for code:',
      },
      { type: 'input', name: 'tags', message: 'Tags (comma separated):' }
    ]);

    // 处理 tags 字符串转数组
    const payload = {
      title: answers.title,
      code: answers.code,
      language: answers.language,
      tags: answers.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      await createSnippet(payload);
      console.log(chalk.green('\n✅ Snippet created successfully!'));
    } catch (error) {
      console.error(chalk.red('Failed to create snippet. Is the server running?'));
      console.error(chalk.red(error.message));
    }
  });

program.parse(process.argv);
