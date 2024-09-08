/*
  Warnings:

  - You are about to drop the column `City` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNum` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Province` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Zipcode` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `clientInfoId` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `ContactNum` on the `ClientInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `ClientInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `ClientInfo` table. All the data in the column will be lost.
  - You are about to drop the column `clientInfoId` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `clientInfoId` on the `MachineUtilization` table. All the data in the column will be lost.
  - You are about to drop the column `clientInfoId` on the `UtilizationRequest` table. All the data in the column will be lost.
  - Added the required column `City` to the `ClientInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Province` to the `ClientInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Zipcode` to the `ClientInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AccInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EVCAccInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

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
    "CompanyIDNum" TEXT
);
INSERT INTO "new_BusinessInfo" ("BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyEmail", "CompanyIDNum", "CompanyName", "ContactPerson", "Designation", "TINNum", "id") SELECT "BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyEmail", "CompanyIDNum", "CompanyName", "ContactPerson", "Designation", "TINNum", "id" FROM "BusinessInfo";
DROP TABLE "BusinessInfo";
ALTER TABLE "new_BusinessInfo" RENAME TO "BusinessInfo";
CREATE TABLE "new_ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Address" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Province" TEXT NOT NULL,
    "Zipcode" INTEGER NOT NULL
);
INSERT INTO "new_ClientInfo" ("Address", "id") SELECT "Address", "id" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE TABLE "new_JobandPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "No" INTEGER,
    "Date" DATETIME NOT NULL,
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
    "OTDate" DATETIME NOT NULL,
    "OTTypeofProducts" TEXT NOT NULL,
    "StartTime" DATETIME NOT NULL,
    "EndTime" DATETIME NOT NULL,
    "OTMachineOp" TEXT NOT NULL,
    "DTDate" DATETIME NOT NULL,
    "DTTypeofProducts" TEXT NOT NULL,
    "DTTime" INTEGER NOT NULL,
    "Cause" TEXT NOT NULL,
    "DTMachineOp" TEXT NOT NULL,
    "RepairDate" DATETIME NOT NULL,
    "Service" TEXT NOT NULL,
    "Duration" INTEGER NOT NULL,
    "RepairReason" TEXT NOT NULL,
    "PartsReplaced" TEXT NOT NULL,
    "RPPersonnel" TEXT NOT NULL,
    "ReviwedBy" TEXT NOT NULL,
    "DateReviewed" DATETIME NOT NULL
);
INSERT INTO "new_MachineUtilization" ("Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id") SELECT "Cause", "DTDate", "DTMachineOp", "DTTime", "DTTypeofProducts", "DateReviewed", "Duration", "EndTime", "OTDate", "OTMachineOp", "OTTypeofProducts", "PartsReplaced", "RPPersonnel", "RepairDate", "RepairReason", "ReviwedBy", "Service", "StartTime", "id" FROM "MachineUtilization";
DROP TABLE "MachineUtilization";
ALTER TABLE "new_MachineUtilization" RENAME TO "MachineUtilization";
CREATE TABLE "new_UtilizationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ProductsManufactured" TEXT NOT NULL,
    "BulkofCommodity" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "AccInfo_Email_key" ON "AccInfo"("Email");
