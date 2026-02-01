-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "externalUrl" TEXT,
    "author" TEXT NOT NULL,
    "source" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SavedResource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SavedResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RelatedResource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromResourceId" TEXT NOT NULL,
    "toResourceId" TEXT NOT NULL,
    CONSTRAINT "RelatedResource_fromResourceId_fkey" FOREIGN KEY ("fromResourceId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RelatedResource_toResourceId_fkey" FOREIGN KEY ("toResourceId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_title_key" ON "Resource"("title");

-- CreateIndex
CREATE INDEX "Resource_category_idx" ON "Resource"("category");

-- CreateIndex
CREATE INDEX "Resource_difficulty_idx" ON "Resource"("difficulty");

-- CreateIndex
CREATE INDEX "Resource_status_idx" ON "Resource"("status");

-- CreateIndex
CREATE INDEX "SavedResource_userId_idx" ON "SavedResource"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedResource_userId_resourceId_key" ON "SavedResource"("userId", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedResource_fromResourceId_toResourceId_key" ON "RelatedResource"("fromResourceId", "toResourceId");
