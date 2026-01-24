# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

Personal Snippet Manager - 一个代码片段管理应用，使用 Next.js 16、React 19、TypeScript、Tailwind CSS 4 和 SQLite（配合 Prisma ORM）构建。项目具有 SQLite FTS5 全文搜索功能和 Shiki 语法高亮。

**项目位置**: `/mnt/Files/Personal Snippet Manager`

---

## 开发规范

在此项目中工作时，必须遵守以下规则：

### 1. 代码质量标准
- 使用 TypeScript 严格模式 - 所有代码必须正确类型化
- 遵循现有代码风格和模式（单例、路径别名）
- 保持组件模块化和可复用
- 默认使用 Server Components，仅在必要时使用 Client Components（useState、useEffect 等）

### 2. 数据库工作流程
- **始终**使用 `lib/prisma.ts` - 永远不要创建新的 PrismaClient 实例
- 修改 schema 时：
  1. 编辑 `prisma/schema.prisma`
  2. 运行 `npx prisma migrate dev --name 描述性名称`
  3. 手动将 FTS5 表和触发器添加到生成的迁移 SQL 文件中
  4. 运行 `npx prisma generate`
- **永远不要**提交 `prisma/dev.db` 或 `prisma/*.db-journal` 文件

### 3. 文件组织
- API 路由放在 `app/api/[资源]/route.ts`
- UI 组件放在 `components/ui/`
- 工具函数和单例放在 `lib/`
- 使用路径别名 `@/` 进行所有内部导入

### 4. 测试与验证
- 在认为工作完成前运行 `npx tsc --noEmit`
- 使用 `npx prisma studio` 测试数据库变更
- schema 变更后验证 FTS5 触发器是否存在

### 5. 交流与文档语言规范

**重要 - 语言要求**:
- **所有报告 (Report) 必须使用中文编写** - 在 `report/` 目录中的所有完成报告必须使用中文
- **与用户交流使用中文** - 回应用户的所有消息、说明、总结都必须使用中文
- **代码注释可以使用中文或英文** - 根据代码风格决定
- **技术术语保持原文** - 如 API、SQL、TypeScript 等专有名词

**报告格式要求**:
```markdown
# 任务完成报告

**日期**: YYYY-MM-DD
**任务**: [任务名称]
**状态**: ✅ 已完成

## 概述
[中文描述完成的任务内容]

## 完成的工作
[使用中文列举完成的具体任务]

## 验证结果
[使用中文描述测试验证情况]

## 遇到的问题与解决方案
[使用中文描述问题和解决方法]
```

### 6. 双 Claude 协作工作流程

**重要**：作为编码 Claude，在执行任务时必须使用双 Claude 协作系统以确保代码质量。

#### 标准任务流程

**任务开始时**：
```bash
# 1. 首次使用需要安装依赖（只需运行一次）
npm run duo:install

# 2. 启动监视系统
npm run duo
```

这会自动打开两个终端：
- **验证 Claude 终端** - 实时审查代码变更
- **文件监控终端** - 监控文件变化并加入队列

**任务执行中**：
- 在当前终端（编码 Claude）正常工作
- 编辑文件时，监控终端会自动检测变化
- 验证 Claude 会显示变更内容并等待审查
- 根据验证 Claude 的反馈调整代码

**任务结束时**：
```bash
# 清理审查队列
npm run duo:clean

# 在监控终端和验证终端按 Ctrl+C 停止监视
```

#### 任务完成检查清单

使用双 Claude 系统的任务需要额外检查：
- [ ] 任务开始时已启动监视系统 (`npm run duo`)
- [ ] 任务需求完全实现
- [ ] 代码遵循项目模式（单例、路径别名）
- [ ] TypeScript 类型检查通过 (`npx tsc --noEmit`)
- [ ] 验证 Claude 的反馈已处理
- [ ] 任务文件已移到 `finish_task/`
- [ ] 完成报告已写在 `report/`
- [ ] 已发送桌面通知
- [ ] 监视系统已关闭（队列已清理）

#### 何时使用双 Claude 系统

**必须使用**：
- 实现新功能
- 代码重构
- 修复复杂 Bug
- 修改核心逻辑
- API 变更

**可选使用**：
- 简单的样式调整
- 文档更新
- 配置修改
- 小型 bug 修复

详见 `.claude-duo/README.md`。

---

### 7. 搜索功能架构

项目使用 SQLite FTS5 全文搜索实现高性能代码片段搜索：

**核心文件**: `lib/data.ts` 中的 `getSnippets()` 函数

**搜索模式**:
1. **FTS5 全文搜索**: 当提供 `query` 参数时，使用 `$queryRaw` 执行 FTS5 搜索
2. **高级筛选**: 支持语言、标签、时间范围、排序等多维度筛选
3. **混合模式**: 可以同时使用搜索关键词和筛选条件

**搜索历史**:
- `SearchHistory` 表记录每次搜索（包含查询、筛选器、结果数量）
- `SearchStats` 表统计搜索频率
- API: `/api/search/history`, `/api/search/stats`

**搜索建议**:
- 基于历史搜索提供智能建议
- API: `/api/search/suggestions`

**相关文件**:
- `lib/search-history.ts` - 搜索历史和统计管理
- `lib/search-suggestions.ts` - 搜索建议生成
- `lib/highlight.ts` - 搜索结果关键词高亮

---

### 8. 任务管理工作流程

#### 任务文件夹结构
```
/mnt/Files/Personal Snippet Manager/
├── task/              # 待处理任务 - 从这里读取任务文件  
├── finish_task/       # 已完成任务 - 完成后将任务文件移到这里
└── report/            # 完成报告 - 完成任务后在这里写报告
```



#### 处理任务时
1. 从 `/mnt/Files/Personal Snippet Manager/task/` 读取任务文件
2. 按照上述开发规则完成任务
3. 将任务文件移到 `/mnt/Files/Personal Snippet Manager/finish_task/`
4. 在 `/mnt/Files/Personal Snippet Manager/report/` 写完成报告

**任务完成检查清单**:
- [ ] 任务需求完全实现
- [ ] 代码遵循项目模式（单例、路径别名）
- [ ] TypeScript 类型检查通过 (`npx tsc --noEmit`)
- [ ] 任务文件已移到 `finish_task/`
- [ ] 完成报告已写在 `report/`
- [ ] 已发送桌面通知（见下文）
- [ ] 如使用了双 Claude 系统，监视系统已关闭

### 8. 任务完成通知

完成任何任务时，使用以下命令发送桌面通知：

```bash
# 成功通知（绿色）
/mnt/Files/Personal Snippet Manager/.claude/task-notify.sh "✅ 任务完成" "具体任务描述" "normal"

# 警告通知（黄色）
/mnt/Files/Personal Snippet Manager/.claude/task-notify.sh "⚠️ 注意" "警告信息" "normal"

# 错误通知（红色）
/mnt/Files/Personal Snippet Manager/.claude/task-notify.sh "❌ 错误" "错误信息" "critical"
```

**使用示例**:
```bash
# 完成代码修复后
/mnt/Files/Personal Snippet Manager/.claude/task-notify.sh "✅ JSDoc 注释已添加" "为所有 API 函数添加了详细的 JSDoc 注释" "normal"

# 完成功能开发后
/mnt/Files/Personal Snippet Manager/.claude/task-notify.sh "✅ 新功能已上线" "用户资料页面更新完成" "normal"

# 完成测试后
/mnt/Files/Personal Snippet Manager/.claude/task-notify.sh "✅ 测试通过" "所有单元测试已通过" "normal"
```

**支持的图标**:
- ✅ 成功/完成
- ⚠️ 警告/注意
- ❌ 错误/失败
- ℹ️ 信息/提示
- 🚀 新功能/发布
- 🐛 Bug 修复
- 🔧 配置/工具
- 📝 文档/注释

---

## 常用命令

### 开发
```bash
npm run dev          # 启动 Next.js 开发服务器（端口 3002）
npm run build        # 构建生产版本
npm run start        # 启动生产服务器（端口 3002）
npm run lint         # 运行 ESLint
```

### CLI 工具
```bash
node cli/index.js search [query]    # 搜索代码片段（可交互选择并复制到剪贴板）
node cli/index.js add               # 添加新代码片段（交互式）
node cli/index.js list              # 列出所有代码片段
node cli/index.js test              # 测试 CLI 功能
```

### 数据库
```bash
npx prisma studio              # 打开 Prisma Studio（数据库 Web UI）
npx prisma migrate dev --name description  # 创建并应用新迁移（开发环境）
npx prisma migrate deploy      # 应用迁移（生产环境）
npx prisma generate            # 重新生成 Prisma Client
```

**迁移工作流程**（修改 schema 时）:
1. 编辑 `prisma/schema.prisma`
2. 运行 `npx prisma migrate dev --name descriptive_name`
3. 编辑生成的迁移 SQL 文件，添加 FTS5 触发器
4. 运行 `npx prisma generate`

### 类型检查
```bash
npx tsc --noEmit    # 类型检查而不生成文件
```

### 双 Claude 协作系统
```bash
npm run duo           # 启动监视系统（编码 Claude 自主调用）
npm run duo:install   # 安装系统依赖（inotify-tools, jq）
npm run duo:clean     # 清理审查队列
npm run duo:watch     # 单独启动文件监控
npm run duo:review    # 单独启动验证模式
```

**双 Claude 系统**允许编码 Claude 自主启动监视和验证伙伴，实现实时代码审查。当编码 Claude 开始重要任务时，可以运行 `npm run duo` 来启动审查伙伴。详见 `.claude-duo/README.md`。

## 架构

### Next.js 配置

- **输出模式**: `standalone` (优化 Docker 镜像体积)
- **开发服务器端口**: 3002
- **TypeScript**: 严格模式启用
- **路径别名**: `@/*` 映射到项目根目录

### 数据层（数据库驱动开发）

项目使用 SQLite 配合 Prisma ORM。关键架构决策：

**Prisma Schema** (`prisma/schema.prisma`):
- `Snippet` - 代码片段，包含标题、描述、代码、语言
- `Tag` - 标签，可选颜色
- `TagOnSnippet` - 显式连接表（非隐式多对多），带有 `assignedAt` 时间戳
- `SearchHistory` - 搜索历史记录，用于保存用户搜索和筛选器状态
- `SearchStats` - 搜索统计，记录每个查询的搜索次数和最后搜索时间

**SQLite FTS5 全文搜索**:
- 虚拟表 `SnippetFTS` 索引 title、description、code、language
- 分词器：`porter unicode61`（支持中文和英文）
- 三个触发器自动在 Snippet 表和 SnippetFTS 之间同步：
  - `snippet_ai` - INSERT 同步
  - `snippet_au` - UPDATE 同步
  - `snippet_ad` - DELETE 同步

**事务模式**：
- 创建带标签的 Snippet 时使用 `$transaction` 确保原子性
- 在事务中先 upsert 所有标签，然后创建 Snippet，最后创建关联记录
- 参考 `app/api/snippets/route.ts:59` 的 POST 实现

**重要**：修改 schema 时，需要手动编辑 `prisma/migrations/XXXX/migration.sql` 中的迁移 SQL 文件以包含 FTS5 表和触发器，然后运行 `npx prisma migrate deploy`。

**完整的迁移工作流程示例**：
1. 编辑 `prisma/schema.prisma` 添加或修改模型
2. 运行 `npx prisma migrate dev --name descriptive_name`
3. 编辑生成的 `prisma/migrations/XXXX_descriptive_name/migration.sql`：
   - 如果修改了 Snippet 表，需要更新 `SnippetFTS` 虚拟表定义
   - 更新或重新创建 `snippet_ai`, `snippet_au`, `snippet_ad` 触发器
4. 运行 `npx prisma generate` 重新生成 Prisma Client

### 单例模式

Prisma Client 和 Shiki Highlighter 都使用单例模式，防止开发环境中创建多个实例：

- `lib/prisma.ts` - Prisma Client 单例，导入方式：`import { prisma } from '@/lib/prisma'`
- `lib/shiki.ts` - Shiki Highlighter 单例，使用方式：`await getShikiHighlighter()`
- `lib/data.ts` - 数据访问层，封装 `getSnippets()` 函数，支持 FTS5 搜索和标签过滤
- `lib/highlight.ts` - 搜索结果关键词高亮工具
- `lib/search-history.ts` - 搜索历史和统计管理
- `lib/search-suggestions.ts` - 搜索建议功能

### 路径别名

`@/*` 映射到项目根目录。在导入时使用：
```typescript
import { prisma } from '@/lib/prisma';
import { getShikiHighlighter } from '@/lib/shiki';
```

### API 设计模式

- API 路由使用 Next.js App Router 格式：`app/api/[资源]/route.ts`
- 每个路由文件导出命名的 HTTP 方法函数（GET、POST 等）
- 使用 JSDoc 注释记录查询参数和请求体格式
- 统一错误处理和响应格式（参考 `app/api/snippets/route.ts`）

### 组件架构

- 默认使用 Server Components（无需 `'use client'` 指令）
- 仅在需要交互性（useState、useEffect、事件处理程序）时使用 Client Components
- UI 组件放在 `components/ui/` 目录下
- 代码高亮使用 `highlightCode()` 函数，支持明暗主题切换
- Shiki 预加载语言：javascript、typescript、python、java、cpp、c、go、rust、html、css、json、bash、sql、markdown、text
- 添加新语言支持需要修改 `lib/shiki.ts:14` 中的 `langs` 数组

## 项目结构

```
app/
├── api/                      # API 路由（Next.js App Router）
│   ├── snippets/            # 代码片段相关 API
│   │   ├── route.ts         # GET (列表/搜索), POST (创建)
│   │   └── [id]/route.ts    # GET, PUT, DELETE 单个片段
│   ├── search/              # 搜索相关 API
│   │   ├── history/route.ts # 搜索历史
│   │   ├── stats/route.ts   # 搜索统计
│   │   └── suggestions/route.ts # 搜索建议
│   └── metadata/route.ts    # 元数据 API
├── layout.tsx               # 根布局
├── page.tsx                 # 首页（代码片段列表）
├── snippets/
│   ├── new/page.tsx         # 新建代码片段页面
│   └── [id]/
│       ├── page.tsx         # 详情页
│       ├── edit/
│       │   └── page.tsx     # 编辑页面
│       └── DeleteButton.tsx # 删除按钮组件

lib/
├── prisma.ts                # Prisma Client 单例
├── shiki.ts                 # Shiki Highlighter 单例
├── data.ts                  # 数据访问层（核心查询函数）
├── highlight.ts             # 搜索结果高亮工具
├── search-history.ts        # 搜索历史管理
└── search-suggestions.ts    # 搜索建议功能

components/ui/               # UI 组件
├── CodeBlock.tsx            # 代码块组件（带语法高亮）
├── CopyButton.tsx           # 复制按钮
├── SearchBar.tsx            # 搜索栏组件
└── TagInput.tsx             # 标签输入组件

cli/                         # CLI 命令行工具
├── index.js                 # CLI 入口
├── api.js                   # API 调用封装
├── test.js                  # 测试脚本
└── utils/                   # 工具函数（剪贴板等）

prisma/
├── schema.prisma            # 数据库 schema
├── dev.db                   # SQLite 数据库（不纳入版本控制）
└── migrations/              # SQL 迁移（包含手动添加的 FTS5 触发器）

.claude-duo/                 # 双 Claude 协作系统
├── start-monitoring.sh      # 启动监视脚本
├── watch-and-queue.sh       # 文件监控脚本
├── reviewer-work.sh         # 验证模式脚本
├── clean-queue.sh           # 清理队列脚本
├── install-deps.sh          # 安装依赖脚本
├── queue/                   # 审查任务队列
└── logs/                    # 日志文件
```

## 核心技术栈

- **Next.js 16** - App Router（React Server Components），standalone 输出模式
- **React 19** - UI 库
- **TypeScript** - 严格模式
- **Prisma 6** - SQLite ORM
- **Shiki** - 语法高亮（使用 TextMate grammars）
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **SQLite FTS5** - 全文搜索引擎（支持中文）
- **Heroicons** - 图标库
- **Commander** - CLI 命令框架
- **Inquirer** - CLI 交互式提示
- **Chalk** - CLI 终端颜色输出
- **use-debounce** - 防抖功能

## 数据库连接

Prisma 使用 SQLite，连接 URL 来自 `DATABASE_URL` 环境变量（在 `.env` 中定义为 `file:./dev.db`）。

**数据库文件位置**: `/mnt/Files/Personal Snippet Manager/prisma/dev.db`

**环境变量文件**: `/mnt/Files/Personal Snippet Manager/.env`

---

## 快速参考

### 关键文件位置

| 文件/文件夹 | 用途 |
|-------------|---------|
| `lib/prisma.ts` | 导入 Prisma Client - 永远不要创建新实例 |
| `lib/shiki.ts` | 语法高亮器单例 |
| `lib/data.ts` | 数据访问层 - 核心查询函数（FTS5 搜索、筛选） |
| `lib/highlight.ts` | 搜索结果关键词高亮 |
| `lib/search-history.ts` | 搜索历史和统计管理 |
| `prisma/schema.prisma` | 数据库 schema 定义 |
| `app/api/snippets/route.ts` | 代码片段列表 API（搜索、创建） |
| `app/api/snippets/[id]/route.ts` | 单个代码片段 API（读取、更新、删除） |
| `components/ui/` | 可复用的 UI 组件 |
| `cli/` | CLI 工具 - 命令行界面（search、add、list 命令） |
| `.claude-duo/` | 双 Claude 协作系统 - 监视和验证工具 |
| `.claude-duo/start-monitoring.sh` | 启动监视系统（编码 Claude 调用） |
| `.claude-duo/README.md` | 双 Claude 系统使用文档 |
| `task/` | 从这里读取待处理任务 |
| `finish_task/` | 将已完成任务文件移到这里 |
| `report/` | 在这里写完成报告 |

### 核心函数和类型

```typescript
// 获取代码片段列表（支持搜索和筛选）
import { getSnippets, type SnippetFilters } from '@/lib/data';

// 创建或更新时的类型
type SnippetWithTags = Snippet & {
  tags: (TagOnSnippet & { tag: Tag })[];
};

// 代码高亮
import { highlightCode } from '@/lib/shiki';
const html = await highlightCode(code, language);

// 搜索结果高亮
import { highlightKeywords, extractKeywords } from '@/lib/highlight';
```

### 数据库查询模式

```typescript
// 标准查询模式（带关联标签）
const snippet = await prisma.snippet.findUnique({
  where: { id },
  include: {
    tags: {
      include: { tag: true },
      orderBy: { assignedAt: 'asc' },
    },
  },
});

// 事务模式（创建带标签的 snippet）
await prisma.$transaction(async (tx) => {
  // 1. upsert 标签
  // 2. 创建 snippet
  // 3. 创建关联记录
});
```
