/*
  Warnings:

  - The primary key for the `UtilizationRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UtilizationRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `accInfoId` to the `BusinessInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accInfoId` to the `ClientInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UtilizationRequestsId` to the `UtilizationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BusinessInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT,
    "BusinessOwner" TEXT,
    "TINNum" TEXT,
    "BusinessPermitNum" TEXT,
    "CompanyEmail" TEXT,
    "ContactPerson" TEXT,
    "Designation" TEXT,
    "CompanyAddress" TEXT,
    "CompanyCity" TEXT,
    "CompanyProvince" TEXT,
    "CompanyZipcode" INTEGER,
    "CompanyPhoneNum" TEXT,
    "CompanyMobileNum" TEXT,
    "Manufactured" TEXT,
    "ProductionFrequency" TEXT,
    "Bulk" TEXT,
    "CompanyIDNum" TEXT,
    "accInfoId" INTEGER NOT NULL,
    CONSTRAINT "BusinessInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BusinessInfo" ("Bulk", "BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyCity", "CompanyEmail", "CompanyIDNum", "CompanyMobileNum", "CompanyName", "CompanyPhoneNum", "CompanyProvince", "CompanyZipcode", "ContactPerson", "Designation", "Manufactured", "ProductionFrequency", "TINNum", "id") SELECT "Bulk", "BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyCity", "CompanyEmail", "CompanyIDNum", "CompanyMobileNum", "CompanyName", "CompanyPhoneNum", "CompanyProvince", "CompanyZipcode", "ContactPerson", "Designation", "Manufactured", "ProductionFrequency", "TINNum", "id" FROM "BusinessInfo";
DROP TABLE "BusinessInfo";
ALTER TABLE "new_BusinessInfo" RENAME TO "BusinessInfo";
CREATE UNIQUE INDEX "BusinessInfo_accInfoId_key" ON "BusinessInfo"("accInfoId");
CREATE TABLE "new_ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Address" TEXT,
    "City" TEXT,
    "Province" TEXT,
    "Zipcode" INTEGER,
    "accInfoId" INTEGER NOT NULL,
    CONSTRAINT "ClientInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientInfo" ("Address", "City", "Province", "Zipcode", "id") SELECT "Address", "City", "Province", "Zipcode", "id" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE UNIQUE INDEX "ClientInfo_accInfoId_key" ON "ClientInfo"("accInfoId");
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
    "accInfoId" INTEGER,
    CONSTRAINT "CustomerFeedback_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CustomerFeedback" ("FeedbackDate", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "id") SELECT "FeedbackDate", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "id" FROM "CustomerFeedback";
DROP TABLE "CustomerFeedback";
ALTER TABLE "new_CustomerFeedback" RENAME TO "CustomerFeedback";
CREATE TABLE "new_EVCReservations" (
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
    CONSTRAINT "EVCReservations_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EVCReservations" ("ControlNo", "DateRequested", "EVCApproval", "EVCLabDate", "EVCTimeofUse", "LvlSec", "NoofStudents", "Students", "Subject", "Teacher", "Topic", "id") SELECT "ControlNo", "DateRequested", "EVCApproval", "EVCLabDate", "EVCTimeofUse", "LvlSec", "NoofStudents", "Students", "Subject", "Teacher", "Topic", "id" FROM "EVCReservations";
DROP TABLE "EVCReservations";
ALTER TABLE "new_EVCReservations" RENAME TO "EVCReservations";
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
    "accInfoId" INTEGER,
    CONSTRAINT "EmployeeEvaluation_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeEvaluation" ("E1", "E10", "E11", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EvalDate", "id") SELECT "E1", "E10", "E11", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EvalDate", "id" FROM "EmployeeEvaluation";
DROP TABLE "EmployeeEvaluation";
ALTER TABLE "new_EmployeeEvaluation" RENAME TO "EmployeeEvaluation";
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
    "accInfoId" INTEGER,
    CONSTRAINT "JobandPayment_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "DateReviewed" DATETIME,
    "accInfoId" INTEGER,
    CONSTRAINT "MachineUtilization_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MachineUtilization" ("Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id") SELECT "Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id" FROM "MachineUtilization";
DROP TABLE "MachineUtilization";
ALTER TABLE "new_MachineUtilization" RENAME TO "MachineUtilization";
CREATE TABLE "new_UtilizationRequest" (
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
    "UtilizationRequestsId" INTEGER NOT NULL,
    CONSTRAINT "UtilizationRequest_UtilizationRequestsId_fkey" FOREIGN KEY ("UtilizationRequestsId") REFERENCES "AccInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UtilizationRequest" ("BulkofCommodity", "DateofProcessing", "EndDate", "Equipment", "EquipmentHrs", "EquipmentQty", "Facility", "FacilityHrs", "FacilityQty", "Processedby", "ProductsManufactured", "RequestDate", "Tools", "ToolsHrs", "ToolsQty", "id") SELECT "BulkofCommodity", "DateofProcessing", "EndDate", "Equipment", "EquipmentHrs", "EquipmentQty", "Facility", "FacilityHrs", "FacilityQty", "Processedby", "ProductsManufactured", "RequestDate", "Tools", "ToolsHrs", "ToolsQty", "id" FROM "UtilizationRequest";
DROP TABLE "UtilizationRequest";
ALTER TABLE "new_UtilizationRequest" RENAME TO "UtilizationRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
