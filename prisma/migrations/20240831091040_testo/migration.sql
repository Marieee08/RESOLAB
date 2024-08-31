/*
  Warnings:

  - The primary key for the `ClientInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `UserID` on the `ClientInfo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientInfo" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Address" TEXT NOT NULL
);
INSERT INTO "new_ClientInfo" ("Address", "ContactNum", "Email", "Name", "UserID") SELECT "Address", "ContactNum", "Email", "Name", "UserID" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE UNIQUE INDEX "ClientInfo_UserID_key" ON "ClientInfo"("UserID");
CREATE UNIQUE INDEX "ClientInfo_Email_key" ON "ClientInfo"("Email");
CREATE UNIQUE INDEX "ClientInfo_ContactNum_key" ON "ClientInfo"("ContactNum");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
