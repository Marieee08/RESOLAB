/*
  Warnings:

  - You are about to drop the column `EVCLabDate` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to drop the column `EVCTimeofUse` on the `EVCReservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN "Instructions" TEXT;

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
    "LabDate" DATETIME,
    "TimeofUse" DATETIME,
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
INSERT INTO "new_EVCReservation" ("DateRequested", "EVCApproval", "InspectedBy", "InspectedDate", "LvlSec", "NoofStudents", "ReceivedBy", "ReceivedDate", "StudentSig", "Subject", "Teacher", "TeacherSig", "Topic", "accInfoId", "id") SELECT "DateRequested", "EVCApproval", "InspectedBy", "InspectedDate", "LvlSec", "NoofStudents", "ReceivedBy", "ReceivedDate", "StudentSig", "Subject", "Teacher", "TeacherSig", "Topic", "accInfoId", "id" FROM "EVCReservation";
DROP TABLE "EVCReservation";
ALTER TABLE "new_EVCReservation" RENAME TO "EVCReservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
