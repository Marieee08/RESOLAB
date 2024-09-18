-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "contactNum" TEXT
);
INSERT INTO "new_AccInfo" ("contactNum", "email", "id", "name") SELECT "contactNum", "email", "id", "name" FROM "AccInfo";
DROP TABLE "AccInfo";
ALTER TABLE "new_AccInfo" RENAME TO "AccInfo";
CREATE UNIQUE INDEX "AccInfo_email_key" ON "AccInfo"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
