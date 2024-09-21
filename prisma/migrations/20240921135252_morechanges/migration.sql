/*
  Warnings:

  - You are about to drop the column `ContactNum` on the `AccInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Students` on the `EVCReservation` table. All the data in the column will be lost.
  - You are about to alter the column `EVCApproval` on the `EVCReservation` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to drop the column `No` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to alter the column `Minutes` on the `JobandPayment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to drop the column `Cause` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `DTDate` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `DTMachineOp` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `DTTime` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `DTTypeofProducts` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `Duration` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `EndTime` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `OTDate` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `OTMachineOp` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `OTTypeofProducts` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `PartsReplaced` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `RPPersonnel` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `RepairDate` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `RepairReason` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `Service` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `Equipment` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `EquipmentHrs` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `EquipmentQty` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `Facility` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `FacilityHrs` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `FacilityQty` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `Tools` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `ToolsHrs` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `ToolsQty` on the `UtilReq` table. All the data in the column will be lost.
  - Added the required column `Profile` to the `AccInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ContactNum` to the `ClientInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeEvaluation" ADD COLUMN "EvalSig" BOOLEAN;

-- CreateTable
CREATE TABLE "ProcessInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Facility" TEXT,
    "FacilityQty" INTEGER,
    "FacilityHrs" INTEGER,
    "Equipment" TEXT,
    "EquipmentQty" INTEGER,
    "EquipmentHrs" INTEGER,
    "Tools" TEXT,
    "ToolsQty" INTEGER,
    "ToolsHrs" INTEGER,
    "utilReqId" INTEGER,
    CONSTRAINT "ProcessInfo_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UtilTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DayNum" INTEGER,
    "StartTime" DATETIME,
    "EndTime" DATETIME,
    "utilReqId" INTEGER,
    CONSTRAINT "UtilTime_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NeededMaterial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Item" TEXT,
    "ItemQty" INTEGER,
    "Description" TEXT,
    "Issued" TEXT,
    "Returned" TEXT,
    "evcId" INTEGER,
    CONSTRAINT "NeededMaterial_evcId_fkey" FOREIGN KEY ("evcId") REFERENCES "EVCReservation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EVCStudent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Students" TEXT,
    "evcId" INTEGER,
    CONSTRAINT "EVCStudent_evcId_fkey" FOREIGN KEY ("evcId") REFERENCES "EVCReservation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OperatingTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "OTDate" DATETIME,
    "OTTypeofProducts" TEXT,
    "OTStartTime" DATETIME,
    "OTEndTime" DATETIME,
    "OTMachineOp" TEXT,
    "machineUtilId" INTEGER,
    CONSTRAINT "OperatingTime_machineUtilId_fkey" FOREIGN KEY ("machineUtilId") REFERENCES "MachineUtilization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DownTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DTDate" DATETIME,
    "DTTypeofProducts" TEXT,
    "DTTime" INTEGER,
    "Cause" TEXT,
    "DTMachineOp" TEXT,
    "machineUtilId" INTEGER,
    CONSTRAINT "DownTime_machineUtilId_fkey" FOREIGN KEY ("machineUtilId") REFERENCES "MachineUtilization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RepairCheck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RepairDate" DATETIME,
    "Service" TEXT,
    "Duration" INTEGER,
    "RepairReason" TEXT,
    "PartsReplaced" TEXT,
    "RPPersonnel" TEXT,
    "machineUtilId" INTEGER,
    CONSTRAINT "RepairCheck_machineUtilId_fkey" FOREIGN KEY ("machineUtilId") REFERENCES "MachineUtilization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Profile" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_AccInfo" ("Email", "Name", "Role", "id") SELECT "Email", "Name", "Role", "id" FROM "AccInfo";
DROP TABLE "AccInfo";
ALTER TABLE "new_AccInfo" RENAME TO "AccInfo";
CREATE UNIQUE INDEX "AccInfo_Email_key" ON "AccInfo"("Email");
CREATE TABLE "new_ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ContactNum" TEXT NOT NULL,
    "Address" TEXT,
    "City" TEXT,
    "Province" TEXT,
    "Zipcode" INTEGER,
    "accInfoId" INTEGER NOT NULL,
    CONSTRAINT "ClientInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientInfo" ("Address", "City", "Province", "Zipcode", "accInfoId", "id") SELECT "Address", "City", "Province", "Zipcode", "accInfoId", "id" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE UNIQUE INDEX "ClientInfo_accInfoId_key" ON "ClientInfo"("accInfoId");
CREATE TABLE "new_EVCReservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ControlNo" INTEGER,
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
INSERT INTO "new_EVCReservation" ("ControlNo", "DateRequested", "EVCApproval", "EVCLabDate", "EVCTimeofUse", "LvlSec", "NoofStudents", "Subject", "Teacher", "Topic", "accInfoId", "id") SELECT "ControlNo", "DateRequested", "EVCApproval", "EVCLabDate", "EVCTimeofUse", "LvlSec", "NoofStudents", "Subject", "Teacher", "Topic", "accInfoId", "id" FROM "EVCReservation";
DROP TABLE "EVCReservation";
ALTER TABLE "new_EVCReservation" RENAME TO "EVCReservation";
CREATE TABLE "new_JobandPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Date" DATETIME,
    "ClientProfile" TEXT,
    "ProjDesc" TEXT,
    "Services" TEXT,
    "Minutes" DECIMAL,
    "Costpermin" DECIMAL,
    "TotalCost" DECIMAL,
    "TotalAmntDue" DECIMAL,
    "CompletionDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "utilReqId" INTEGER,
    CONSTRAINT "JobandPayment_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_JobandPayment" ("ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id", "utilReqId") SELECT "ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id", "utilReqId" FROM "JobandPayment";
DROP TABLE "JobandPayment";
ALTER TABLE "new_JobandPayment" RENAME TO "JobandPayment";
CREATE UNIQUE INDEX "JobandPayment_utilReqId_key" ON "JobandPayment"("utilReqId");
CREATE TABLE "new_MachineUtilization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ReviwedBy" TEXT,
    "MachineApproval" BOOLEAN,
    "DateReviewed" DATETIME,
    "utilReqId" INTEGER,
    CONSTRAINT "MachineUtilization_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MachineUtilization" ("DateReviewed", "ReviwedBy", "id", "utilReqId") SELECT "DateReviewed", "ReviwedBy", "id", "utilReqId" FROM "MachineUtilization";
DROP TABLE "MachineUtilization";
ALTER TABLE "new_MachineUtilization" RENAME TO "MachineUtilization";
CREATE TABLE "new_UtilReq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ProductsManufactured" TEXT,
    "BulkofCommodity" TEXT,
    "RequestDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "EndDate" DATETIME,
    "DateofProcessing" DATETIME,
    "Processedby" TEXT,
    "UtilReqApproval" BOOLEAN,
    "accInfoId" INTEGER,
    CONSTRAINT "UtilReq_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UtilReq" ("BulkofCommodity", "DateofProcessing", "EndDate", "Processedby", "ProductsManufactured", "RequestDate", "accInfoId", "id") SELECT "BulkofCommodity", "DateofProcessing", "EndDate", "Processedby", "ProductsManufactured", "RequestDate", "accInfoId", "id" FROM "UtilReq";
DROP TABLE "UtilReq";
ALTER TABLE "new_UtilReq" RENAME TO "UtilReq";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
