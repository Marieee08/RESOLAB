/*
  Warnings:

  - You are about to drop the `AvailedService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcessInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Bulk` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Manufactured` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `ProductionFrequency` on the `BusinessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Costpermin` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `Minutes` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `Services` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `TotalAmntDue` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `TotalCost` on the `JobandPayment` table. All the data in the column will be lost.
  - You are about to drop the column `processInfoId` on the `UserTool` table. All the data in the column will be lost.
  - You are about to drop the column `EndDate` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `ProductsManufactured` on the `UtilReq` table. All the data in the column will be lost.
  - You are about to drop the column `UtilReqApproval` on the `UtilReq` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AvailedService";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProcessInfo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ServiceAvail" TEXT NOT NULL,
    "EquipmentAvail" TEXT NOT NULL,
    "CostsAvail" DECIMAL,
    "MinsAvail" DECIMAL,
    "utilReqId" INTEGER,
    CONSTRAINT "UserService_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BusinessInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isNotBusinessOwner" BOOLEAN NOT NULL DEFAULT false,
    "CompanyName" TEXT,
    "BusinessOwner" TEXT,
    "BusinessPermitNum" TEXT,
    "TINNum" TEXT,
    "CompanyIDNum" TEXT,
    "CompanyEmail" TEXT,
    "ContactPerson" TEXT,
    "Designation" TEXT,
    "CompanyAddress" TEXT,
    "CompanyCity" TEXT,
    "CompanyProvince" TEXT,
    "CompanyZipcode" INTEGER,
    "CompanyPhoneNum" TEXT,
    "CompanyMobileNum" TEXT,
    "accInfoId" INTEGER NOT NULL,
    CONSTRAINT "BusinessInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BusinessInfo" ("BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyCity", "CompanyEmail", "CompanyIDNum", "CompanyMobileNum", "CompanyName", "CompanyPhoneNum", "CompanyProvince", "CompanyZipcode", "ContactPerson", "Designation", "TINNum", "accInfoId", "id", "isNotBusinessOwner") SELECT "BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyCity", "CompanyEmail", "CompanyIDNum", "CompanyMobileNum", "CompanyName", "CompanyPhoneNum", "CompanyProvince", "CompanyZipcode", "ContactPerson", "Designation", "TINNum", "accInfoId", "id", "isNotBusinessOwner" FROM "BusinessInfo";
DROP TABLE "BusinessInfo";
ALTER TABLE "new_BusinessInfo" RENAME TO "BusinessInfo";
CREATE UNIQUE INDEX "BusinessInfo_accInfoId_key" ON "BusinessInfo"("accInfoId");
CREATE TABLE "new_JobandPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Date" DATETIME,
    "ClientProfile" TEXT,
    "ProjDesc" TEXT,
    "CompletionDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "utilReqId" INTEGER,
    CONSTRAINT "JobandPayment_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_JobandPayment" ("ClientProfile", "CompletionDate", "Date", "ProjDesc", "id", "utilReqId") SELECT "ClientProfile", "CompletionDate", "Date", "ProjDesc", "id", "utilReqId" FROM "JobandPayment";
DROP TABLE "JobandPayment";
ALTER TABLE "new_JobandPayment" RENAME TO "JobandPayment";
CREATE UNIQUE INDEX "JobandPayment_utilReqId_key" ON "JobandPayment"("utilReqId");
CREATE TABLE "new_UserTool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ToolUser" TEXT NOT NULL,
    "ToolQuantity" INTEGER NOT NULL,
    "utilReqId" INTEGER,
    CONSTRAINT "UserTool_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserTool" ("ToolQuantity", "ToolUser", "id") SELECT "ToolQuantity", "ToolUser", "id" FROM "UserTool";
DROP TABLE "UserTool";
ALTER TABLE "new_UserTool" RENAME TO "UserTool";
CREATE TABLE "new_UtilReq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Status" TEXT NOT NULL DEFAULT 'Pending',
    "RequestDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "TotalAmntDue" DECIMAL,
    "BulkofCommodity" TEXT,
    "DateofProcessing" DATETIME,
    "Processedby" TEXT,
    "accInfoId" INTEGER,
    CONSTRAINT "UtilReq_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UtilReq" ("BulkofCommodity", "DateofProcessing", "Processedby", "RequestDate", "Status", "accInfoId", "id") SELECT "BulkofCommodity", "DateofProcessing", "Processedby", "RequestDate", "Status", "accInfoId", "id" FROM "UtilReq";
DROP TABLE "UtilReq";
ALTER TABLE "new_UtilReq" RENAME TO "UtilReq";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
