/*
  Warnings:

  - You are about to drop the column `EquipmentHrs` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `EquipmentQty` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Facility` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `FacilityHrs` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `FacilityQty` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `ToolsHrs` on the `ProcessInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProcessInfo" DROP COLUMN "EquipmentHrs",
DROP COLUMN "EquipmentQty",
DROP COLUMN "Facility",
DROP COLUMN "FacilityHrs",
DROP COLUMN "FacilityQty",
DROP COLUMN "ToolsHrs";

-- CreateTable
CREATE TABLE "BlockedDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockedDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BlockedDate_date_idx" ON "BlockedDate"("date");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedDate_date_key" ON "BlockedDate"("date");
