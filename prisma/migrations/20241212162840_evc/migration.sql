/*
  Warnings:

  - You are about to drop the column `EVCApproval` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to drop the column `LabDate` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to drop the column `StudentSig` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to drop the column `TeacherSig` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to drop the column `TimeofUse` on the `EVCReservation` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "LabDate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LabDay" INTEGER,
    "LabStart" DATETIME,
    "LabEnd" DATETIME,
    "evcId" INTEGER,
    CONSTRAINT "LabDate_evcId_fkey" FOREIGN KEY ("evcId") REFERENCES "EVCReservation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EVCReservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EVCStatus" TEXT NOT NULL DEFAULT 'Pending',
    "ControlNo" INTEGER,
    "LvlSec" TEXT,
    "NoofStudents" INTEGER,
    "Subject" TEXT,
    "Teacher" TEXT,
    "Topic" TEXT,
    "DateRequested" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "ApprovedBy" TEXT,
    "SchoolYear" INTEGER,
    "ReceivedBy" TEXT,
    "ReceivedDate" DATETIME,
    "InspectedBy" TEXT,
    "InspectedDate" DATETIME,
    "accInfoId" INTEGER,
    CONSTRAINT "EVCReservation_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EVCReservation" ("DateRequested", "InspectedBy", "InspectedDate", "LvlSec", "NoofStudents", "ReceivedBy", "ReceivedDate", "Subject", "Teacher", "Topic", "accInfoId", "id") SELECT "DateRequested", "InspectedBy", "InspectedDate", "LvlSec", "NoofStudents", "ReceivedBy", "ReceivedDate", "Subject", "Teacher", "Topic", "accInfoId", "id" FROM "EVCReservation";
DROP TABLE "EVCReservation";
ALTER TABLE "new_EVCReservation" RENAME TO "EVCReservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
