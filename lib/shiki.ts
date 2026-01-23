// Shiki Highlighter singleton
// Global reference to prevent multiple initializations in development

import { createHighlighter } from 'shiki';

const globalForShiki = globalThis as unknown as {
  highlighter: Awaited<ReturnType<typeof createHighlighter>> | undefined;
};

export async function getShikiHighlighter() {
  if (!globalForShiki.highlighter) {
    globalForShiki.highlighter = await createHighlighter({
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
        'text',
      ],
    });
  }
  return globalForShiki.highlighter;
}

/**
 * Highlights code using Shiki with theme support for light/dark modes
 * @param code - The source code to highlight
 * @param language - The programming language (falls back to 'text' if unsupported)
 * @returns HTML string with syntax highlighting
 */
export async function highlightCode(code: string, language: string): Promise<string> {
  const highlighter = await getShikiHighlighter();
  // Fallback to 'text' if the language is not supported
  const loadedLangs = highlighter.getLoadedLanguages();
  const lang = loadedLangs.includes(language) ? language : 'text';

  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });
}
