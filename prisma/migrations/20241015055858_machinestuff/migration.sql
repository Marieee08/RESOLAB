/*
  Warnings:

  - You are about to drop the column `description` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Machine` table. All the data in the column will be lost.
  - Added the required column `Desc` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Image` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Machine` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Machine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Machine" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Desc" TEXT NOT NULL,
    "Link" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Machine" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Machine";
DROP TABLE "Machine";
ALTER TABLE "new_Machine" RENAME TO "Machine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
