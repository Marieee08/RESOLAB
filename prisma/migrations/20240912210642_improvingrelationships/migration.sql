/*
  Warnings:

  - You are about to drop the `EVCReservations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UtilizationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `accInfoId` on the `CustomerFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `accInfoId` on the `EmployeeEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `accInfoId` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `accInfoId` on the `MachineUtilization` table. All the data in the column will be lost.
  - Added the required column `utilReqId` to the `CustomerFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utilReqId` to the `EmployeeEvaluation` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EVCReservations";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UtilizationRequest";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UtilReq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ProductsManufactured" TEXT,
    "BulkofCommodity" TEXT,
    "Facility" TEXT,
    "FacilityQty" INTEGER,
    "FacilityHrs" INTEGER,
    "Equipment" TEXT,
    "EquipmentQty" INTEGER,
    "EquipmentHrs" INTEGER,
    "Tools" TEXT,
    "ToolsQty" INTEGER,
    "ToolsHrs" INTEGER,
    "RequestDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "EndDate" DATETIME,
    "DateofProcessing" DATETIME,
    "Processedby" TEXT,
    "accInfoId" INTEGER,
    CONSTRAINT "UtilReq_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EVCReservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ControlNo" INTEGER,
    "LvlSec" TEXT,
    "NoofStudents" INTEGER,
    "Subject" TEXT,
    "Topic" TEXT,
    "Teacher" TEXT,
    "EVCLabDate" DATETIME,
    "EVCTimeofUse" DATETIME,
    "DateRequested" DATETIME,
    "Students" TEXT,
    "EVCApproval" TEXT,
    "accInfoId" INTEGER,
    CONSTRAINT "EVCReservation_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_AccInfo" ("ContactNum", "Email", "Name", "Role", "id") SELECT "ContactNum", "Email", "Name", "Role", "id" FROM "AccInfo";
DROP TABLE "AccInfo";
ALTER TABLE "new_AccInfo" RENAME TO "AccInfo";
CREATE UNIQUE INDEX "AccInfo_Email_key" ON "AccInfo"("Email");
CREATE TABLE "new_CustomerFeedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FeedbackDate" DATETIME,
    "Q1" INTEGER,
    "Q2" INTEGER,
    "Q3" INTEGER,
    "Q4" INTEGER,
    "Q5" INTEGER,
    "Q6" INTEGER,
    "Q7" INTEGER,
    "utilReqId" INTEGER NOT NULL,
    CONSTRAINT "CustomerFeedback_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CustomerFeedback" ("FeedbackDate", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "id") SELECT "FeedbackDate", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "id" FROM "CustomerFeedback";
DROP TABLE "CustomerFeedback";
ALTER TABLE "new_CustomerFeedback" RENAME TO "CustomerFeedback";
CREATE UNIQUE INDEX "CustomerFeedback_utilReqId_key" ON "CustomerFeedback"("utilReqId");
CREATE TABLE "new_EmployeeEvaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EvalDate" DATETIME,
    "E1" INTEGER,
    "E2" INTEGER,
    "E3" INTEGER,
    "E4" INTEGER,
    "E5" INTEGER,
    "E6" INTEGER,
    "E7" INTEGER,
    "E8" INTEGER,
    "E9" INTEGER,
    "E10" INTEGER,
    "E11" INTEGER,
    "utilReqId" INTEGER NOT NULL,
    CONSTRAINT "EmployeeEvaluation_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeEvaluation" ("E1", "E10", "E11", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EvalDate", "id") SELECT "E1", "E10", "E11", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EvalDate", "id" FROM "EmployeeEvaluation";
DROP TABLE "EmployeeEvaluation";
ALTER TABLE "new_EmployeeEvaluation" RENAME TO "EmployeeEvaluation";
CREATE UNIQUE INDEX "EmployeeEvaluation_utilReqId_key" ON "EmployeeEvaluation"("utilReqId");
CREATE TABLE "new_JobandPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "No" INTEGER,
    "Date" DATETIME,
    "ClientProfile" TEXT,
    "ProjDesc" TEXT,
    "Services" TEXT,
    "Minutes" INTEGER,
    "Costpermin" DECIMAL,
    "TotalCost" DECIMAL,
    "TotalAmntDue" DECIMAL,
    "CompletionDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "utilReqId" INTEGER,
    CONSTRAINT "JobandPayment_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_JobandPayment" ("ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id") SELECT "ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id" FROM "JobandPayment";
DROP TABLE "JobandPayment";
ALTER TABLE "new_JobandPayment" RENAME TO "JobandPayment";
CREATE UNIQUE INDEX "JobandPayment_utilReqId_key" ON "JobandPayment"("utilReqId");
CREATE TABLE "new_MachineUtilization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "OTDate" DATETIME,
    "OTTypeofProducts" TEXT,
    "StartTime" DATETIME,
    "EndTime" DATETIME,
    "OTMachineOp" TEXT,
    "DTDate" DATETIME,
    "DTTypeofProducts" TEXT,
    "DTTime" INTEGER,
    "Cause" TEXT,
    "DTMachineOp" TEXT,
    "RepairDate" DATETIME,
    "Service" TEXT,
    "Duration" INTEGER,
    "RepairReason" TEXT,
    "PartsReplaced" TEXT,
    "RPPersonnel" TEXT,
    "ReviwedBy" TEXT,
    "DateReviewed" DATETIME,
    "utilReqId" INTEGER,
    CONSTRAINT "MachineUtilization_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MachineUtilization" ("Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id") SELECT "Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id" FROM "MachineUtilization";
DROP TABLE "MachineUtilization";
ALTER TABLE "new_MachineUtilization" RENAME TO "MachineUtilization";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
