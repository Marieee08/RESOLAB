/*
  Warnings:

  - You are about to drop the column `ControlNo` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to drop the column `Tools` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `ToolsQty` on the `ProcessInfo` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UserTool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ToolUser" TEXT NOT NULL,
    "ToolQuantity" INTEGER NOT NULL,
    "processInfoId" INTEGER,
    CONSTRAINT "UserTool_processInfoId_fkey" FOREIGN KEY ("processInfoId") REFERENCES "ProcessInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EVCReservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LvlSec" TEXT,
    "NoofStudents" INTEGER,
    "Subject" TEXT,
    "Topic" TEXT,
    "Teacher" TEXT,
    "EVCLabDate" DATETIME,
    "EVCTimeofUse" DATETIME,
    "ReceivedBy" TEXT,
    "ReceivedDate" DATETIME,
    "InspectedBy" TEXT,
    "InspectedDate" DATETIME,
    "StudentSig" BLOB,
    "DateRequested" DATETIME,
    "TeacherSig" BLOB,
    "EVCApproval" BOOLEAN,
    "accInfoId" INTEGER,
    CONSTRAINT "EVCReservation_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EVCReservation" ("DateRequested", "EVCApproval", "EVCLabDate", "EVCTimeofUse", "InspectedBy", "InspectedDate", "LvlSec", "NoofStudents", "ReceivedBy", "ReceivedDate", "StudentSig", "Subject", "Teacher", "TeacherSig", "Topic", "accInfoId", "id") SELECT "DateRequested", "EVCApproval", "EVCLabDate", "EVCTimeofUse", "InspectedBy", "InspectedDate", "LvlSec", "NoofStudents", "ReceivedBy", "ReceivedDate", "StudentSig", "Subject", "Teacher", "TeacherSig", "Topic", "accInfoId", "id" FROM "EVCReservation";
DROP TABLE "EVCReservation";
ALTER TABLE "new_EVCReservation" RENAME TO "EVCReservation";
CREATE TABLE "new_ProcessInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "utilReqId" INTEGER,
    CONSTRAINT "ProcessInfo_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProcessInfo" ("id", "utilReqId") SELECT "id", "utilReqId" FROM "ProcessInfo";
DROP TABLE "ProcessInfo";
ALTER TABLE "new_ProcessInfo" RENAME TO "ProcessInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
