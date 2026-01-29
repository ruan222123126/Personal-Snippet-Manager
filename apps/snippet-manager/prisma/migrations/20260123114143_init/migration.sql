-- CreateTable
CREATE TABLE "Snippet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TagOnSnippet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "snippetId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TagOnSnippet_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagOnSnippet_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TagOnSnippet_snippetId_tagId_key" ON "TagOnSnippet"("snippetId", "tagId");

-- Create FTS5 Virtual Table for Snippet Search
-- Note: Using external content table with text-based id
CREATE VIRTUAL TABLE "SnippetFTS" USING fts5(
    title,
    description,
    code,
    language,
    content="Snippet",
    content_rowid="rowid",
    tokenize = "porter unicode61"
);

-- Add a rowid column to Snippet for FTS5 indexing
-- SQLite automatically creates rowid for tables without INTEGER PRIMARY KEY
-- Since our table uses TEXT PRIMARY KEY, rowid is already available implicitly

-- Trigger: Insert into FTS after Snippet INSERT
CREATE TRIGGER snippet_ai AFTER INSERT ON Snippet BEGIN
  INSERT INTO SnippetFTS(rowid, title, description, code, language)
  VALUES (new.rowid, new.title, new.description, new.code, new.language);
END;

-- Trigger: Update FTS after Snippet UPDATE
-- 使用 INSERT OR REPLACE 而不是 UPDATE，这是 FTS5 虚拟表的标准做法
CREATE TRIGGER snippet_au AFTER UPDATE ON Snippet BEGIN
  INSERT INTO SnippetFTS(rowid, title, description, code, language)
  VALUES (new.rowid, new.title, new.description, new.code, new.language);
END;

-- Trigger: Delete from FTS after Snippet DELETE
CREATE TRIGGER snippet_ad AFTER DELETE ON Snippet BEGIN
  DELETE FROM SnippetFTS WHERE rowid = old.rowid;
END;
