/*
  Warnings:

  - You are about to drop the column `Equipment` on the `ProcessInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProcessInfo" DROP COLUMN "Equipment";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "Costs" DECIMAL(65,30),
ADD COLUMN     "Equipment" TEXT;

-- CreateTable
CREATE TABLE "AvailedService" (
    "id" TEXT NOT NULL,
    "ServiceAvail" TEXT NOT NULL,
    "EquipmentAvail" TEXT NOT NULL,
    "CostsAvail" DECIMAL(65,30),
    "processInfoId" INTEGER,

    CONSTRAINT "AvailedService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AvailedService" ADD CONSTRAINT "AvailedService_processInfoId_fkey" FOREIGN KEY ("processInfoId") REFERENCES "ProcessInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
