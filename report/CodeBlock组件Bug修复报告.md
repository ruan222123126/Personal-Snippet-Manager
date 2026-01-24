# Bug 修复报告

**日期**: 2025-01-24
**任务**: 修复编辑教学说明时的数据库错误
**状态**: ✅ 已完成

## 概述

修复了在编辑代码片段的"教学说明"字段时出现的"Failed to update snippet"错误。该错误是由 SQLite FTS5 全文搜索的 UPDATE 触发器实现不当引起的。

## 问题分析

### 错误表现
- 用户编辑代码片段并填写/修改教学说明（tutorial 字段）
- 点击保存时出现"Failed to update snippet"错误
- 错误信息：`database disk image is malformed`

### 根本原因
经过排查发现，问题出在 FTS5（SQLite 全文搜索）的更新触发器上：

1. **错误的触发器实现**：原来的 `snippet_au` 触发器使用 `UPDATE` 语句来更新 FTS5 虚拟表
2. **FTS5 限制**：FTS5 虚拟表不支持标准的 `UPDATE` 操作
3. **正确做法**：应该使用 `INSERT OR REPLACE` 来实现更新功能

### 错误代码（migration.sql）
```sql
-- ❌ 错误的实现
CREATE TRIGGER snippet_au AFTER UPDATE ON Snippet BEGIN
  UPDATE SnippetFTS
  SET title = new.title,
      description = new.description,
      code = new.code,
      language = new.language,
      tutorial = new.tutorial
  WHERE rowid = new.rowid;
END;
```

### 修复后的代码
```sql
-- ✅ 正确的实现
CREATE TRIGGER snippet_au AFTER UPDATE ON Snippet BEGIN
  INSERT INTO SnippetFTS(rowid, title, description, code, language, tutorial)
  VALUES (new.rowid, new.title, new.description, new.code, new.language, new.tutorial);
END;
```

## 完成的工作

1. **分析问题**
   - 读取编辑页面代码（EditSnippetForm.tsx）
   - 检查 API 路由（/api/snippets/[id]/route.ts）
   - 创建测试脚本重现问题

2. **定位错误**
   - 发现 SQLite 错误：`database disk image is malformed`
   - 排查 FTS5 触发器实现
   - 确认问题根源

3. **修复代码**
   - 修复 `20260123114143_init/migration.sql` 中的触发器
   - 修复 `20260124131443_add_tutorial_to_snippet/migration.sql` 中的触发器

4. **测试验证**
   - 创建测试脚本（test-complete-tutorial.js）
   - 运行 8 项测试，全部通过：
     * 创建带 tutorial 的 snippet
     * 创建不带 tutorial 的 snippet
     * 为空 tutorial 添加内容
     * 修改已有 tutorial
     * 删除 tutorial
     * 同时更新多个字段
     * 使用事务创建完整 snippet
     - FTS5 搜索功能
   - TypeScript 类型检查通过

## 验证结果

所有测试用例通过：
```
✅ 测试 1: 创建带 tutorial 的 snippet
✅ 测试 2: 创建不带 tutorial 的 snippet
✅ 测试 3: 为空 tutorial 添加内容
✅ 测试 4: 修改已有 tutorial
✅ 测试 5: 删除 tutorial
✅ 测试 6: 同时更新多个字段
✅ 测试 7: 使用事务创建完整 snippet
✅ 测试 8: FTS5 搜索
```

TypeScript 类型检查：
```
✅ npx tsc --noEmit 通过
```

## 技术细节

### FTS5 触发器模式
FTS5 虚拟表使用"外部内容表"模式，触发器需要：
- **INSERT**: 向 FTS5 表插入新记录
- **UPDATE**: 使用 `INSERT OR REPLACE` 替代 `UPDATE`
- **DELETE**: 从 FTS5 表删除记录

### 为什么使用 INSERT OR REPLACE
- FTS5 虚拟表基于 rowid 建立索引
- `INSERT OR REPLACE` 会在 rowid 冲突时自动替换旧记录
- 这等同于标准的 UPDATE 操作，但符合 FTS5 的实现要求

## 注意事项

⚠️ **数据库重建**
修复后需要重建数据库：
```bash
rm prisma/dev.db prisma/dev.db-journal
npx prisma migrate deploy
```

⚠️ **数据丢失**
重建数据库会清空所有数据，如需保留数据请先备份并使用 SQLite 导出/导入功能。

## 相关文件

- `prisma/migrations/20260123114143_init/migration.sql` - 初始迁移（已修复）
- `prisma/migrations/20260124131443_add_tutorial_to_snippet/migration.sql` - Tutorial 字段迁移（已修复）
- `app/api/snippets/[id]/route.ts` - Snippet API（无需修改）
- `app/snippets/[id]/edit/EditSnippetForm.tsx` - 编辑表单（无需修改）
- `components/ui/TutorialEditor.tsx` - Tutorial 编辑器（无需修改）

## 总结

修复了 FTS5 触发器的实现错误，解决了编辑教学说明时的数据库错误问题。修复涉及两个迁移文件，使用 `INSERT OR REPLACE` 替代 `UPDATE` 来正确处理 FTS5 虚拟表的更新操作。
