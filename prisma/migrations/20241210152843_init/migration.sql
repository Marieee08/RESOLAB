-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clerkId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'MSME'
);
INSERT INTO "new_AccInfo" ("Name", "Role", "clerkId", "email", "id") SELECT "Name", "Role", "clerkId", "email", "id" FROM "AccInfo";
DROP TABLE "AccInfo";
ALTER TABLE "new_AccInfo" RENAME TO "AccInfo";
CREATE UNIQUE INDEX "AccInfo_clerkId_key" ON "AccInfo"("clerkId");
CREATE UNIQUE INDEX "AccInfo_email_key" ON "AccInfo"("email");
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
    "Manufactured" TEXT,
    "ProductionFrequency" TEXT,
    "Bulk" TEXT,
    "accInfoId" INTEGER NOT NULL,
    CONSTRAINT "BusinessInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BusinessInfo" ("Bulk", "BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyCity", "CompanyEmail", "CompanyIDNum", "CompanyMobileNum", "CompanyName", "CompanyPhoneNum", "CompanyProvince", "CompanyZipcode", "ContactPerson", "Designation", "Manufactured", "ProductionFrequency", "TINNum", "accInfoId", "id") SELECT "Bulk", "BusinessOwner", "BusinessPermitNum", "CompanyAddress", "CompanyCity", "CompanyEmail", "CompanyIDNum", "CompanyMobileNum", "CompanyName", "CompanyPhoneNum", "CompanyProvince", "CompanyZipcode", "ContactPerson", "Designation", "Manufactured", "ProductionFrequency", "TINNum", "accInfoId", "id" FROM "BusinessInfo";
DROP TABLE "BusinessInfo";
ALTER TABLE "new_BusinessInfo" RENAME TO "BusinessInfo";
CREATE UNIQUE INDEX "BusinessInfo_accInfoId_key" ON "BusinessInfo"("accInfoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
