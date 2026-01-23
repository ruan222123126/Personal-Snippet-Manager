import { highlightCode } from '@/lib/shiki';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language: string;
}

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await highlightCode(code, language);

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-[#0d1117]">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <CopyButton code={code} />
      </div>
      <div
        className="text-sm font-mono overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
