-- CreateSearchHistory
CREATE TABLE "SearchHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "query" TEXT NOT NULL,
    "filters" TEXT,
    "resultCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "SearchHistory.createdAt_idx" ON "SearchHistory"("createdAt");
CREATE INDEX "SearchHistory.query_idx" ON "SearchHistory"("query");

-- CreateSearchStats
CREATE TABLE "SearchStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "query" TEXT NOT NULL,
    "searchCount" INTEGER NOT NULL DEFAULT 0,
    "lastSearchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "SearchStats.query_key" ON "SearchStats"("query");
CREATE INDEX "SearchStats.searchCount_idx" ON "SearchStats"("searchCount");
