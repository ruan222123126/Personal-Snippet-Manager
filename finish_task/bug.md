Event handlers cannot be passed to Client Component props.
  <button type="submit" onClick={function onClick} className=... children=...>
                                ^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
Call Stack
6

stringify
<anonymous>
resolveErrorDev
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js (1881:148)
processFullStringRow
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js (2389:29)
processFullBinaryRow
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js (2348:9)
processBinaryChunk
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js (2457:221)
progress
file:///mnt/Files/Personal%20Snippet%20Manager/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js (2625:13)