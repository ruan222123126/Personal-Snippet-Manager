# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

Personal Snippet Manager - 一个代码片段管理应用，使用 Next.js 15、TypeScript、Tailwind CSS 和 SQLite（配合 Prisma ORM）构建。项目具有 SQLite FTS5 全文搜索功能和 Shiki 语法高亮。

**项目位置**: `/media/ruan/Files1/Personal Snippet Manager`

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

### 6. 任务管理工作流程

**任务文件夹结构**:
```
/media/ruan/Files1/Personal Snippet Manager/
├── task/              # 待处理任务 - 从这里读取任务文件
├── finish_task/       # 已完成任务 - 完成后将任务文件移到这里
└── report/            # 完成报告 - 完成任务后在这里写报告
```

**处理任务时**:
1. 从 `/media/ruan/Files1/Personal Snippet Manager/task/` 读取任务文件
2. 按照上述开发规则完成任务
3. 将任务文件移到 `/media/ruan/Files1/Personal Snippet Manager/finish_task/`
4. 在 `/media/ruan/Files1/Personal Snippet Manager/report/` 写完成报告

**任务完成检查清单**:
- [ ] 任务需求完全实现
- [ ] 代码遵循项目模式（单例、路径别名）
- [ ] TypeScript 类型检查通过 (`npx tsc --noEmit`)
- [ ] 任务文件已移到 `finish_task/`
- [ ] 完成报告已写在 `report/`
- [ ] 已发送桌面通知（见下文）

### 任务完成通知

完成任何任务时，使用以下命令发送桌面通知：

```bash
# 成功通知（绿色）
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ 任务完成" "具体任务描述" "normal"

# 警告通知（黄色）
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "⚠️ 注意" "警告信息" "normal"

# 错误通知（红色）
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "❌ 错误" "错误信息" "critical"
```

**使用示例**:
```bash
# 完成代码修复后
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ JSDoc 注释已添加" "为所有 API 函数添加了详细的 JSDoc 注释" "normal"

# 完成功能开发后
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ 新功能已上线" "用户资料页面更新完成" "normal"

# 完成测试后
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ 测试通过" "所有单元测试已通过" "normal"
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
npm run dev          # 启动 Next.js 开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint
```

### 数据库
```bash
npx prisma studio              # 打开 Prisma Studio（数据库 Web UI）
npx prisma migrate dev         # 创建并应用迁移（开发环境）
npx prisma migrate deploy      # 应用迁移（生产环境）
npx prisma generate            # 重新生成 Prisma Client
```

### 类型检查
```bash
npx tsc --noEmit    # 类型检查而不生成文件
```

## 架构

### 数据层（数据库驱动开发）

项目使用 SQLite 配合 Prisma ORM。关键架构决策：

**Prisma Schema** (`prisma/schema.prisma`):
- `Snippet` - 代码片段，包含标题、描述、代码、语言
- `Tag` - 标签，可选颜色
- `TagOnSnippet` - 显式连接表（非隐式多对多），带有 `assignedAt` 时间戳

**SQLite FTS5 全文搜索**:
- 虚拟表 `SnippetFTS` 索引 title、description、code、language
- 分词器：`porter unicode61`（支持中文和英文）
- 三个触发器自动在 Snippet 表和 SnippetFTS 之间同步：
  - `snippet_ai` - INSERT 同步
  - `snippet_au` - UPDATE 同步
  - `snippet_ad` - DELETE 同步

**重要**：修改 schema 时，需要手动编辑 `prisma/migrations/XXXX/migration.sql` 中的迁移 SQL 文件以包含 FTS5 表和触发器，然后运行 `npx prisma migrate deploy`。

### 单例模式

Prisma Client 和 Shiki Highlighter 都使用单例模式，防止开发环境中创建多个实例：

- `lib/prisma.ts` - Prisma Client 单例，导入方式：`import { prisma } from '@/lib/prisma'`
- `lib/shiki.ts` - Shiki Highlighter 单例，使用方式：`await getShikiHighlighter()`

### 路径别名

`@/*` 映射到项目根目录。在导入时使用：
```typescript
import { prisma } from '@/lib/prisma';
import { getShikiHighlighter } from '@/lib/shiki';
```

## 项目结构

```
app/
├── api/           # API 路由（Next.js App Router）
├── layout.tsx     # 根布局
└── page.tsx       # 首页

lib/
├── prisma.ts      # Prisma Client 单例
└── shiki.ts       # Shiki Highlighter 单例

components/ui/     # UI 组件

prisma/
├── schema.prisma  # 数据库 schema
├── dev.db         # SQLite 数据库（不纳入版本控制）
└── migrations/    # SQL 迁移
```

## 核心技术

- **Next.js 15** - App Router（React Server Components）
- **Prisma 6** - SQLite ORM
- **Shiki** - 语法高亮（使用 TextMate grammars）
- **Tailwind CSS 4** - 实用优先的 CSS 框架

## 数据库连接

Prisma 使用 SQLite，连接 URL 来自 `DATABASE_URL` 环境变量（在 `.env` 中定义为 `file:./dev.db`）。

**数据库文件位置**: `/media/ruan/Files1/Personal Snippet Manager/prisma/dev.db`

**环境变量文件**: `/media/ruan/Files1/Personal Snippet Manager/.env`

---

## 快速参考

| 文件/文件夹 | 用途 |
|-------------|---------|
| `lib/prisma.ts` | 导入 Prisma Client - 永远不要创建新实例 |
| `lib/shiki.ts` | 语法高亮器单例 |
| `prisma/schema.prisma` | 数据库 schema 定义 |
| `app/api/` | Next.js API 路由 |
| `components/ui/` | 可复用的 UI 组件 |
| `task/` | 从这里读取待处理任务 |
| `finish_task/` | 将已完成任务文件移到这里 |
| `report/` | 在这里写完成报告 |
