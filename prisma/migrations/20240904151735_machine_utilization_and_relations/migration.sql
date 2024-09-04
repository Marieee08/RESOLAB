/*
  Warnings:

  - You are about to drop the column `businessInfoId` on the `ClientInfo` table. All the data in the column will be lost.
  - You are about to drop the column `jobandPaymentId` on the `ClientInfo` table. All the data in the column will be lost.
  - You are about to drop the column `utilizationRequestId` on the `ClientInfo` table. All the data in the column will be lost.
  - Added the required column `clientInfoId` to the `BusinessInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientInfoId` to the `JobandPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientInfoId` to the `UtilizationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "MachineUtilization" (
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
    "DateReviewed" DATETIME NOT NULL,
    "clientInfoId" INTEGER NOT NULL,
    CONSTRAINT "MachineUtilization_clientInfoId_fkey" FOREIGN KEY ("clientInfoId") REFERENCES "ClientInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BusinessInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT,
    "BusinessOwner" TEXT,
    "CompanyIDNum" TEXT,
    "TINNum" TEXT,
    "BusinessPermitNum" TEXT,
    "CompanyEmail" TEXT,
    "ContactPerson" TEXT,
    "Designation" TEXT,
    "CompanyAddress" TEXT,
    "City" TEXT,
    "Province" TEXT,
    "Zipcode" INTEGER,
    "PhoneNum" INTEGER,
    "clientInfoId" INTEGER NOT NULL,
    CONSTRAINT "BusinessInfo_clientInfoId_fkey" FOREIGN KEY ("clientInfoId") REFERENCES "ClientInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BusinessInfo" ("BusinessOwner", "BusinessPermitNum", "City", "CompanyAddress", "CompanyEmail", "CompanyIDNum", "CompanyName", "ContactPerson", "Designation", "PhoneNum", "Province", "TINNum", "Zipcode", "id") SELECT "BusinessOwner", "BusinessPermitNum", "City", "CompanyAddress", "CompanyEmail", "CompanyIDNum", "CompanyName", "ContactPerson", "Designation", "PhoneNum", "Province", "TINNum", "Zipcode", "id" FROM "BusinessInfo";
DROP TABLE "BusinessInfo";
ALTER TABLE "new_BusinessInfo" RENAME TO "BusinessInfo";
CREATE TABLE "new_ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Address" TEXT NOT NULL
);
INSERT INTO "new_ClientInfo" ("Address", "ContactNum", "Email", "Name", "id") SELECT "Address", "ContactNum", "Email", "Name", "id" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE UNIQUE INDEX "ClientInfo_Email_key" ON "ClientInfo"("Email");
CREATE UNIQUE INDEX "ClientInfo_ContactNum_key" ON "ClientInfo"("ContactNum");
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
    "CompletionDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "clientInfoId" INTEGER NOT NULL,
    CONSTRAINT "JobandPayment_clientInfoId_fkey" FOREIGN KEY ("clientInfoId") REFERENCES "ClientInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobandPayment" ("ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id") SELECT "ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id" FROM "JobandPayment";
DROP TABLE "JobandPayment";
ALTER TABLE "new_JobandPayment" RENAME TO "JobandPayment";
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
    "Processedby" TEXT,
    "clientInfoId" INTEGER NOT NULL,
    CONSTRAINT "UtilizationRequest_clientInfoId_fkey" FOREIGN KEY ("clientInfoId") REFERENCES "ClientInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UtilizationRequest" ("BulkofCommodity", "DateofProcessing", "EndDate", "Equipment", "EquipmentHrs", "EquipmentQty", "Facility", "FacilityHrs", "FacilityQty", "Processedby", "ProductsManufactured", "RequestDate", "Tools", "ToolsHrs", "ToolsQty", "id") SELECT "BulkofCommodity", "DateofProcessing", "EndDate", "Equipment", "EquipmentHrs", "EquipmentQty", "Facility", "FacilityHrs", "FacilityQty", "Processedby", "ProductsManufactured", "RequestDate", "Tools", "ToolsHrs", "ToolsQty", "id" FROM "UtilizationRequest";
DROP TABLE "UtilizationRequest";
ALTER TABLE "new_UtilizationRequest" RENAME TO "UtilizationRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
