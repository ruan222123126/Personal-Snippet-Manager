// Shiki Highlighter singleton
// Global reference to prevent multiple initializations in development

import { getHighlighter } from 'shiki';

const globalForShiki = globalThis as unknown as {
  highlighter: Awaited<ReturnType<typeof getHighlighter>> | undefined;
};

export async function getShikiHighlighter() {
  if (!globalForShiki.highlighter) {
    globalForShiki.highlighter = await getHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'javascript',
        'typescript',
        'python',
        'java',
        'cpp',
        'c',
        'go',
        'rust',
        'html',
        'css',
        'json',
        'bash',
        'sql',
        'markdown',
      ],
    });
  }
  return globalForShiki.highlighter;
}
