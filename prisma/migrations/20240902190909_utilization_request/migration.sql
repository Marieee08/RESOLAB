-- CreateTable
CREATE TABLE "UtilizationRequest" (
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
    "utilizationRequestId" TEXT,
    CONSTRAINT "ClientInfo_jobandPaymentId_fkey" FOREIGN KEY ("jobandPaymentId") REFERENCES "JobandPayment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClientInfo_businessInfoId_fkey" FOREIGN KEY ("businessInfoId") REFERENCES "BusinessInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ClientInfo_utilizationRequestId_fkey" FOREIGN KEY ("utilizationRequestId") REFERENCES "UtilizationRequest" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ClientInfo" ("Address", "ContactNum", "Email", "Name", "businessInfoId", "id", "jobandPaymentId") SELECT "Address", "ContactNum", "Email", "Name", "businessInfoId", "id", "jobandPaymentId" FROM "ClientInfo";
DROP TABLE "ClientInfo";
ALTER TABLE "new_ClientInfo" RENAME TO "ClientInfo";
CREATE UNIQUE INDEX "ClientInfo_id_key" ON "ClientInfo"("id");
CREATE UNIQUE INDEX "ClientInfo_Email_key" ON "ClientInfo"("Email");
CREATE UNIQUE INDEX "ClientInfo_ContactNum_key" ON "ClientInfo"("ContactNum");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UtilizationRequest_id_key" ON "UtilizationRequest"("id");
