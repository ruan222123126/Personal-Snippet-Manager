## Error Type
Build Error

## Error Message
Error evaluating Node.js code

## Build Output
./app/globals.css
Error evaluating Node.js code
CssSyntaxError: tailwindcss: /media/ruan/Files1/Personal Snippet Manager/app/globals.css:1:1: Cannot apply unknown utility class `bg-blue-500/30`. Are you using CSS modules or similar and missing `@reference`? https://tailwindcss.com/docs/functions-and-directives#reference-directive
    [at Input.error (turbopack:///[project]/node_modules/postcss/lib/input.js:135:16)]
    [at Root.error (turbopack:///[project]/node_modules/postcss/lib/node.js:146:32)]
    [at Object.Once (/media/ruan/Files1/Personal Snippet Manager/node_modules/@tailwindcss/postcss/dist/index.js:10:6911)]
    [at process.processTicksAndRejections (node:internal/process/task_queues:103:5)]
    [at async LazyResult.runAsync (turbopack:///[project]/node_modules/postcss/lib/lazy-result.js:293:11)]
    [at async transform (turbopack:///[turbopack-node]/transforms/postcss.ts:70:34)]
    [at async run (turbopack:///[turbopack-node]/ipc/evaluate.ts:92:23)]

Import trace:
  Client Component Browser:
    ./app/globals.css [Client Component Browser]
    ./app/layout.tsx [Server Component]

Next.js version: 16.1.4 (Turbopack)
