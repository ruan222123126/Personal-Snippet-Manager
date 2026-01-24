<CodeBlock> is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.
Call Stack
17

createConsoleError
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_f3530cac._.js (2199:71)
handleConsoleError
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_f3530cac._.js (2980:54)
console.error
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_f3530cac._.js (3124:57)
renderWithHooks
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (4645:359)
updateFunctionComponent
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (6112:21)
beginWork
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (6708:24)
runWithFiberInDEV
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (965:74)
performUnitOfWork
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9562:97)
workLoopConcurrentByScheduler
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9558:58)
renderRootConcurrent
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9541:71)
performWorkOnRoot
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9068:150)
performWorkOnRootViaSchedulerTask
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (10230:9)
MessagePort.performWorkUntilDeadline
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_a0e4c7b4._.js (2647:64)
SnippetCard
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/_a51147ce._.js (891:229)
<anonymous>
about:/Server/file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D__4a3d17c3._.js (462:310)
Array.map
<anonymous>
Home
about:/Server/file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D__4a3d17c3._.js (462:44)Console Error



A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.
Call Stack
20

createConsoleError
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_f3530cac._.js (2199:71)
handleConsoleError
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_f3530cac._.js (2980:54)
console.error
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_f3530cac._.js (3124:57)
trackUsedThenable
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (3837:187)
unwrapThenable
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (3942:16)
reconcileChildFibersImpl
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (4278:188)
<unknown>
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (4292:39)
reconcileChildren
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (5929:51)
replayFunctionComponent
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (6131:9)
replayBeginWork
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9577:27)
runWithFiberInDEV
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (965:74)
replaySuspendedUnitOfWork
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9567:20)
renderRootConcurrent
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9500:141)
performWorkOnRoot
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9068:150)
performWorkOnRootViaSchedulerTask
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (10230:9)
MessagePort.performWorkUntilDeadline
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_a0e4c7b4._.js (2647:64)
SnippetCard
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/_a51147ce._.js (891:229)
<anonymous>
about:/Server/file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D__4a3d17c3._.js (462:310)
Array.map
<anonymous>
Home
about:/Server/file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D__4a3d17c3._.js (462:44)