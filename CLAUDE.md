# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal Snippet Manager - A code snippet management application built with Next.js 15, TypeScript, Tailwind CSS, and SQLite with Prisma ORM. The project features full-text search using SQLite FTS5 and syntax highlighting via Shiki.

**Project Location**: `/media/ruan/Files1/Personal Snippet Manager`

---

## Development Rules

When working on this project, you MUST follow these rules:

### 1. Code Quality Standards
- Use TypeScript strict mode - all code must be properly typed
- Follow the existing code style and patterns (singletons, path aliases)
- Keep components modular and reusable
- Use Server Components by default, Client Components only when necessary (useState, useEffect, etc.)

### 2. Database Workflow
- **Always** use `lib/prisma.ts` - never create new PrismaClient instances
- When modifying schema:
  1. Edit `prisma/schema.prisma`
  2. Run `npx prisma migrate dev --name descriptive_name`
  3. Manually add FTS5 table and triggers to the generated migration SQL
  4. Run `npx prisma generate`
- **Never** commit `prisma/dev.db` or `prisma/*.db-journal` files

### 3. File Organization
- API routes go in `app/api/[resource]/route.ts`
- UI components go in `components/ui/`
- Utility functions and singletons go in `lib/`
- Use path alias `@/` for all internal imports

### 4. Testing & Verification
- Run `npx tsc --noEmit` before considering work complete
- Test database changes with `npx prisma studio`
- Verify FTS5 triggers exist after schema changes

### 5. Task Management Workflow

**Task Folders Structure**:
```
/media/ruan/Files1/Personal Snippet Manager/
├── task/              # Pending tasks - read task files from here
├── finish_task/       # Completed tasks - move task files here after completion
└── report/            # Completion reports - write reports here after finishing tasks
```

**When Working on Tasks**:
1. Read task files from `/media/ruan/Files1/Personal Snippet Manager/task/`
2. Complete the task following the Development Rules above
3. Move the task file to `/media/ruan/Files1/Personal Snippet Manager/finish_task/`
4. Write a completion report in `/media/ruan/Files1/Personal Snippet Manager/report/`

**Task Completion Checklist**:
- [ ] Task requirements fully implemented
- [ ] Code follows project patterns (singletons, path aliases)
- [ ] TypeScript type checking passes (`npx tsc --noEmit`)
- [ ] Task file moved to `finish_task/`
- [ ] Completion report written in `report/`
- [ ] Desktop notification sent (see below)

### Task Completion Notification

When completing any task, send a desktop notification using:

```bash
# Success notification (green)
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ 任务完成" "具体任务描述" "normal"

# Warning notification (yellow)
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "⚠️ 注意" "警告信息" "normal"

# Error notification (red)
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "❌ 错误" "错误信息" "critical"
```

**Usage Examples**:
```bash
# After completing code fixes
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ JSDoc 注释已添加" "为所有 API 函数添加了详细的 JSDoc 注释" "normal"

# After completing feature development
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ 新功能已上线" "用户资料页面更新完成" "normal"

# After completing tests
/media/ruan/Files1/Personal Snippet Manager/.claude/task-notify.sh "✅ 测试通过" "所有单元测试已通过" "normal"
```

**Supported Icons**:
- ✅ Success/Completion
- ⚠️ Warning/Attention
- ❌ Error/Failure
- ℹ️ Information/Tip
- 🚀 New Feature/Release
- 🐛 Bug Fix
- 🔧 Configuration/Tool
- 📝 Documentation/Comment

---

## Common Commands

### Development
```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma studio              # Open Prisma Studio (web UI for database)
npx prisma migrate dev         # Create and apply migrations (dev)
npx prisma migrate deploy      # Apply migrations (production)
npx prisma generate            # Regenerate Prisma Client
```

### Type Checking
```bash
npx tsc --noEmit    # Type check without emitting files
```

## Architecture

### Data Layer (Database-Driven Development)

The project uses SQLite with Prisma ORM. Key architectural decisions:

**Prisma Schema** (`prisma/schema.prisma`):
- `Snippet` - Code snippets with title, description, code, language
- `Tag` - Tags with optional color
- `TagOnSnippet` - Explicit junction table (not implicit many-to-many) with `assignedAt` timestamp

**SQLite FTS5 Full-Text Search**:
- Virtual table `SnippetFTS` indexes title, description, code, language
- Tokenizer: `porter unicode61` (supports Chinese and English)
- Three triggers automatically sync between Snippet table and SnippetFTS:
  - `snippet_ai` - INSERT sync
  - `snippet_au` - UPDATE sync
  - `snippet_ad` - DELETE sync

**Important**: When modifying the schema, manually edit the migration SQL file at `prisma/migrations/XXXX/migration.sql` to include FTS5 table and triggers, then run `npx prisma migrate deploy`.

### Singleton Pattern

Both Prisma Client and Shiki Highlighter use the singleton pattern to prevent multiple instances in development:

- `lib/prisma.ts` - Prisma Client singleton, import as `import { prisma } from '@/lib/prisma'`
- `lib/shiki.ts` - Shiki Highlighter singleton, use `await getShikiHighlighter()`

### Path Aliases

`@/*` maps to the project root directory. Use this for imports:
```typescript
import { prisma } from '@/lib/prisma';
import { getShikiHighlighter } from '@/lib/shiki';
```

## Project Structure

```
app/
├── api/           # API routes (Next.js App Router)
├── layout.tsx     # Root layout
└── page.tsx       # Home page

lib/
├── prisma.ts      # Prisma Client singleton
└── shiki.ts       # Shiki Highlighter singleton

components/ui/     # UI components

prisma/
├── schema.prisma  # Database schema
├── dev.db         # SQLite database (not in version control)
└── migrations/    # SQL migrations
```

## Key Technologies

- **Next.js 15** - App Router (React Server Components)
- **Prisma 6** - ORM with SQLite
- **Shiki** - Syntax highlighting (uses TextMate grammars)
- **Tailwind CSS 4** - Utility-first CSS framework

## Database Connection

Prisma uses SQLite with the connection URL from `DATABASE_URL` environment variable (defined in `.env` as `file:./dev.db`).

**Database file location**: `/media/ruan/Files1/Personal Snippet Manager/prisma/dev.db`

**Environment file**: `/media/ruan/Files1/Personal Snippet Manager/.env`

---

## Quick Reference

| File/Folder | Purpose |
|-------------|---------|
| `lib/prisma.ts` | Import Prisma Client - never create new instances |
| `lib/shiki.ts` | Syntax highlighter singleton |
| `prisma/schema.prisma` | Database schema definition |
| `app/api/` | Next.js API routes |
| `components/ui/` | Reusable UI components |
| `task/` | Read pending tasks from here |
| `finish_task/` | Move completed task files here |
| `report/` | Write completion reports here |
