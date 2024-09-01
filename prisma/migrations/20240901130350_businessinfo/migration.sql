/*
  Warnings:

  - You are about to drop the column `UserID` on the `JobandPayment` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "BusinessInfo" (
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
    "PhoneNum" INTEGER
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "jobandPaymentId" INTEGER NOT NULL,
    "businessInfoId" INTEGER,
    CONSTRAINT "ClientInfo_jobandPaymentId_fkey" FOREIGN KEY ("jobandPaymentId") REFERENCES "JobandPayment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClientInfo_businessInfoId_fkey" FOREIGN KEY ("businessInfoId") REFERENCES "BusinessInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ClientInfo" ("Address", "ContactNum", "Email", "Name", "id", "jobandPaymentId") SELECT "Address", "ContactNum", "Email", "Name", "id", "jobandPaymentId" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE UNIQUE INDEX "ClientInfo_id_key" ON "ClientInfo"("id");
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
    "CompletionDate" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_JobandPayment" ("ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id") SELECT "ClientProfile", "CompletionDate", "Costpermin", "Date", "Minutes", "No", "ProjDesc", "Services", "TotalAmntDue", "TotalCost", "id" FROM "JobandPayment";
DROP TABLE "JobandPayment";
ALTER TABLE "new_JobandPayment" RENAME TO "JobandPayment";
CREATE UNIQUE INDEX "JobandPayment_id_key" ON "JobandPayment"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessInfo_id_key" ON "BusinessInfo"("id");
