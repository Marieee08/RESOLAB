/*
  Warnings:

  - You are about to drop the `EVCAccInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EVCAccInfo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EVCReservations" (
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
    "EVCApproval" TEXT
);

-- CreateTable
CREATE TABLE "CustomerFeedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FeedbackDate" DATETIME,
    "Q1" INTEGER,
    "Q2" INTEGER,
    "Q3" INTEGER,
    "Q4" INTEGER,
    "Q5" INTEGER,
    "Q6" INTEGER,
    "Q7" INTEGER
);

-- CreateTable
CREATE TABLE "EmployeeEvaluation" (
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
    "E11" INTEGER
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Address" TEXT,
    "City" TEXT,
    "Province" TEXT,
    "Zipcode" INTEGER
);
INSERT INTO "new_ClientInfo" ("Address", "City", "Province", "Zipcode", "id") SELECT "Address", "City", "Province", "Zipcode", "id" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
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
    "CompletionDate" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_JobandPayment" ("ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id") SELECT "ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id" FROM "JobandPayment";
DROP TABLE "JobandPayment";
ALTER TABLE "new_JobandPayment" RENAME TO "JobandPayment";
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
    "DateReviewed" DATETIME
);
INSERT INTO "new_MachineUtilization" ("Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id") SELECT "Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id" FROM "MachineUtilization";
DROP TABLE "MachineUtilization";
ALTER TABLE "new_MachineUtilization" RENAME TO "MachineUtilization";
CREATE TABLE "new_UtilizationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "Processedby" TEXT
);
INSERT INTO "new_UtilizationRequest" ("BulkofCommodity", "DateofProcessing", "EndDate", "Equipment", "EquipmentHrs", "EquipmentQty", "Facility", "FacilityHrs", "FacilityQty", "Processedby", "ProductsManufactured", "RequestDate", "Tools", "ToolsHrs", "ToolsQty", "id") SELECT "BulkofCommodity", "DateofProcessing", "EndDate", "Equipment", "EquipmentHrs", "EquipmentQty", "Facility", "FacilityHrs", "FacilityQty", "Processedby", "ProductsManufactured", "RequestDate", "Tools", "ToolsHrs", "ToolsQty", "id" FROM "UtilizationRequest";
DROP TABLE "UtilizationRequest";
ALTER TABLE "new_UtilizationRequest" RENAME TO "UtilizationRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
