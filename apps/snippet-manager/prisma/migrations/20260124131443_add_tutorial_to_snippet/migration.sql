-- AlterTable to add tutorial column
ALTER TABLE "Snippet" ADD COLUMN "tutorial" TEXT;

-- Recreate FTS5 Virtual Table to include tutorial column
DROP TRIGGER IF EXISTS snippet_ai;
DROP TRIGGER IF EXISTS snippet_au;
DROP TRIGGER IF EXISTS snippet_ad;
DROP TABLE IF EXISTS "SnippetFTS";

CREATE VIRTUAL TABLE "SnippetFTS" USING fts5(
    title,
    description,
    code,
    language,
    tutorial,
    content="Snippet",
    content_rowid="rowid",
    tokenize = "porter unicode61"
);

-- Trigger: Insert into FTS after Snippet INSERT
CREATE TRIGGER snippet_ai AFTER INSERT ON Snippet BEGIN
  INSERT INTO SnippetFTS(rowid, title, description, code, language, tutorial)
  VALUES (new.rowid, new.title, new.description, new.code, new.language, new.tutorial);
END;

-- Trigger: Update FTS after Snippet UPDATE
-- 使用 INSERT OR REPLACE 而不是 UPDATE，这是 FTS5 虚拟表的标准做法
CREATE TRIGGER snippet_au AFTER UPDATE ON Snippet BEGIN
  INSERT INTO SnippetFTS(rowid, title, description, code, language, tutorial)
  VALUES (new.rowid, new.title, new.description, new.code, new.language, new.tutorial);
END;

-- Trigger: Delete from FTS after Snippet DELETE
CREATE TRIGGER snippet_ad AFTER DELETE ON Snippet BEGIN
  DELETE FROM SnippetFTS WHERE rowid = old.rowid;
END;
