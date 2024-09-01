-- CreateTable
CREATE TABLE "ClientInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "jobandPaymentId" INTEGER NOT NULL,
    CONSTRAINT "ClientInfo_jobandPaymentId_fkey" FOREIGN KEY ("jobandPaymentId") REFERENCES "JobandPayment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobandPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserID" INTEGER NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "ClientInfo_id_key" ON "ClientInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientInfo_Email_key" ON "ClientInfo"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientInfo_ContactNum_key" ON "ClientInfo"("ContactNum");

-- CreateIndex
CREATE UNIQUE INDEX "JobandPayment_id_key" ON "JobandPayment"("id");
